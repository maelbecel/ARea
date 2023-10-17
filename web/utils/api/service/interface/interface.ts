export interface Service {
    name: string;
    slug: string;
    action: any[];
    reaction: any[];
    decoration: {
        logoUrl: string;
        backgroundColor: string;
    }
};
