/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

/**
 * JsonDocument Interface
 * 
 * This interface defines the structure of a JSON document, which includes an optional ID,
 * the main content as a string, and associated metadata.
 */
export interface JsonDocument {
    /**
     * An optional unique identifier for the JSON document.
     */
    id?: number;

    /**
     * The main content of the JSON document, represented as a string.
     */
    content: string;

    /**
     * Metadata associated with the JSON document, structured as an object.
     */
    metadata: Metadata;
}

/**
 * Metadata Interface
 * 
 * This interface represents the structure of the metadata object, which can contain 
 * nested objects, strings, numbers, booleans, or arrays.
 */
interface Metadata {
    [key: string]: Metadata | string | number | boolean | any[];
}
