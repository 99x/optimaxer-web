#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';
import { transformCommandConfig, transformActionConfig, } from './config-utils.js';
import { transformActions, transformCommands, } from './parser-utils.js';
import { runLLM } from './openai-utils.js';
const program = new Command();
const log = console.log;
async function getFileContent(filePath) {
    const currentDirectory = process.cwd();
    const cleanedFilePath = filePath.replace(/\\/g, '/');
    const absoluteFilePath = `${currentDirectory}/${cleanedFilePath}`;
    if (fs.existsSync(absoluteFilePath)) {
        const data = fs.readFileSync(absoluteFilePath, 'utf8');
        return JSON.parse(data);
    }
    else {
        log(chalk.red(`ERROR: File "${filePath}" does not exist.`));
        process.exit(1);
    }
}
program
    .name('Optimaxer CLI')
    .version('0.0.6')
    .description('Optimaxer CLI tool');
program
    .command('gen')
    .description('Generate Commands.')
    .requiredOption('-oak <string>', 'OpenAI API Key')
    .requiredOption('-cf <string>', 'Config File (Default: config.json)')
    .requiredOption('-tf <number>', 'Training Factor Target')
    .action(async (options) => {
    log(chalk.blueBright(`
            ===| Optimaxer CLI |===
                    V 0.0.6  
        `));
    const config = await getFileContent(options.Cf);
    const trainingFactor = Number.parseInt(options.Tf);
    const commandVars = {
        "config_array": transformCommandConfig(config),
        "training_factor": trainingFactor
    };
    const actionVars = {
        "config_array": transformActionConfig(config),
        "training_factor": trainingFactor
    };
    const commandSpinner = ora('Generating Commands...').start();
    const commandGenResult = await runLLM(options.Oak, commandVars, 'command');
    commandSpinner.succeed('Commands Generated.');
    const actionSpinner = ora('Generating Actions...').start();
    const actionGenResult = await runLLM(options.Oak, actionVars, 'action');
    actionSpinner.succeed('Actions Generated.');
    const jsonCommandResult = transformCommands(JSON.parse(commandGenResult));
    const jsonActionResult = transformActions(JSON.parse(actionGenResult), transformActionConfig(config));
    const saveSpinner = ora('Writing to files...').start();
    const currentDirectory = process.cwd();
    fs.writeFileSync(`${currentDirectory}/commands.json`, JSON.stringify(jsonCommandResult, null, 2));
    fs.writeFileSync(`${currentDirectory}/actions.json`, JSON.stringify(jsonActionResult, null, 2));
    saveSpinner.succeed('Files written successfully.');
});
program.parse();
