/**
 * LLMStatus type to represent the status of the LLM Inference.
 * @param progress - The progress of the inference. in most models this will be a float.
 * @param text - The text of the inference.
 * @param timeElapsed - The time elapsed for the inference.
 */
export type LLMStatus = {
    progress: number;
    text: string;
    timeElapsed: number;
}