#!/usr/bin/env node
import { Command } from 'commander';
import { GenCMD } from './gen-cmd/GenCMD.js';
import { NewApp } from './new-app/NewApp.js';
import { GenCon } from './gen-con/GenCon.js';
const program = new Command();
const version = '0.1.0';
program
    .name('Optimaxer CLI')
    .version(version)
    .description('Optimaxer CLI tool');
program
    .command('gen-cmd')
    .description('Generate Commands.')
    .requiredOption('-oak <string>', 'OpenAI API Key')
    .requiredOption('-cf <string>', 'Config File (Default: config.json)')
    .requiredOption('-tf <number>', 'Training Factor Target')
    .action(async (options) => {
    const genCMD = new GenCMD();
    await genCMD.run(options);
});
program
    .command('new-app')
    .description('Generate a Simple implementation of the Optimaxer SDK.')
    .requiredOption('-n <string>', 'Project Name (Default: optimaxer-app)')
    .action(async (options) => {
    const newApp = new NewApp();
    await newApp.run(options);
});
program
    .command('gen-con')
    .description('Generate Contents from a given URL.')
    .requiredOption('-u <string>', 'URL')
    .action(async (options) => {
    const genCon = new GenCon();
    await genCon.run(options);
});
program.parse();
