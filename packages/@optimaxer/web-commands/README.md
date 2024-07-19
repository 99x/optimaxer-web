# @optimaxer/web-commands

## Overview

The @optimaxer/web-commands is a powerful library designed for managing and executing commands using web-based LLM models. It provides an intuitive interface for defining command pipelines, formatting prompts, and handling responses efficiently.


## Installation

To install the library, run:

```bash
npm install @optimaxer/web-core
```


## Available Components

- `Command Pipeline`: Setting up and executing commands seamlessly.


## Features

- **Setup Pipeline:** Setting up the pipeline by creating vector stores and embeddings.
- **Run Pipeline:** Exectuting the user given natural language commands with the help of LLM.


## Setting Up the Command Pipeline

To set up the command pipeline, you can load your command and action definitions from JSON files and initialize the `CommandPipeline`. Here's an example:

```javascript
// Load command and action definitions from JSON files
const commandJson = await loadJson('/commands.json');
const actionsJson = await loadJson('/actions.json');

// Create a new CommandPipeline instance
const cmdPipeline = new CommandPipeline();

// Set up the pipeline with the loaded commands and actions
const setup = await cmdPipeline.setup(commandJson, actionsJson);
```


## Running the Command Pipeline

To execute the command pipeline, you can load a configuration file and run the pipeline with a user command. Here's an example:

```javascript
// Create a new CommandPipeline instance
const cmdPipeline = new CommandPipeline();

// Load configuration settings from a JSON file
const config = await loadJson('/config.json');

// Run the pipeline with a user command, configuration, and model type
const response = await cmdPipeline.run(userCommand, config, 'gemma');
```

## Configuration Files

### Config File
The config file is essential as it stores the configurations of commands and their execution details. This file is an array of JSON objects, each representing an entity with its associated actions. The `name` is the entity's name, and the `id` should be unique for each entity.

#### Sample Format
```json
{
    "name": "Order",
    "id": 1,
    "actions": {
        "new": {
            "endpoint": "",
            "params": {},
            "functionName": "createNewOrder"
        },
        "edit": {
            "endpoint": "order/edit/${order_id}",
            "params": {
                "order_id": "Extract the id of the order"
            }
        },
        "delete": {
            "endpoint": "order/delete/${order_id}",
            "params": {
                "order_id": "Extract the id of the order"
            },
            "functionName": "deleteOrder"
        },
        "view": {
            "endpoint": "order/view/${order_id}",
            "params": {
                "order_id": "Extract the id of the order"
            }
        }
    },
    "defaultAction": "view"
}
```
- **name**: The name of the entity.
- **id**: A unique identifier for the entity.
- **actions**: A dictionary containing different actions for the entity.
  - **endpoint**: The URL of the UI component to be rendered.
  - **params**: Data objects that need to be extracted with their meanings.
  - **functionName**: (Optional) The name of the JavaScript function to be executed for that action.
- **defaultAction**: The default action to be performed for the entity.


### Commands  File
The commands file is a JSON array of objects used to create embeddings to identify the entity. This file uses a vector-based similarity calculation approach. Users should provide different versions of typical commands and map them to the relevant entity id in the config file.

#### Sample Format
```json
{
    "content": "show order",
    "id": 1
}
```

- **content**: The sample command.
- **id**: Should match the entity id in the config file.


### Action File
The action file is a JSON array of objects used to create vector embeddings. These embeddings help identify the user's intent or action in real-time using the user command.

#### Sample Format
```json
{
    "content": "show",
    "id": 0,
    "metadata": {
        "name": "view"
    }
}
```

- **content**: The action or verb for the command.
- **id**: The index or a unique value for the action.
- **metadata**: An object where the value of the `name` key should match the appropriate action name in the config file.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request for any enhancements or bug fixes.


## License
This project is licensed under the MIT License.