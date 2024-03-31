#!/bin/bash

#SBATCH -A mlp-n
#SBATCH -J embedding
#SBATCH --nodes=1
#SBATCH --gpus-per-node=1
#SBATCH --time=3:00:00

source .venv/bin/activate

python embedding.py