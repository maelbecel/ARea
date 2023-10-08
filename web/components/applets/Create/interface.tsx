export interface Card {
    type: string; // action or reaction
    decoration: {
        logoUrl: string;         // url of the logo
        backgroundColor: string; // background color of the card
    };
    slug: string;        // default "", slug of the card
    description: string; // default "", description of the card
};

export const defaultAction = {
    type: "action",
    decoration: {
        logoUrl: "",
        backgroundColor: "#D9D9D9"
    },
    slug: "",
    description: ""
} as Card;

export const defaultReaction = {
    type: "reaction",
    decoration: {
        logoUrl: "",
        backgroundColor: "#363841"
    },
    slug: "",
    description: ""
} as Card;
