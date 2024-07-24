export const appTs:string = `
import { CommandPipeline } from '@optimaxer/web-commands';

// DOM elements
const commandInput = document.getElementById("commandInput") as HTMLInputElement;
const submitButton = document.getElementById("submitButton") as HTMLButtonElement;
const saveEmbeddingsButton = document.getElementById("saveEmbeddingsButton") as HTMLButtonElement;
const loadingIndicator = document.getElementById("loadingIndicator") as HTMLDivElement;
const urlContainer = document.getElementById("urlContainer") as HTMLDivElement;
const urlText = document.getElementById("urlText") as HTMLDivElement;
const saveMessage = document.getElementById("saveMessage") as HTMLDivElement;

// @ts-ignore
let loading = false;

// Function to handle the Save Embeddings button click
const handleSetupPipeline = async () => {
    try {
        await setupPipeline();
        showSaveMessage('Embeddings saved successfully!');
    } catch (error) {
        showSaveMessage('Failed to save embeddings!', true);
    }
};

// Function to handle the Submit button click
const handleSubmit = async () => {
    setLoading(true);
    urlContainer.hidden = true;
    const result = await runPipeline(commandInput.value);
    if (result.error) {
        urlText.textContent = result.error.message + "  |  Failed Tests: " + result.error.failedTests;
        urlContainer.hidden = false;
    } else {
        urlText.textContent = result.url;
        urlContainer.hidden = false;
    }
    setLoading(false);
};

// Event listener for the Save Embeddings button
saveEmbeddingsButton.addEventListener("click", handleSetupPipeline);

// Event listener for the Submit button
submitButton.addEventListener("click", handleSubmit);

// Function to load JSON data
const loadJson = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
};

// Function to set up the pipeline
const setupPipeline = async () => {
    const commandJson = await loadJson('/commands.json');
    const actionsJson = await loadJson('/actions.json');
    const cmdPipeline = new CommandPipeline();
    const setup = await cmdPipeline.setup(commandJson, actionsJson);
    return setup;
};



// Function to run the pipeline
const runPipeline = async (userCommand: string) => {
    const cmdPipeline = new CommandPipeline();
    const config = await loadJson('/config.json');
    const response = await cmdPipeline.run(userCommand, config, 'gemma', {});
    return response;
};



// Function to show the success or error message for saving embeddings
const showSaveMessage = (message: string, isError: boolean = false) => {
    saveMessage.textContent = message;
    saveMessage.style.color = isError ? 'red' : 'green';
    saveMessage.hidden = false;
    setTimeout(() => saveMessage.hidden = true, 5000);
};

// Function to toggle the loading state
const setLoading = (isLoading: boolean) => {
    loading = isLoading;
    loadingIndicator.hidden = !isLoading;
    submitButton.disabled = isLoading;
};
`;
