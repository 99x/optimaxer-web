

export class DetectEnv {
    /**
     * 
     * @returns {boolean}
     * Check if the current environment is NodeJS or Browser.
     */
    static isNode():boolean {
        return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    }
    
    static isBrowser():boolean {
        return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    }
}
