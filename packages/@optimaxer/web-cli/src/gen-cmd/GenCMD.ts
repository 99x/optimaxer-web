import { Command } from "commander";
import { AbstractAction } from "../AbstractAction.js";
import chalk from "chalk";
import fs from 'fs';

import { 
    transformCommandConfig,
    transformActionConfig,
} from './config-utils.js';

import { 
    transformActions,
    transformCommands,
} from './parser-utils.js';
import { runLLM, Vars } from "./openai-utils.js";
import ora from "ora";

export class GenCMD extends AbstractAction {
  
    async run(options:any): Promise<void> {

        const config:[] = await this.getFileContent(options.Cf);
        const trainingFactor:number = Number.parseInt(options.Tf);

        const commandVars:Vars = {
            "config_array": transformCommandConfig(config),
            "training_factor": trainingFactor
        }

        const actionVars:Vars = {
            "config_array": transformActionConfig(config),
            "training_factor": trainingFactor
        }

        const commandSpinner = ora('Generating Commands...').start();
        const commandGenResult:string = await runLLM(options.Oak,commandVars,'command');
        commandSpinner.succeed('Commands Generated.');

        const actionSpinner = ora('Generating Actions...').start();
        const actionGenResult:string = await runLLM(options.Oak,actionVars,'action');
        actionSpinner.succeed('Actions Generated.');

        const jsonCommandResult = transformCommands(JSON.parse(commandGenResult));
        const jsonActionResult = transformActions(JSON.parse(actionGenResult),transformActionConfig(config));

        const saveSpinner = ora('Writing to files...').start();
        const currentDirectory = process.cwd();

        fs.writeFileSync(`${currentDirectory}/commands.json`, JSON.stringify(jsonCommandResult, null, 2));
        fs.writeFileSync(`${currentDirectory}/actions.json`, JSON.stringify(jsonActionResult, null, 2));    
        saveSpinner.succeed('Files written successfully.');
    }

    async getFileContent(filePath:string): Promise<[]> {

        const currentDirectory = process.cwd();
    
        const cleanedFilePath:string = filePath.replace(/\\/g, '/');
        const absoluteFilePath = `${currentDirectory}/${cleanedFilePath}`;
    
        if (fs.existsSync(absoluteFilePath)) {
            const data = fs.readFileSync(absoluteFilePath, 'utf8');
            return JSON.parse(data);
        } else {
            this.log(chalk.red(`ERROR: File "${filePath}" does not exist.`));
            process.exit(1);
        }
    }
    
}