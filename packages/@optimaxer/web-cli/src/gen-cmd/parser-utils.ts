import { TransformedActionItem } from "./config-utils.js";

interface CommandLLMResult {
    content: string;
    id: string;
}

interface ActionLLMResult {
    content: string;
    action: string;
}

interface TransformedAction {
    content: string;
    metadata: {
        name: string;
    };
}

interface TransformedCommand {
    content: string;
    metadata: {
        id: number;
    };
}

export function transformCommands(llmResult: CommandLLMResult[]): TransformedCommand[] {
    const transformedCommands: TransformedCommand[] = [];
    
    llmResult.forEach(result => {
        transformedCommands.push({
            content: result.content,
            metadata: {
                id: Number.parseInt(result.id)
            }
        });
    });
    
    return transformedCommands;
}



export function transformActions(llmResult: ActionLLMResult[], configArray: TransformedActionItem[]): TransformedAction[] {
    const transformedActions: TransformedAction[] = [];
    
    configArray.forEach(action => {
        transformedActions.push({
            content: action.action,
            metadata: {
                name: action.action
            }
        });
    });
    
    llmResult.forEach(result => {
        transformedActions.push({
            content: result.content,
            metadata: {
                name: result.action
            }
        });
    });
    
    return transformedActions;
}