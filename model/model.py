import torch
from torch.utils.data import DataLoader
import torch.nn as nn

from sklearn.model_selection import KFold
from ignite.contrib.metrics import CohenKappa

EPOCHS = 100

class GradeModel(nn.Module):
  def __init__(self, input_size) -> None:
    self.layers = nn.Sequential()
    self.layers.append(nn.LSTM(input_size, dropout=0.3, bidirectional=True))
    self.layers.append(nn.Dropout(p=0.4))
    self.layers.append(nn.LSTM(256, dropout=0.3, bidirectional=True))
    self.layers.append(nn.Dropout(p=0.4))
    self.layers.append(nn.Linear(256, 1))

    self.loss = CohenKappa.get_cohen_kappa_fn

  def forward(self, x):
    return self.layers(x)

def train(train, test):
  # splits the training and test data into batches
  train_data, test_data = get_datasets(train, test)

  input_size = train_data.shape[1] # TODO - to be changed
  model = GradeModel(input_size)
  optimizer = torch.optim.Adam()
  # training loop
  for i in range(EPOCHS):
    for t in train_data:
      model.train()
      y = model(t)
      loss = model.loss(y, ...) # get the original scores
      optimizer.zero_grad()
      loss.backward()
      optimizer.step()

  # trains the model and saves it on disk
  save_model(model)


def evaluate(model, essay):
  # return a score for the essay
  # TODO - token the essay the same way as training
  embedded_essay = ...
  model.eval()
  return model(embedded_essay)

def save_model(model: nn.Module):
  torch.save(model.state_dict(), "model.tp")

def load_model(filename, input_size)->nn.Module:
  # loads the model from a saved tar file
  model = GradeModel(input_size)
  model.load_state_dict(torch.load(filename))
  model.eval()
  return model


def get_datasets(train_data, test_data):
  return DataLoader(train_data, batch_size=128, shuffle=True), DataLoader(test_data, batch_size=128, shuffle=True)