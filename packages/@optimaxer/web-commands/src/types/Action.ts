/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

/**
 * Action Interface
 * 
 * This interface represents an action that can be performed. It includes the endpoint
 * to which the action should be directed and any parameters required for the action.
 */
export interface Action {
    /**
     * The endpoint to which the action should be directed.
     */
    endpoint?: string;

    /**
     * The parameters required for the action.
     */
    params: object;

    /**
     * The function which needs to be executed
     */
    functionName?: string;
}
