// Define an interface for the entity configuration
export interface EntityConfig {
    entity: string;
    actions: string[];
    routes: {
        lookup: (query: string, action: string) => string;
        [action: string]: (...args: any[]) => string;
    };
    validations?: {
        [action: string]: (query: string) => boolean;
    };
    defaultAction?: string;
}