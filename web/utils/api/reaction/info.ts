/**
 * Retrieve information about a specific reaction by its slug.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} slug  - The slug of the reaction to retrieve information about.
 *
 * @returns {Promise<any | null>} A promise that sends a GET request to retrieve reaction information.
 * Returns the reaction data if found, or null if there's an error or the reaction doesn't exist.
 */
const GetReactionInfo = async (token: string, slug: string): Promise<any | null> => {
    if (slug === null) {
        console.log("[GET] .../reaction/info/{slug}: slug is null");
        return null;
    }

    if (token === null) {
        console.log(`[GET] .../reaction/info/${slug}: token is null`);
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/reaction/info/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../reaction/info/${slug} (Error: ${data?.status}): \"${data?.message}\".`);
            return null;
        }

        console.log(`[GET] .../reaction/info/${slug}: \"Reaction found\".`);
        console.log(data);

        return data?.data;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

export { GetReactionInfo };
