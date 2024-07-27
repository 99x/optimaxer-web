import chalk from "chalk";
import { Command } from "commander";

export abstract class AbstractAction {  
    program = new Command();
    version:string = '0.1.0';
    log = console.log;

    constructor() {
        this.log(chalk.blueBright(`
            ===| Optimaxer CLI |===
                ${this.version}
        `));
    }

    abstract run(options:any): Promise<void>;
}