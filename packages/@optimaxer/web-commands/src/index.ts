// index.ts
import { CommandRunner } from './CommandRunner';
import { configuration } from './Configuration';

const runner = new CommandRunner();
runner.configure(configuration);

runner.runCommand('show me Order 1234')
    .then((result: string) => {
        console.log(result);
    })
    .catch((error: Error) => {
        console.error(error);
    });
