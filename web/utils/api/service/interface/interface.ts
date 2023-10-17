export interface Service {
    name: string;
    slug: string;
    actions: any[];
    reactions: any[];
    decoration: {
        logoUrl: string;
        backgroundColor: string;
    }
};
