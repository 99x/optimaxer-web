# @optimaxer/web-commands

## Overview

The @optimaxer/web-commands is a powerful library designed for managing and executing commands using web-based LLM models. It provides an intuitive interface for defining command pipelines, formatting prompts, and handling responses efficiently.


## Installation

To install the library, run:

```bash
npm install @optimaxer/web-commands
```


## Available Components

- `Command Pipeline`: Setting up and executing commands seamlessly.


## Features

- **Setup Pipeline:** Setting up the pipeline by creating vector stores and embeddings.
- **Run Pipeline:** Exectuting the user given natural language commands with the help of LLM.


## Setting Up the Command Pipeline

To set up the command pipeline, you can load your command and action definitions from JSON files and initialize the `CommandPipeline`. Here's an example:

```javascript
// Import the library
import { CommandPipeline } from '@optimaxer/web-commands';

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
// Import the library
import { CommandPipeline } from '@optimaxer/web-commands';

// Create a new CommandPipeline instance
const cmdPipeline = new CommandPipeline();

// Load configuration settings from a JSON file
const config = await loadJson('/config.json');

// Define and include the JS functions you need to execute specific actions in the following registry
const functionRegistry = {
  createNewOrder: function(params: any) {
    // Define the function to create a new order
  },
  deleteOrder: function(params: any) {
    // Define the function to delete an order
  }
}

// Run the pipeline with a user command, configuration, model type, and function registery
const response = await cmdPipeline.run(userCommand, config, 'gemma', functionRegistry);
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
            "functionName": "deleteOrder",
            "validations": {
                "order_id": "function order_id(order_id) { return !isNaN(num) && typeof num === 'number' && isFinite(num); }"
            }
        }
    }
}
```
- **name**: The name of the entity.
- **id**: A unique identifier for the entity.
- **actions**: A dictionary containing different actions for the entity.
  - **endpoint**: The URL of the UI component to be rendered.
  - **params**: Data objects that need to be extracted with their meanings.
  - **functionName**: (Optional) The name of the JavaScript function to be executed for that action. When running the pipeline, define the necessary JS functions in your code base and pass them inside the function registry parameter.
  - **validations**: (Optional) The validation functions to be triggered on the extracted parameters should be defined here. The key of the object should be the name of the parameter, and the value should be the JS function to be executed on that specific parameter. The JS function should return a boolean as the function output..



### Commands  File
The commands file is a JSON array of objects used to create embeddings to identify the entity. This file uses a vector-based similarity calculation approach. Users should provide different versions of typical commands and map them to the relevant entity id in the config file.

#### (The generation of command files can be automated using OpenAI. The @optimaxer/optimaxer-cli package facilitates this functionality. Details are provided in the section Command-Action File Generation.)

#### Sample Format
```json
{
    "content": "show order",
    "metadata": {
      "id": 1
    }
}
```

- **content**: The sample command.
- **metadata**: An object where the value of the `id` key should match the appropriate entity id in the config file.
- **id**: Should match the entity id in the config file.


### Action File
The action file is a JSON array of objects used to create vector embeddings. These embeddings help identify the user's intent or action in real-time using the user command.

#### (The generation of action files can be automated using OpenAI. The @optimaxer/optimaxer-cli package facilitates this functionality. Details are provided in the section Command-Action File Generation.)

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


### Command-Action File Generation
The command and action file generation is automated using our tool @optimaxer/optimaxer-cli. To use this library, you should have an OpenAI API key.

First, install the library globally:

```bash
npm install -g optimaxer-cli
```

Then, execute the following command:

```bash
optimaxer-cli gen -cf <Config file> -tf <Training Factor> -oak <Open AI Key>
```

In the above command replace the parameters with the following details:
- **Config file**: The location of your `config.json` file.
- **Training Factor**: The number of examples you need to generate using the LLM. Start with a factor of 10 and increase if necessary to improve accuracy (note that increasing the training factor may cost more on your OpenAI account). 
- **Open AI Key**: Your OpenAI API key.

After executing the command, you will see two generated JSON files for actions and commands. Place them appropriately within your code base or read the files directly from the root folder.


### Validation Functions

Validation functions are used to ensure that the parameters extracted from user commands meet certain criteria before executing an action. Each validation function should return a boolean indicating whether the parameter is valid.

#### Example Validation Function

```javascript
function order_id(order_id) {
  return !isNaN(order_id) && typeof order_id === 'number' && isFinite(order_id);
}
```

In the config file, you can specify the validation function for a parameter like this:

```json
"validations": {
  "order_id": "function order_id(order_id) { return !isNaN(order_id) && typeof order_id === 'number' && isFinite(order_id); }"
}

```

### Function Registry
The function registry is a collection of JavaScript functions that are used to execute specific actions. When running the command pipeline, you need to define these functions and pass them to the pipeline.

#### Example Function Registry
```javascript
const functionRegistry = {
  createNewOrder: function(params) {
    // Function to create a new order
  },
  deleteOrder: function(params) {
    console.log('Delete order: ',params["order_id"]);
    // Function to delete an order
  }
};
```
When running the pipeline, pass the function registry as a parameter:
```javascript
const response = await cmdPipeline.run(userCommand, config, 'gemma', functionRegistry);
```

## Contributing

We welcome contributions! Please fork the repository and submit a pull request for any enhancements or bug fixes.


## License
This project is licensed under the MIT License.