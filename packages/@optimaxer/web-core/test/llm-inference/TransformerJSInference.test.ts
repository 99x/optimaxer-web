

import { expect, test } from 'vitest';

import { TransformerJSInference } from '../../src/llm-inferences/TransformerJSInference';
import { ChatMessage, HumanChatMessage, SystemChatMessage } from '../../src/types/ChatMessages';



test('Run Inference on Test Input', async () => {
    const llmModel: TransformerJSInference = new TransformerJSInference('tinymistral');

    const chat: ChatMessage[] = [
        new SystemChatMessage('Tell Me about Newton'),
    ];

    llmModel.onStatusChange((status) => {
        console.log(status);
    });

    const response: ChatMessage[] = await llmModel.runChatInference(chat);


    

    expect(response.length).toBe(2);
    expect(response[1].role).toBe('assistant');
    expect(response[1].content).not.toBe('');
});