/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { AbstractVectorStoreEngine } from "./AbstractVectorStoreEngine";
import { Response } from "../types/Response";
import { Document } from "../types/Document";
import { CloseVectorEmbeddingsWeb, HNSWLib } from "closevector-web";


export class CloseVectorStoreEngine extends AbstractVectorStoreEngine {

    public async createVectorStore(dbName: string, contents: Document[]): Promise<Response> {
        console.log('Creating vector store...');
        const docs = [
            {
                pageContent: "string",
                metadata: {}
            }
        ];
        const embeddings = await HNSWLib.fromDocuments(
            docs,
            new CloseVectorEmbeddingsWeb(
                {
                    key: 'key',
                    secret: 'secret',
                }
            )
        );

        await embeddings.save(dbName);

        return new Promise((resolve, reject) => {
            resolve({
                status: 201,
                message: "TEST"
            });
            });
    }

    public searchVectorStore(query: string, dbName: string, topK:number): Promise<Document[]> {
        throw new Error("Method not implemented.");
    }
}