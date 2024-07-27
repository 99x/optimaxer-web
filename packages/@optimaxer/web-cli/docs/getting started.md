# Creating a Simple App with Optimaxer/web-commands

Follow this guide to quickly create a simple app with **Optimaxer/web-commands** library without any frameworks.

The sample app will focus on order management, providing functionalities such as order creation, deletion, viewing orders by ID, and editing orders by ID. 

It will display the corresponding URL for each action based on user commands.

## Step 1: Install The Optimaxer-CLI

Install the Optimaxer-CLI globally on your machine. This CLI tool will help you create a new Optimaxer project.
```bash
npm install -g optimaxer-cli
```



## Step 2: Create a New Optimaxer Project

```bash
optimaxer-cli new-app -n <app-name>
```

:::info
This will create a new directory with the provided name.
if there is already a directory with the same name, the CLI will warn you and cancel the operation.
:::

:::tip
Replace `app-name` with the name of your app. You can use any npm package name compliant name. if the name is not compliant, the CLI will automatically convert it to a compliant name.
:::

After running the command, you will be prompted to install the required dependencies. If You select `yes`, the CLI will automatically install the dependencies for you.

## Step 3: Run the Web App

Navigate to the newly created project directory and run the following command to start a development server:

```bash
cd app-name
npm run dev
```

The app will start on an available port on the localhost. By clicking on the localhost URL provided in the terminal, you can open the app in a browser window.

Before using the app, you need to save the embedding file for the selected configuration. Click on the "Save Embedding File" button to perform this step. Once the embedding saving is completed, the app can be used.

In the app, you can type a natural language command, and the generated appropriate URL will be shown in the response box. This URL can be used to navigate through the application after configuring the routing mechanism of the end application.

## Included Sample Data

This newly created Optimaxer Web Project will included the following sample data files in the project:

- `data/config.json` - Contains the configuration details for the app.
- `data/actions.json` - Generated actions based on the Config.
- `data/commands.json` - Contains the sample commands for the app.

:::info
Both `actions.json` and `commands.json` files are generated using the `Optimaxer-CLI` based on the configuration provided in the `config.json` file. We have included the generated files in the project just for your convenience so you can run the app without an OpenAI API key.
:::

:::tip
If you want generate the `actions.json` and `commands.json` files using the `Optimaxer-CLI`, run the following command:
```bash
optimaxer-cli gen cmd -cf <config-file-path> -tf 1 -oak <openai-apikey>
```
:::

## Sample Commands

Here are some sample commands you can try:

- Create new order
- Show me the order 43
- Delete order 23
- Edit the order 25



---

This concludes the guide for creating a basic app with the `Optimaxer/web-commands` library. If you encounter any issues or have further questions, please contact our support team.
