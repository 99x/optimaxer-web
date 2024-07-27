/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { AbstractEmbedderEngine } from "./AbstractEmbedderEngine";
import { AvailableModels } from "../types/AvailableModels";
import { Document } from "../types/Document";
import { VectorDocument } from "../types/VectorDocument";
import { Model } from '../types/Model';


type EmbedderModel = Model | 'ada-002';

export class RemoteEmbeddingEngine extends AbstractEmbedderEngine{
    
    embedderModel:EmbedderModel;
    availableModels: AvailableModels = {};

    constructor(model:EmbedderModel) {
        super();
        this.embedderModel = model;
    }

    embedTexts(texts: string[]): Promise<number[][]> {
        throw new Error("Method not implemented.");
    }
    embedDocuments(documents: Document[]): Promise<VectorDocument[]> {
        throw new Error("Method not implemented.");
    }

    getModel(): string {
        try {
            return this.availableModels[this.embedderModel].name;
        } catch (error) {
            throw new Error("Model not Found or not Supported!")
        }
    }
    
}