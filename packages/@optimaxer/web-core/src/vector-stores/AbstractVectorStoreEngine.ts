/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { Response } from '../types/Response';
import { Document } from '../types/Document';


/**
 * AbstractVectorStoreEngine class to handle the VectorStore operations.
 * Extends this class to enforce the methods.
 */
export abstract class AbstractVectorStoreEngine {

    /**
     * createVectorStore
     * @param dbName - The name of the database.
     * @param contents - The documents to be stored in the database.
     * @returns Response Type.
     */
    public abstract createVectorStore(
        dbName:string,
        contents: Document[]
    ): Promise<Response>;

    /**
     * searchVectorStore
     * @param query - The query to be searched.
     * @param dbName - The name of the database.
     * @param topK - The number of top results to be returned. if null,
     * will use the default value of the implementation.
     * @returns Document[] - The list of Documents.
     */
    public abstract searchVectorStore(
        query: string,
        dbName: string,
        topK?: number
    ): Promise<Document[]>;
}