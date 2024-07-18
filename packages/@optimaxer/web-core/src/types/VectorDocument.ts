
export class VectorDocument {
    content: string | object;
    embedding: number[];
    metadata: object;

    /**
     * @param content - The content of the document supports both string and object types.
     * Object type will be converted to string when vectorizing the document.
     * @param embedding - The vector embeddings of the document
     * @param metadata - The metadata of the document. This can be any object.
     **/
    constructor(content: string | object, embedding: number[], metadata: object) {
        this.content = content;
        this.embedding = embedding;
        this.metadata = metadata;
    }

    /**
     * @returns {object} - Returns the JSON representation of the document.
    **/
    toJSON(): object {
        return {
            content: this.content,
            embedding: this.embedding,
            metadata: this.metadata
        }
    }
}