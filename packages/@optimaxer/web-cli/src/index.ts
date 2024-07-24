#!/usr/bin/env node

import { Command } from 'commander';
import { exec } from 'child_process';

import prompt from 'prompts';
import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';

// Templates
import { appTs } from './templates/app.js';
import { indexHtml } from './templates/index.js';
import { packageJson } from './templates/package.js';
import { styleCss } from './templates/style.js';
import { tsconfigJson } from './templates/tsconfig.js';
import { viteconfig } from './templates/viteconfig.js';
import { config,commands,actions } from './templates/configs/config.js';


import { 
    transformCommandConfig,
    transformActionConfig,
} from './config-utils.js';

import { 
    transformActions,
    transformCommands,
} from './parser-utils.js';

import { runLLM, Vars } from './openai-utils.js';

const program = new Command();

const log = console.log;

async function getFileContent(filePath:string): Promise<[]> {

    const currentDirectory = process.cwd();

    const cleanedFilePath:string = filePath.replace(/\\/g, '/');
    const absoluteFilePath = `${currentDirectory}/${cleanedFilePath}`;

    if (fs.existsSync(absoluteFilePath)) {
        const data = fs.readFileSync(absoluteFilePath, 'utf8');
        return JSON.parse(data);
    } else {
        log(chalk.red(`ERROR: File "${filePath}" does not exist.`));
        process.exit(1);
    }
}

program
    .name('Optimaxer CLI')
    .version('0.0.8')
    .description('Optimaxer CLI tool');

program
    .command('gen')
    .command('cmd')
    .description('Generate Commands.')
    .requiredOption('-oak <string>','OpenAI API Key')
    .requiredOption('-cf <string>','Config File (Default: config.json)')
    .requiredOption('-tf <number>','Training Factor Target')
    .action(async (options) => {
        
        log(chalk.blueBright(`
            ===| Optimaxer CLI |===
                    V 0.0.8  
        `));

        const config:[] = await getFileContent(options.Cf);
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
    });


program
    .command('new')
    .command('app')
    .description('Generate a Simple implementation of the Optimaxer SDK.')
    .requiredOption('-n <string>','Project Name (Default: optimaxer-app)')
    .action(async (options) => {
        log(chalk.blueBright(`
            ===| Optimaxer CLI |===
                    V 0.0.8  
        `));
        
        const spinner = ora('Creating Project...').start();

        const appName:string = options.n || 'optimaxer-app';
        const npmProjectName = appName.replace(/\s+/g, '-').toLowerCase();

        let packageJsonWithName = packageJson;
        packageJsonWithName.name = npmProjectName;

        const currentDirectory = process.cwd();

        if (fs.existsSync(`${currentDirectory}/${appName}`)) {
            spinner.fail('Project already exists.');
            process.exit(1);
        }
        
        fs.mkdirSync(`${currentDirectory}/${appName}`);
        fs.mkdirSync(`${currentDirectory}/${appName}/src`);
        fs.mkdirSync(`${currentDirectory}/${appName}/data`);

        // HTML Files
        fs.writeFileSync(`${currentDirectory}/${appName}/index.html`, indexHtml);
        fs.writeFileSync(`${currentDirectory}/${appName}/style.css`, styleCss);

        // TS Files
        fs.writeFileSync(`${currentDirectory}/${appName}/src/app.ts`, appTs);
        
        // Configs
        fs.writeFileSync(`${currentDirectory}/${appName}/package.json`, JSON.stringify(packageJsonWithName, null, 2));
        fs.writeFileSync(`${currentDirectory}/${appName}/tsconfig.json`, JSON.stringify(tsconfigJson, null, 2));
        fs.writeFileSync(`${currentDirectory}/${appName}/vite.config.ts`, viteconfig);

        // Sample Data
        fs.writeFileSync(`${currentDirectory}/${appName}/data/commands.json`, commands);
        fs.writeFileSync(`${currentDirectory}/${appName}/data/actions.json`, actions);
        fs.writeFileSync(`${currentDirectory}/${appName}/data/config.json`, config);

        spinner.succeed('Project Created Successfully.');

        log(chalk.greenBright('===| Next Steps |==='));
        const shoudInstallNPMPackages = await prompt({
            type: 'confirm',
            name: 'value',
            message: 'Do you want to install NPM packages now?',
            initial: true
        });

        if(shoudInstallNPMPackages.value){
            const installSpinner = ora('Installing NPM packages...').start();
            process.chdir(`${currentDirectory}/${appName}`);
            exec('npm i', (error, stdout, stderr) => {
                if (error) {
                    installSpinner.fail('Failed to install NPM packages.');
                    process.exit(1);
                } else {
                    installSpinner.succeed('NPM packages installed successfully.');
                    log(chalk.greenBright('===| Done |==='));
                }
            });
        } else {
            log('\n');
            log('Navigate to the project directory and run "npm i" to install npm packages.');
            log(chalk.blueBright('cd ' + appName));
            log(chalk.blueBright('npm i'));
            log('\n');
            log(chalk.greenBright('===| Done |==='));
        }
    })
    ;

program.parse();