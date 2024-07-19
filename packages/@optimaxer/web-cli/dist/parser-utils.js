export function transformCommands(llmResult) {
    const transformedCommands = [];
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
export function transformActions(llmResult, configArray) {
    const transformedActions = [];
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
