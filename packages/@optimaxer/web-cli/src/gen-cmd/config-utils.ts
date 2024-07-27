interface CommandInputItem {
    name: string;
    id: string;
    actions: { [key: string]: any };
}

interface ActionInputItem {
    actions: { [key: string]: any };
}

export interface TransformedActionItem {
    action: string;
}

export interface TransformedCommandItem {
    entity: string;
    action: string;
    id: string;
}

export function transformCommandConfig(inputData: CommandInputItem[]): TransformedCommandItem[] {
    const result: TransformedCommandItem[] = [];
    
    inputData.forEach(item => {
        const entity = item.name.toLowerCase();
        Object.keys(item.actions).forEach(action => {
            result.push({ entity, action, id: item.id });
        });
    });
    
    return result;
}

export function transformActionConfig(inputData: ActionInputItem[]): TransformedActionItem[] {
    const result: TransformedActionItem[] = [];
    const availableActions: Set<string> = new Set();
    
    inputData.forEach(item => {
        Object.keys(item.actions).forEach(action => {
            if (!availableActions.has(action)) {
                availableActions.add(action);
                result.push({ action });
            }
        });
    });
    
    return result;
}