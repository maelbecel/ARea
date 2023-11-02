/**
 * Fetch an OAuth2 token for a specific service by sending a GET request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} slug  - The unique slug of the service for which the OAuth2 token is requested.
 *
 * @returns {Promise<string | null>} A promise that fetches the OAuth2 token for the specified service.
 * Returns the OAuth2 token as a string if successful, or null if there's an error.
 */
const OAuth2GetToken = async (token: string, slug: string): Promise<string | null> => {
    if (slug === null) {
        console.log("[GET] .../service/{slug}/oauth2/token: slug is null.");
        return null;
    }

    if (token === null) {
        console.log(`[GET] .../service/${slug}/oauth2/token: token is null.`);
        return null;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/service/${slug}/oauth2/token`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../service/${slug}/oauth2/token (Error: ${data?.status}): \"${data?.message}\".`);
            return null;
        }

        console.log(`[GET] .../service/${slug}/oauth2/token: \"Successfully got the OAuth2 token.\".`);
        console.log(data);

        return data?.data as string;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

/**
 * Delete an OAuth2 token for a specific service by sending a DELETE request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} slug - The unique slug of the service for which the OAuth2 token should be deleted.
 *
 * @returns {Promise<void>} A promise that sends a DELETE request to delete the OAuth2 token for the specified service.
 * Does not return any specific value but logs success or error messages.
 */
const DeleteOAuth2Token = async (token: string, slug: string): Promise<number | null> => {
    if (slug === null) {
        console.log("[DELETE] .../service/{slug}/oauth2: slug is null.");
        return null;
    }

    if (token === null) {
        console.log(`[DELETE] .../service/${slug}/oauth2: token is null.`);
        return null;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/service/${slug}/oauth2`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`,
            }
        });


        if (response?.status !== 204) {
            console.log(`[DELETE] .../service/${slug}/oauth2 (Error: ${response?.status}): \"${response?.statusText}\".`);
            return null;
        }

        console.log(`[DELETE] .../service/${slug}/oauth2: \"Successfully deleted the OAuth2 token.\".`);
        console.log(response);
    } catch (error: any) {
        console.log(error);
    }
    return 1;
};

export { OAuth2GetToken, DeleteOAuth2Token };
