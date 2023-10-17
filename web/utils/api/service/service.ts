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
        const response = await fetch(`https://area51.zertus.fr/service`, {
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

export { GetServices };
