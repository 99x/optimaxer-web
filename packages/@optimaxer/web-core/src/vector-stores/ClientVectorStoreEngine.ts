/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/


import { getEmbedding, EmbeddingIndex, SearchResult } from 'client-vector-search';
import { AbstractVectorStoreEngine } from './AbstractVectorStoreEngine';
import { VectorDocument } from '../types/VectorDocument';
import { Response } from '../types/Response';
import { env } from '@xenova/transformers';
import { Document } from '../types/Document';
import { OnBrowserEmbeddingEngine } from '../embeddings/OnBrowserEmbeddingEngine';

/**
 * ClientVectorStore class to handle the VectorStore operations.
 * This class extends the VectorStoreFactory to enforce the methods.
 */
export class ClientVectorStoreEngine extends AbstractVectorStoreEngine {

    /**
     * Currently we are using the gt-small model for the embedding.
     * This can be changed to any other model supported by the TransformersJS library.
     * The gte-small model is small and fast, as well as efficient for the client side.
     */ 
    embedder:OnBrowserEmbeddingEngine = new OnBrowserEmbeddingEngine('gte-small');

    /**
     * constructor
     * This constructor sets the allowRemoteModels to true and allowLocalModels to false.
     * to prevent the usage of local models thus interfering with the client side operations.
     */
    constructor() {
        super();
        env.allowRemoteModels = true;
        env.allowLocalModels = false;
    }
    
    
    async searchVectorStore(query: string, dbName:string,topK:number): Promise<Document[]> {
        const queryEmbedding = await getEmbedding(query);

        const vecStore = new EmbeddingIndex();
        const result:SearchResult[] = await vecStore.search(queryEmbedding, {
            useStorage: 'indexedDB',
            topK: topK,
            storageOptions: {
                indexedDBName: dbName,
                indexedDBObjectStoreName: dbName,
            }
        });

        const docs:Document[] = result.map((res:SearchResult) => {
            return new Document(res.object);
        });

        return docs;
    }

    
    async createVectorStore(dbName:string, documents: Document[]): Promise<Response> {
        
        const vectorDocs: VectorDocument[] = await this.embedder.embedDocuments(documents);
        
        console.log('Vector Docs:', vectorDocs);
        const vecStore = new EmbeddingIndex(vectorDocs);

        console.log('Saving index...');
        await vecStore.saveIndex('indexedDB', {
            DBName: dbName,
            objectStoreName: dbName,
        });

        return new Response(201, 'Vector Store created successfully');
    }
} 