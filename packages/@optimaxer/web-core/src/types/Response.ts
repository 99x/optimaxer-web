

export class Response {
    public status:number;
    public message:string;

    /**
     * @param status - HTTP status code.
     * @param message - Response message.
    **/
    constructor(status:number, message:string) {
        this.status = status;
        this.message = message;
    }
}