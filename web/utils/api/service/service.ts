// --- Interface --- //
import { Service } from "./interface/interface";

/**
 * Fetch a list of services available for the user by sending a GET request to the server.
 *
 * @param {string} token - The user's authentication token.
 *
 * @returns {Promise<Service[]>} A promise that fetches a list of available services.
 * Returns an array of services if successful, or an empty array [] if there's an error.
 */
const GetServices = async (token: string): Promise<Service[]> => {
    if (token === null) {
        console.log("[GET] .../service: token is null");
        return [];
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/service`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../service (Error: ${data?.status}): \"${data?.message}\".`);
            return [];
        }

        console.log("[GET] .../service: \"Successfully fetched services.\"");
        console.log(data);

        return data?.data as Service[];
    } catch (error: any) {
        console.log(error);
    }
    return [];
};

/**
 * Fetch a service by its unique slug by sending a GET request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} slug  - The unique slug of the service to fetch.
 *
 * @returns {Promise<Service | null>} A promise that fetches the service with the specified slug.
 * Returns the service object if successful, or null if there's an error.
 */
const GetService = async (token: string, slug: string): Promise<Service | null> => {
    if (slug === null) {
        console.log(`[GET] .../service/{slug}: slug is null`);
        return null;
    }

    if (token === null) {
        console.log(`[GET] .../service/${slug}: token is null`);
        return null;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/service/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../service/${slug} (Error: ${data?.status}): \"${data?.message}\".`);
            return null;
        }

        console.log(`[GET] .../service/${slug}: \"Successfully fetched service.\"`);
        console.log(data);

        return data?.data as Service;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

export { GetServices, GetService };
