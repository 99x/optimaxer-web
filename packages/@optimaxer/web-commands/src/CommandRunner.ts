// src/CommandRunner.ts
import { EntityConfig } from './EntityConfig';

export class CommandRunner {
    private entities: EntityConfig[] = [];

    async configure(entities: EntityConfig[] | Promise<EntityConfig[]>): Promise<void> {
        this.entities = await entities;
    }

    async runCommand(command: string): Promise<any> {
        const [entityName, action, ...args] = this.parseCommand(command);
        const entity = this.entities.find(e => e.entity.toLowerCase() === entityName.toLowerCase());

        if (!entity) {
            throw new Error(`Entity "${entityName}" not found`);
        }

        const actionKey = action || entity.defaultAction;
        if (!actionKey ||!entity.actions.includes(actionKey)) {
            throw new Error(`Action "${actionKey}" not supported for entity "${entityName}"`);
        }

        if (entity.validations && entity.validations[actionKey] && !entity.validations[actionKey](args.join(' '))) {
            throw new Error(`Validation failed for action "${actionKey}" with query "${args.join(' ')}"`);
        }

        const route = entity.routes.lookup(args.join(' '), actionKey);
        return this.executeRoute(route);
    }

    private parseCommand(command: string): [string, string, string[]] {
        const parts = command.match(/(\w+)\s+(view|delete|edit|new)?\s*(.*)/i);
        if (!parts) throw new Error(`Invalid command format: "${command}"`);
        return [parts[1], parts[2], parts[3].split(' ')];
    }

    private async executeRoute(route: string): Promise<any> {
        // Logic to navigate to the route or perform the necessary operation
        return `Executing route: ${route}`;
    }
}
