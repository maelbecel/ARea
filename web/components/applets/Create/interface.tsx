export interface Card {
    type: string; // action or reaction
    service: string;     // name of the service
    decoration: {
        logoUrl: string;         // url of the logo
        backgroundColor: string; // background color of the card
    };
    slug: string;        // default "", slug of the card
    name: string;        // default "", name of the card
    description: string; // default "", description of the card
    fields: inputs[];    // default [], fields of the card
    inputs: string[];
    placeholders: any;
};

export interface inputs {
    name : string;     // name of the input
    label: string;     // label of the input
    type : string;     // type of the input (TEXT, URL, NUMBER, SELECT)
    options: string[]; // options of the input (if type is SELECT)
}

export const defaultAction = {
    type: "action",
    service: "",
    decoration: {
        logoUrl: "",
        backgroundColor: "#D9D9D9"
    },
    slug: "",
    description: "",
    name: "",
    fields: [] as inputs[],
    inputs: [] as string[],
    placeholders: {}
} as Card;

export const defaultReaction = {
    type: "reaction",
    service: "",
    decoration: {
        logoUrl: "",
        backgroundColor: "#363841"
    },
    slug: "",
    description: "",
    name: "",
    fields: [] as inputs[],
    inputs: [] as string[],
    placeholders: {}
} as Card;

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

export const defaultInput = [{
    name: "",
    label: "",
    value: "",
    options: [],
    type: "",
    valid: false
}] as Input[];

export const defaultActionApplet = {
    actionSlug: "",
    actionInputs: defaultInput
} as ActionApplet;

export const defaultReactionApplet = {
    reactionSlug: "",
    reactionInputs: defaultInput
} as ReactionApplet;

export const defaultReactionsApplet = [
    defaultReactionApplet
] as ReactionApplet[];
