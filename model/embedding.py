import warnings
import pandas as pd
import numpy as np
from tqdm import tqdm
import os

import torch
import transformers
from keras.preprocessing.sequence import pad_sequences
from transformers import BertTokenizer, AutoModelForSequenceClassification, BertModel

from sklearn.metrics.pairwise import cosine_similarity
# from spellchecker import SpellChecker

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
# import language_tool_python

from langchain.text_splitter import RecursiveCharacterTextSplitter

# import logging

import matplotlib.pyplot as plt
# %matplotlib inline

train = []
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 512,
    chunk_overlap = 40,
    length_function = len,
    is_separator_regex = False,
  )
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

model = AutoModelForSequenceClassification.from_pretrained('bert-base-uncased',
                                            output_attentions = False
).to("cuda:0")
def essay_chunking_embedding(input_text, text_splitter, tokenizer):
    chunk_embeddings = []
    chunk_weights = []
    custom_texts = text_splitter.create_documents([input_text])
    custom_texts = [text.page_content for text in custom_texts]

    for i in range(len(custom_texts)):
        embedding = convert_essay_to_embedding(tokenizer, model, custom_texts[i], 512)
        chunk_embeddings.append(embedding)
        chunk_weights.append(len(custom_texts[i]))
    print(np.array(chunk_embeddings).shape)
    return (chunk_embeddings, chunk_weights, custom_texts)

def embed_essay(essay):
  chunk_embeddings, chunk_weights, custom_texts = essay_chunking_embedding(essay, text_splitter, tokenizer)
  final_embedding = convert_final_embedding(chunk_embeddings, chunk_weights)
  return torch.from_numpy(final_embedding).unsqueeze(0).to("cuda:0").float()

def embed(filename):
  data = pd.read_csv(filename, encoding='ISO-8859-1', sep = '\t')


  final_embeddings = []
  for x in range(len(data['essay'])):
      input_text = data['essay'][x]
      chunk_embeddings, chunk_weights, custom_texts = essay_chunking_embedding(input_text, text_splitter, tokenizer)
      final_embedding = convert_final_embedding(chunk_embeddings, chunk_weights)

      final_embeddings.append(final_embedding)
      # print(final_embeddings)
      # print(x)

  final_embeddings = np.array(final_embeddings)
  train = torch.from_numpy(final_embeddings)
  # print(final_embeddings)
  # print(train)
  torch.save(torch.from_numpy(final_embeddings), "embeddings.pt")

  return torch.from_numpy(final_embeddings)


def convert_essay_to_embedding(tokenizer, model, text, MAX_LEN):
    input_ids = tokenizer.encode(
                        text = text,
                        add_special_tokens=True,   # Add '[CLS]' and '[SEP]'
                        max_length=MAX_LEN,             # Adjust sentence length
                        pad_to_max_length=True,    # Pad/truncate sentences
                        return_attention_mask=True,# Generate attention masks
                        #return_tensors='pt',       # Return PyTorch tensors
                   )
    results = pad_sequences([input_ids], maxlen=MAX_LEN, dtype = "long", truncating = "post", padding = "post")
    #print(results)
    input_ids = results[0]
    # print(input_ids)

    attention_mask = np.where(input_ids > 0, 1, 0)
    # print(attention_mask)
    #attention_mask = [int(i>0) for i in input_ids]

    input_ids = torch.tensor(input_ids).to("cuda:0")
    attention_mask = torch.tensor(attention_mask).to("cuda:0")

    # TODO - issue here
    input_ids = input_ids.unsqueeze(0)
    attention_mask = attention_mask.unsqueeze(0)

    model.eval()

    with torch.no_grad():
        encoded_layers = model(
                                input_ids = input_ids,
                                token_type_ids = None,
                                attention_mask = attention_mask,
                                return_dict = False
                                )
    batch_i = 0
    token_i = 0
    # print(encoded_layers)
    embedding = encoded_layers[batch_i][token_i]
    embedding = embedding.detach().cpu().numpy()
    return embedding

def convert_final_embedding(chunk_embeddings, chunk_weights):
    total_weight = sum(chunk_weights)
    normalized_weights = [weight / total_weight for weight in chunk_weights]
    # print(np.array(chunk_embeddings).shape)
    # print(np.array(chunk_weights).shape)
    final_embedding = np.dot(normalized_weights, chunk_embeddings)
    # print(np.array(final_embedding).shape)
    return final_embedding

if __name__ == "__main__":
    embed()