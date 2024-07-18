import { VectorDocument } from "../types/VectorDocument";
import { Document } from "../types/Document";
import { AvailableModels } from "../types/AvailableModels";

/**
 * AbstractEmbedderEngine
 * This Abstract class is responsible for defining the abstract methods that 
 * should be implemented by the EmbedderEngine.
 */
export abstract class AbstractEmbedderEngine {


    abstract availableModels: AvailableModels;

    /**
     * embedTexts
     * This method is responsible for embedding texts using the transformerJS.
     * @param texts string[]
     * @returns Promise<number[]>
     */
    abstract embedTexts(texts: string[]): Promise<number[]>

    /**
     * embedDocuments
     * This method is responsible for embedding documents using the transformerJS.
     * @param documents Document[]
     * @returns Promise<VectorDocument[]>
     */
    abstract embedDocuments(documents: Document[]): Promise<VectorDocument[]>;
}