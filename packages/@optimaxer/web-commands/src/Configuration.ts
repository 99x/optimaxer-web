// Configuration.ts
import { EntityConfig } from './EntityConfig';

export const configuration: EntityConfig[] = [
    { 
        entity: 'Order',
        actions: ['view', 'delete', 'edit', 'new'], 
        routes: {
            new: () => 'order/new',
            edit: (id) => `order/edit/${id}`,
            delete: (id) => `order/delete/${id}`,
            view: (id) => `order/view/${id}`,
            lookup: (query, action) => `order/lookup/${query}/next_action/${action}`
        },
        defaultAction: 'view',
        validations: {
            isValidId: (id) => !isNaN(Number(id)), 
            isValidQuery: (query) => query.length > 0,
        },
    },
    { 
        entity: 'News',
        actions: ['view', 'new'], 
        routes: {
            new: () => 'news/new',
            view: (id) => `news/view/${id}`,
            lookup: (query, action) => `news/lookup/${query}/next_action/${action}`
        },
        defaultAction: 'view',
    },
    { 
        entity: 'Task',
        actions: ['view', 'delete', 'edit', 'new'], 
        routes: {
            new: () => 'task/new',
            edit: (id) => `task/edit/${id}`,
            delete: (id) => `task/delete/${id}`,
            view: (id) => `task/view/${id}`,
            lookup: (query, action) => `task/lookup/${query}/next_action/${action}`
        },
        defaultAction: 'view',
    },
];
