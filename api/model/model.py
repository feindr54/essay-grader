import torch
from torch.utils.data import DataLoader
import torch.nn as nn
import pandas as pd

from sklearn.model_selection import KFold

from .embedding import embed, embed_essay

EPOCHS = 100



class GradeModel(nn.Module):
  def __init__(self) -> None:
    super(GradeModel, self).__init__()
    self.layers = []
    self.l1 = nn.LSTM(2, 64, dropout=0.1).to("cuda:0")
    self.d1 = nn.Dropout(p=0.2)
    self.l2 = nn.LSTM(64, 256,dropout=0.1).to("cuda:0")
    self.d2 = nn.Dropout(p=0.2)
    self.l3 = nn.Linear(256, 1).to("cuda:0")
    # self.relu = nn.ReLU()

    self.loss = nn.MSELoss()

  def forward(self, x):
    y = self.l1(x)[0]
    y = self.d1(y)
    y = self.l2(y)[0]
    y = self.d2(y)
    y = self.l3(y)
    return y

def train():
  # splits the training and test data into batches
  train_data = get_datasets()

  # input_size = train_data.shape[1] # TODO - to be changed
  model = GradeModel()
  optimizer = torch.optim.Adam(model.parameters(), lr=1e-4)
  # training loop
  for _ in range(EPOCHS):
    running_loss = 0
    for xbatch, ybatch in train_data:
      xbatch = xbatch.to("cuda:0").float()
      ybatch = ybatch.to("cuda:0").float()
      # print(xbatch)
      model.train()
      ystar = model(xbatch)
      loss = model.loss(ybatch, ystar) # get the original scores
      running_loss += loss
      optimizer.zero_grad()
      loss.backward()
      optimizer.step()
    print(f"Loss: {running_loss}")

  # trains the model and saves it on disk
  save_model(model)


def evaluate(model, essay):
  # return a score for the essay
  # TODO - token the essay the same way as training
  embedded_essay = embed_essay(essay)
  model.eval()
  return model(embedded_essay)

def save_model(model: nn.Module):
  torch.save(model.state_dict(), "model.tp")

def load_model(filename)->nn.Module:
  # loads the model from a saved tar file
  model = GradeModel()
  model.load_state_dict(torch.load(filename))
  model.eval()
  return model


def get_datasets():
  train_df = pd.read_csv("../data/training_set_rel3.tsv", sep="\t", encoding='ISO-8859-1')
  test_df = pd.read_csv("../data/test_set.tsv", sep="\t", encoding='ISO-8859-1')

  embeddings = torch.load("embeddings.pt")
  # test_embeddings = embed("../data/test_set.tsv")
  train_labels = torch.Tensor(train_df["domain1_score"].values)
  test_labels = None

  train_data = list(zip(embeddings, train_labels))
  test_data = test_labels

  return DataLoader(train_data, batch_size=128, shuffle=True)#, DataLoader(test_data, batch_size=128, shuffle=True)

if __name__ == "__main__":
  # train the model
  # save the model
  test_df = pd.read_csv("../data/training_set_rel3.tsv", sep="\t", encoding='ISO-8859-1')
  # train()
  model = load_model("model.tp")
  # print(type(test_df['essay'][6969]))
  print(f"predicted: {evaluate(model, test_df['essay'][5600])}")
  print(f"actual: {test_df['domain1_score'][5600]}")
  print(f"essay: {test_df['essay'][5600]}")