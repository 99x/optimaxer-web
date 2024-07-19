/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Action } from "./Action";

/**
 * Parameters Interface
 * 
 * This interface defines the structure of the parameters required to create an Entity.
 */
interface Parameters {
    /**
     * The name of the entity.
     */
    name: string;

    /**
     * The unique identifier for the entity.
     */
    id: number;

    /**
     * A collection of actions associated with the entity, mapped by keys.
     */
    actions: { [key: string]: Action };

    /**
     * The default action to be performed on the entity.
     */
    defaultAction: string;
    validations: {[key: string]: string}
}

/**
 * Entity Class
 * 
 * This class represents an entity that has a name, ID, a set of associated actions,
 * and a default action. It provides a structure for managing entity-related data 
 * and functionality.
 */
export class Entity {
    name: string;
    id: number;
    actions: { [key: string]: Action };
    defaultAction: string;
    validations: {[key: string]: string}

    /**
     * Constructor for the Entity class.
     * @param params - An object conforming to the Parameters interface.
     * 
     * This constructor initializes the Entity's properties using the provided parameters.
     */
    constructor({ name, id, actions, defaultAction, validations }: Parameters) {
        this.name = name;
        this.id = id;
        this.actions = actions;
        this.defaultAction = defaultAction;
        this.validations = validations;
    }
}
