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
