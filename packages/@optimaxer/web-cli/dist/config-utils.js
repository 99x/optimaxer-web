export function transformCommandConfig(inputData) {
    const result = [];
    inputData.forEach(item => {
        const entity = item.name.toLowerCase();
        Object.keys(item.actions).forEach(action => {
            result.push({ entity, action, id: item.id });
        });
    });
    return result;
}
export function transformActionConfig(inputData) {
    const result = [];
    const availableActions = new Set();
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
