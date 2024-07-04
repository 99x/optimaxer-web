import * as optimaxer99xcore from "@optimaxer99x/web-edge-core";
export class PipelineFactory {
    // Private property to store the steps of the pipeline, which are instances of PipelineStep
    private steps: optimaxer99xcore.PipelineStep[] = [];
  
    // Method to add a step to the pipeline
    addStep(step: optimaxer99xcore.PipelineStep): void {
      this.steps.push(step);
    }
  
    // Method to execute the pipeline with a given input string
    async executePipeline(input: string): Promise<optimaxer99xcore.TaskContext> {
      // Initialize a TaskContext object with the provided input
      const context: optimaxer99xcore.TaskContext = { input };
  
      // Iterate over each step in the pipeline and execute it, passing the context object
      for (const step of this.steps) {
        await step.execute(context);
      }
  
      // Return the final context object after all steps have been executed
      return context;
    }
  }