/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { Document } from '../../src/types/Document';
import { VectorDocument } from '../../src/types/VectorDocument';
import { OnBrowserEmbedding } from '../../src/embeddings/OnBrowserEmbedding';

import { expect, test } from 'vitest';

const documents: Document[] = [
    new Document({content: 'This is a test document 0', metadata: {id: '0'}}),
    new Document({content: 'This is a test document 1', metadata: {id: '1'}}),
    new Document({content: 'This is a test document 2', metadata: {id: '2'}}),
    new Document({content: 'This is a test document 3', metadata: {id: '3'}}),
    new Document({content: 'This is a test document 4', metadata: {id: '4'}})
];

test("[ Browser/Node ] Run OnBrowserEmbedding", async ()=>{
    const onBrowserEmbedding: OnBrowserEmbedding = new OnBrowserEmbedding('gte-small');
    const vectorDocuments:VectorDocument[] = await onBrowserEmbedding.embedDocuments(documents);
    expect(vectorDocuments.length).toBe(5);
});