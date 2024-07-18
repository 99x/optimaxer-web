/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { AbstractLLMInferenceEngine } from "./AbstractLLMInferenceEngine";
import { AvailableModels } from "../types/AvailableModels";
import { AIChatMessage, ChatMessage, HumanChatMessage, SystemChatMessage } from "../types/ChatMessages";
import { env, pipeline, Message, TextGenerationOutput } from '@xenova/transformers';
import { Model, ModelInfo } from "../types/Model";
import { EventEmitter } from 'eventemitter3';

/**
 * TransformerJSModel
 * This type is extended by the `Model` Enum to enforce the model type.
 */
type TransformerJSModel = Model | 'llama' | 'gemma' | 'tinyllama' | 'tinymistral';

/**
 * LLMStatus type to represent the status of the LLM Inference.
 * @param progress - The progress of the inference. in most models this will be a float.
 * @param text - The text of the inference.
 * @param timeElapsed - The time elapsed for the inference.
 */
type LLMStatus = {
    progress: number;
    text: string;
    timeElapsed: number;
}

/**
 * TransformerJSInferenceEngine class to handle the LLM Inference using the TransformerJS.
 * This class extends the LLMInferenceFactory to enforce the methods.
 */
export class TransformerJSInferenceEngine extends AbstractLLMInferenceEngine {

    private status: LLMStatus;
    private statusEmitter: EventEmitter;
    llmModel:TransformerJSModel;

    
    // Local Models
    // availableModels: AvailableModels = {
    //     'llama': new ModelInfo('onnx-Llama-160M-Chat-v1'),
    //     'tinymistral': new ModelInfo('onnx-TinyMistral-248M-Chat-v2'),
    //     'gemma':new ModelInfo('tiny-random-GemmaForCausalLM'),
    //     'tinyllama': new ModelInfo('TinyLlama-1.1B-Chat-v1.0')
    // };

    // Remote Models
    availableModels: AvailableModels = {
        'llama': new ModelInfo('Felladrin/onnx-Llama-160M-Chat-v1'),
        'gemma':new ModelInfo('Xenova/tiny-random-GemmaForCausalLM'),
        'tinyllama': new ModelInfo('Xenova/TinyLlama-1.1B-Chat-v1.0'),
        'tinymistral': new ModelInfo('Felladrin/onnx-TinyMistral-248M-Chat-v2')
    };

    /**
     * constructor
     * @param model - The model to be used for inference. should be one of allowed models.
     * Allowed Models: 'llama', 'gemma', 'tinyllama'
     * This list of models will be updated as more models are added in the future releases.
     * 
     * the `env.remoteHost` and `env.remotePathTemplate` can be used to set the 
     * remote host and the path template.
     * 
     * the commented out code can be used to set the local model repos.
    **/
    constructor(model:TransformerJSModel) {
        super();
        env.allowLocalModels = false;
        env.allowRemoteModels = true;

        // env.remoteHost = "http://127.0.0.1:8000/models/";
        // env.remotePathTemplate = "{model}";

        this.llmModel = model;
        this.status = {
            progress: 0,
            text: '[ Initializing ]',
            timeElapsed: 0
        };

        this.statusEmitter = new EventEmitter();
    }

    async runChatInference(chat: ChatMessage[]): Promise<ChatMessage[]> {
        
        const pipe = await pipeline('text-generation', this.getModel(),{
            progress_callback: this.progressCallback.bind(this)
        });

        const messages:Message[] = chat.map((message:ChatMessage) => {
            return {
                role: message.role,
                content: message.content
            };
        });

        const prompt:string = pipe.tokenizer.apply_chat_template(messages, {
            tokenize: false, add_generation_prompt: true,
        }) as string;

        const result = await pipe(prompt);

        console.log(result);

        return this.processChatOutput(result as TextGenerationOutput);
    }

    /**
     * processChatOutput
     * @param chatOutput - The output from the chat inference.
     * @returns Promise<ChatMessage[]>
     * 
     * This function is used to process the chat output and return the ChatMessage[].
     * All the models have different output formats, so this function is used to process the output.
     * If the variation between the models is too high, then this function will be
     * Moved to a separate class and will be extended by the main class.
     * @throws Error - If the chatOutput is not in the expected format.
     * */
    protected async processChatOutput(chatOutput:TextGenerationOutput): Promise<ChatMessage[]> {
        try {
            const chatString = chatOutput[0].generated_text.toString();

        const isChatOrGen = chatString.includes('<|im_start|>');

        const ChatMessageParts = chatString.split(isChatOrGen ? '<|im_start|>':' \n ');

        const constructedChat:ChatMessage[] = [];

        ChatMessageParts.forEach((part:string)=>{
            let partString:string = part.replaceAll('<|im_end|>\n','');
            let role_content: string[] = partString.split('\n');

            if (role_content[0] === 'system'){
                constructedChat.push(
                    new SystemChatMessage(role_content[1])
                )
            }
            
            if (role_content[0] === 'user'){
                constructedChat.push(
                    new HumanChatMessage(role_content[1])
                )
            }

            if (role_content[0] === 'assistant'){
                constructedChat.push(
                    new AIChatMessage(role_content[1])
                )
            }
        });
        return constructedChat;
        } catch(e){
            throw new Error("Model Output parsing Error. Unexpected Output format.")
        }
    }

    async runCompletionInference(prompt: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    progressCallback(progress: any) {
        this.status = progress;
        this.statusEmitter.emit('statusChange', this.status);
    }
    

    /**
     * getModel
     * @returns string
     * 
     * This function is used to get the model name from the available models.
     *
     * @throws Error - If the model is not found or not supported.
     * */
    protected getModel(): string {
        try {
            return this.availableModels[this.llmModel].name;
        } catch (error) {
            throw new Error("Model not Found or not Supported!")
        }
    }

    
    

    /**
     * onStatusChange
     * @param listener - The listener to be used for status change.
     * 
     * This function is used to listen to the status change of the inference.
     * 
     */
    onStatusChange(listener: (status: LLMStatus) => void) {
        this.statusEmitter.on('statusChange', listener);
    }
}