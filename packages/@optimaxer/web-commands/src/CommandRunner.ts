// Import the necessary modules and classes
import { EntityConfig } from './EntityConfig'; // Importing EntityConfig class for configuring entities
import { PipelineFactory  } from './PipelineFactory'; // Importing PipelineFactory class to create and manage the pipeline
import { CommandIntentIdentification, CommandEntityExtraction, CommandTaskExecution } from './PipelineStep'; // Importing pipeline steps

// Define the CommandRunner class which is responsible for running commands through a pipeline
export class CommandRunner {
    // Private property to store entity configurations
    private entities: EntityConfig[] = [];

    // Method to configure the entities, accepts an array or a promise that resolves to an array of EntityConfig
    async configure(entities: EntityConfig[] | Promise<EntityConfig[]>): Promise<void> {
        // Await the resolution of the promise if entities is a promise, otherwise directly assign
        this.entities = await entities;
    }

    // Method to run a command through the pipeline
    async runCommand(command: string): Promise<any> {
        // Instantiate the PipelineFactory to manage the pipeline steps
        const pipelineFactory = new PipelineFactory();

        // Add the CommandIntentIdentification step to the pipeline
        pipelineFactory.addStep(new CommandIntentIdentification());
        // Add the CommandEntityExtraction step to the pipeline
        pipelineFactory.addStep(new CommandEntityExtraction());
        // Add the CommandTaskExecution step to the pipeline
        pipelineFactory.addStep(new CommandTaskExecution());

        // Execute the pipeline with the provided command as input and get the final context
        const context = await pipelineFactory.executePipeline(command);

        // Log the final TaskContext to the console for debugging or informational purposes
        console.log('Final TaskContext:', context);

        // Optionally, return the context or a specific result from the context
        return context;
    }
}
