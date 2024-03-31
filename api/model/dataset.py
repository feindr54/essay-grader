import pandas as pd
import numpy as np

def read_data():
  train_df = pd.read_csv("./data/training_set_rel3.tsv", sep="\t", encoding='ISO-8859-1')
  test_df = pd.read_csv("./data/test_set.tsv", sep="\t", encoding='ISO-8859-1')
