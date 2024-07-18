

import { AbstractVectorStoreEngine } from "./AbstractVectorStoreEngine";
import { Voy, Resource } from "voy-search";

export class VoyVectorStoreEngine extends AbstractVectorStoreEngine {
    async createVectorStore(dbName: string, entities: any[]): Promise<any> {

        // Implement this : https://github.com/tantaraio/voy
       

        const resource:Resource = { embeddings: [] };
        const store = new Voy(resource);

        throw new Error("Method not implemented.");
    }

    async searchVectorStore(query: string, dbName: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}