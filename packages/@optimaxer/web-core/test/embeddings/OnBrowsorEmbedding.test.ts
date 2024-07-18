

import { Document } from '../../src/types/Document';
import { VectorDocument } from '../../src/types/VectorDocument';
import { OnBrowserEmbeddingEngine } from '../../src/embeddings/OnBrowserEmbeddingEngine';

import { expect, test } from 'vitest';

const documents: Document[] = [
    new Document({content: 'This is a test document 0', metadata: {id: '0'}}),
    new Document({content: 'This is a test document 1', metadata: {id: '1'}}),
    new Document({content: 'This is a test document 2', metadata: {id: '2'}}),
    new Document({content: 'This is a test document 3', metadata: {id: '3'}}),
    new Document({content: 'This is a test document 4', metadata: {id: '4'}})
];

test("[ Browser/Node ] Run OnBrowserEmbedding", async ()=>{
    const onBrowserEmbedding: OnBrowserEmbeddingEngine = new OnBrowserEmbeddingEngine('gte-small');
    const vectorDocuments:VectorDocument[] = await onBrowserEmbedding.embedDocuments(documents);
    expect(vectorDocuments.length).toBe(5);
});