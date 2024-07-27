import { AbstractAction } from "../AbstractAction.js";
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

export class NewApp extends AbstractAction {

    async run(options:any): Promise<void> {
        
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

        this.log(chalk.greenBright('===| Next Steps |==='));
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
                    this.log(chalk.greenBright('===| Done |==='));
                }
            });
        } else {
            this.log('\n');
            this.log('Navigate to the project directory and run "npm i" to install npm packages.');
            this.log(chalk.blueBright('cd ' + appName));
            this.log(chalk.blueBright('npm i'));
            this.log('\n');
            this.log(chalk.greenBright('===| Done |==='));
        }
    }
}