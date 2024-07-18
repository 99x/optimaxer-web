
/**
 * Metadata interface.
 */
interface Metadata {
    [key: string]: Metadata | string | number | boolean | any[];
}

/**
 * Parameters interface.
 */
interface Parameters {
    id?:number;
    content: string;
    metadata?: Metadata;
}

/**
 * Document class. Used to represent a document before vectorization.
 * Usually what will be returned from a VectorSearch.
 */
export class Document {
    id?: number;
    content: string;
    metadata: Metadata;

    /**
     * @param id - Document ID.
     * @param content - Document content.
     * @param metadata - Document metadata.this can be any object or JSON.
     * 
     */
    constructor({id, content, metadata = {}}:Parameters) {
        this.id = id;
        this.content = content;
        this.metadata = metadata;
    }

    /**
     * @returns {object} - Returns the JSON representation of the document.
     */
    toJSON():object{
        return {
            content: this.content,
            metadata: this.metadata
        }
    }
}