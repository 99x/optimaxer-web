# Architecture

## Dependency Structure

Github Organization: optimaxer_ai

Git repositories (npm libraries) and dependencies:

```mermaid
graph LR;
    web-edge-core --> web-edge-commands;
    web-edge-core --> web-edge-translate;
    web-edge-core --> web-edge-rag;
    web-edge-core --> web-edge-english;
    web-edge-core --> web-edge-forms;
    web-edge-core --> web-edge-text;
    web-edge-core --> web-edge-search;
    web-edge-core --> web-edge-help;
```

### web-edge-core

Handles core functionality such as loading models, running inference in web workers, and managing resources.

``` javascript
import { Optimaxer } from 'optimaxer/web-edge-core';

const model = await Optimaxer.loadModel({ model: 'gemma-2b' });

```

### web-edge-commands

Provides a command-line interface web applications to execute simple natural language commands. The library can understand the commands like 'open Order 1234', 'show me the latest news', 'create a new task', etc. and execute the corresponding actions by navigating the web routes to load the required pages or perform the necessary operations.

You should configure the library with the entities, actions, and routes to handle the commands. The library can also validate the commands based on the configured validations before executing the actions.

```typescript
interface EntityConfig {
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
```

Below is an example configuration:

```typescript
let configuration: EntityConfig[] = [
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

```

You can then run the commands using the `CommandRunner` class:

```typescript
import { CommandRunner, EntityConfig } from 'optimaxer/web-edge-commands';

const runner = new CommandRunner();
runner.configure(configuration as EntityConfig[]);

runner.runCommand('show me Order 1234')
    .then((result: string) => {
        console.log(result);
    })
    .catch((error: Error) => {
        console.error(error);
    });
```

- The library will identify the entity, action, and parameters from the command and execute the corresponding route or action based on the configuration.
- In the case where user specify the `id` of the entity, the library will validate the `id` based on the configured validations before executing the action. If the `id` is valid, the library will execute the corresponding action route with the `id` parameter.
- If `id` is not specified the library will see any searchable parameter is provided such as a string and will try to find the entity based on the searchable parameter. In this case, the library will execute the `lookup` route with the searchable parameter and the next action to be executed.
- On the lookup route, the requested action will be available in the `next_action` parameter. This can be used to determine the next action to be executed after the entity is found.

### web-edge-translate

Provides translation services for web applications. The library can do language detection, translate text from one language to another in real-time, enabling users to interact with content in their preferred language.

### web-edge-rag

Provides retrieval-augmented generation (RAG) capabilities for web applications. The library can generate text based on a given prompt and retrieve relevant information from a large document to enhance the generated content.

### web-edge-english

Provides English language processing capabilities for web applications. The library can perform tasks such as grammar and spelling checks to enhance the quality of text inputs and outputs.

### web-edge-forms

Provides form processing capabilities for web applications. The library can auto fill a form by extracting information from a given text, advanced validation of form inputs, suggest corrections, and provide real-time feedback to users to improve the quality of form submissions.

### web-edge-text

Provides text processing capabilities for web applications. The library can perform tasks such as content generation, information extraction, rephrasing, auto complete, summarization, sentiment analysis, and more to enhance the user experience and provide valuable insights from text inputs.

### web-edge-search

Provides search capabilities for web applications. The library can understand natural language queries, formulate a advanced search query without users manually navigating through advanced search fields.

### web-edge-help

Provides contextual help capabilities for web applications. The library can provide real-time assistance based on the current user actions/inputs, offering tips or additional information related to possible next actions, enhancing the user experience and reducing the need for manual learning.
