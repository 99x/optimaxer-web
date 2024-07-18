# Optimaxer Web Core

This package contains the core functionality for the Optimaxer web Library. It is a collection of utilities and components that are used across all Optimaxer web libraries.

This library contains building blocks to run AI Models directly in the browser, and to build AI Powered web applications. This is built on top of TransformerJS and WebLLM to provide simple components to build AI powered web applications.

All the Classes, Methods etc. are documented in the code itself and should provide inline 
documentation.

## Installation

```bash
npm install @optimaxer/web-core
```

## Available Components

- `Embeddings`: Create embeddings from text using pre-trained models directly in the browser.

- `VectorStores`: Store and query vector embeddings in the browser.

- `LLM Inferences`: Run Large Language Model Inferences directly in the browser.

## Embeddings

Currently, the library supports the following pre-trained models:

- `Xenova/gte-small`: A pre-trained model that converts text into high-dimensional vectors that can be used for text classification, semantic similarity, clustering, and other natural language processing (NLP) tasks.

## VectorStores

The library provides a simple interface to store and query vector embeddings in the browser. This is useful for building search engines, recommendation systems, and other applications that require similarity search.

Currently, the library supports the following VectorStores:

- `ClientVectorStore`: A simple IndexDB vector store that stores vectors in an array and performs similarity search entirely in the browser.

## LLM Inferences

The library provides a simple interface to run Large Language Model (LLM) inferences directly in the browser. This is useful for building chatbots, question-answering systems, and other applications that require natural language understanding.

Currently, the library supports the following Libraries that can run inferences in the browser. Each of these libraries can be used to run inferences on a specific model. Both of these libraries are built on top of OnnxWeb that runs on WebAssembly.

- `WebLLM`: [Read More](https://webllm.mlc.ai/)
- `TransformerJS`: [Read More](https://huggingface.co/docs/transformers.js/en/index)

Reason for using 2 libraries is that they have different model support.