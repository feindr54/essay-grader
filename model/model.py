import torch
import torch.nn as nn

class GradeModel(nn.Module):
  def __init__(self, *args, **kwargs) -> None:
    super().__init__(*args, **kwargs)
    self.layers = nn.Sequential(nn.LSTM(48, ))