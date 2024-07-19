/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

class JsonKeyMapper {
    /**
     * tokenize
     * @param str - The string to be tokenized and normalized.
     * @returns Array of strings
     * 
     * This function converts the input string to lowercase and splits it by underscores.
     */
    static tokenize(str: string) {
        return str.toLowerCase().split('_');
    }

    /**
     * levenshtein
     * @param stringA - The first string for comparison.
     * @param stringB - The second string for comparison.
     * @returns number
     * 
     * This function computes the Levenshtein distance between two strings. The Levenshtein distance
     * is a metric for measuring the difference between two sequences by counting the minimum number 
     * of operations required to transform one string into the other.
     */
    static levenshtein(stringA: string, stringB: string) {
        const matrix = [];

        for (let i = 0; i <= stringB.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= stringA.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= stringB.length; i++) {
            for (let j = 1; j <= stringA.length; j++) {
                if (stringB.charAt(i - 1) === stringA.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                    );
                }
            }
        }

        return matrix[stringB.length][stringA.length];
    }

    /**
     * computeSimilarity
     * @param stringA - The first string for comparison.
     * @param stringB - The second string for comparison.
     * @returns number
     * 
     * This function computes the similarity between two strings based on the Levenshtein distance.
     * The similarity is calculated as (maxLength - Levenshtein distance) / maxLength, where maxLength
     * is the length of the longer string.
     */
    static computeSimilarity(stringA: string, stringB: string): number {
        const maxLength = Math.max(stringA.length, stringB.length);
        if (maxLength === 0) return 1.0;
        return (maxLength - JsonKeyMapper.levenshtein(stringA, stringB)) / maxLength;
    }

    /**
     * mapKeysAndExtractValues
     * @param schema - The schema object containing the target keys.
     * @param data - The data object containing the source keys and values.
     * @returns object
     * 
     * This function maps the keys from the schema to the closest matching keys in the data object
     * based on similarity. It then extracts the values from the data object and creates a new object
     * with the schema keys and the corresponding values.
     */
    static mapKeysAndExtractValues(schema: object, data: { [key: string]: string }): { [key: string]: string } {
        // Extract keys from schema and data
        const schemaKeys = Object.keys(schema);
        const dataKeys = Object.keys(data);
    
        // Create an array to store the maximum similarity scores for each schema key
        const similarityScores: { schemaKey: string, maxSimilarity: number, bestMatch: string | null }[] = [];
    
        // Compute similarity scores for each schema key
        schemaKeys.forEach((schemaKey) => {
            let maxSimilarity: number = -1;
            let bestMatch: string | null = null;
    
            dataKeys.forEach((dataKey) => {
                const similarity: number = JsonKeyMapper.computeSimilarity(schemaKey, dataKey);
                console.log(`Similarity for ${schemaKey} and ${dataKey} is: ${similarity}`);
                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    bestMatch = dataKey;
                }
            });
    
            similarityScores.push({ schemaKey, maxSimilarity, bestMatch });
        });
    
        // Sort the similarity scores in descending order based on the maxSimilarity
        similarityScores.sort((a, b) => b.maxSimilarity - a.maxSimilarity);
    
        // Create a mapping object and track used data keys
        let mapping: { [key: string]: any } = {};
        let usedDataKeys = new Set();
    
        // Perform the mapping based on sorted similarity scores
        similarityScores.forEach(({ schemaKey, bestMatch }) => {
            if (bestMatch !== null && !usedDataKeys.has(bestMatch)) {
                mapping[schemaKey] = bestMatch;
                usedDataKeys.add(bestMatch);
            }
        });
    
        // Create the result object based on the mapping
        let result: { [key: string]: string } = {};
        Object.keys(schema).forEach((key: string) => {
            if (mapping[key]) {
                result[key] = data[mapping[key]];
            } else {
                result[key] = "";
            }
        });
    
        return result;
    }
    
}

export { JsonKeyMapper };
