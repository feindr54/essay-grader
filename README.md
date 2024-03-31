# NivelMate

## What is it

NivelMate is a service that uses machine-learning algorithms to grade essays. It takes in thousands of existing essays and scores and incorporates NLP models to create an accurate essay evaluator. This approach enables NivelMate to provide an accurate, consistent, and objective evaluation of essays across a wide range of topics, rubrics and writing styles .

## How we did it

We preprocessed training data (essays with scores) by removing stop words and clustering the words together.

We used a BERT model to generate embeddings for the essays that could be used for training.

We used a Long short-term memory (LSTM) network created in Torch to take in the embeddings and train.

## Trying it out

You can clone our repository:

```
git clone https://github.com/qi116/essay-grader.git
```

Try our pre-trained model to grade your essays. 

We used the dataset from https://www.kaggle.com/c/asap-aes/data to train our model.

## Running the Backend (Flask)

Navigate to the essay-grader/api folder

Run app.py

```
python app.py
```
## Running the FrontEnd (Next.js)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
