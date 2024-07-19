import OpenAI from 'openai';
const generate_commands_prompt = `
You are an AI assistant who will generate sample natural language commands for a given config file.

You have given a array as following.
config array: {config_array}

For each of the object in the given array create {training_factor} different sample natural language commands a user will give to invoke the action.
Then output all those commands in a json array having the following format.
    - content : "The natural language command"
    - id : "The relevant id"

Return only the output json array.
Do not return any other information.
`;
const generate_actions_prompt = `
You are an AI assistant who will generate sample natural language actions for a given config file.

You have given a array as following.
config array: {config_array}

For each of the object in the given array provide {training_factor} different synonyms (provide only the synonym not a sentence) a user will give to invoke the action.
Then output all those commands in a json array having the following format.
    - content : "The natural language command"
    - action : "The relevant action"

Return only the output json array.
Do not return any other information.
`;
export async function runLLM(apiKey, vars, mode) {
    const openai = new OpenAI({
        apiKey: apiKey,
    });
    const prompt = mode === "command" ? generate_commands_prompt : generate_actions_prompt;
    const formatedConfigs = prompt.replace("{config_array}", JSON.stringify(vars.config_array));
    const formatedPrompt = formatedConfigs.replace("{training_factor}", vars.training_factor.toString());
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: formatedPrompt }
        ],
        model: 'gpt-4-turbo',
        temperature: 0,
    });
    return chatCompletion.choices[0].message.content;
}
