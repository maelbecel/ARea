/**
 * Interface for the input of the action
 * @name name    name of the input
 * @name label   label of the input
 * @name value   value of the input
 * @name options options of the input (if type is SELECT)
 * @name type    type of the input (TEXT, URL, NUMBER, SELECT)
 * @name valid   if the input is valid
 */
export interface Input {
    name: string;
    label: string;
    value: string;
    options: string[];
    type: string;
    valid: boolean;
};

/**
 * Interface for the action applet
 */
export interface ActionApplet {
    actionSlug: string;
    actionInputs: Input[];
};

/**
 * Interface for the reaction applet
 */
export interface ReactionApplet {
    reactionSlug: string;
    reactionInputs: Input[];
};

/**
 * Default value of the Input interface
 * Used to initialize the input of the applet
 */
export const defaultInput = [{
    name: "",
    label: "",
    value: "",
    options: [],
    type: "",
    valid: false
}] as Input[];

/**
 * Default value of the ActionApplet interface
 * Used to initialize the action of the applet
 */
export const defaultActionApplet = {
    actionSlug: "",
    actionInputs: defaultInput
} as ActionApplet;

/**
 * Default value of the ReactionApplet interface
 * Used to initialize the reaction of the applet
 */
export const defaultReactionApplet = {
    reactionSlug: "",
    reactionInputs: defaultInput
} as ReactionApplet;

/**
 * Default value of the ActionApplet interface
 * Used to initialize the action of the applet
 */
export const defaultReactionsApplet = [
    defaultReactionApplet
] as ReactionApplet[];
