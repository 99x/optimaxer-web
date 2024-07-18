
/**
 * ChatMessage class is the base class for all chat messages.
 * - There are three types of chat messages.
 *      - SystemChatMessage - Messages from the system.
 *      - AIChatMessage - Messages from the AI assistant.
 *      - HumanChatMessage - Messages from the user.
 */ 
export abstract class ChatMessage {
    role:string;
    content:string;

    /**
     * @param role - Role of the chat message.
     * @param content - Content of the chat message. a string.
     */
    constructor(role:string, content:string){
        this.role = role;
        this.content = content;
    }
    
    
    /**
     * @returns {object} - Returns the JSON representation of the chat message
    */
    toJSON():object{
        return {
            role: this.role,
            content: this.content
        }
    }
}

/**
 * HumanChatMessage class is a concrete class of ChatMessage.
 * It represents the chat messages from the user.
 */
export class HumanChatMessage extends ChatMessage{
    constructor(content:string){
        super('user', content);
    }
}

/**
 * SystemChatMessage class is a concrete class of ChatMessage.
 * It represents the chat messages from the system.
 */
export class SystemChatMessage extends ChatMessage{
    constructor(content:string){
        super('system', content);
    }
}

/**
 * AIChatMessage class is a concrete class of ChatMessage.
 * It represents the chat messages from the AI assistant.
 */
export class AIChatMessage extends ChatMessage {
    constructor(content:string){
        super('assistant', content);
    }
}