/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

/**
 * Validation Error Interface
 * 
 * This interface includes the data of failed validation errors
 */
interface ValidationError{
    message: string;
    failedTests: string[]
}

/**
 * CommandResponse Interface
 * 
 * This interface represents the response of a command execution. It includes the status 
 * of the execution, a message providing additional information, and a URL for further 
 * reference or action.
 */
export interface CommandResponse {
    /**
     * The status of the command execution (e.g., "success", "failure").
     */
    status: string;

    /**
     * A message providing additional information about the command execution.
     */
    msg: string;

    /**
     * A URL for further reference or action related to the command execution.
     */
    url: string;

    /**
     * Output of the function is stored in this parameter.
     */
    functionOutput: any

    /**
     * Failed validation tests are included here.
     */
    error?: ValidationError
    
}
