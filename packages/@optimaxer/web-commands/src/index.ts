// index.ts
import { CommandRunner } from './CommandRunner';
import { configuration } from './Configuration';

import Optimaxer  from '../node_modules/@optimaxer99x/web-edge-core/src/optimaxer/web-edge-core'; // Update the import path
import * as webllm from "@mlc-ai/web-llm";
const runner = new CommandRunner();
runner.configure(configuration);

runner.runCommand('show me Order 1234')
    .then((result: string) => {
        console.log(result);
    })
    .catch((error: Error) => {
        console.error(error);
    });
