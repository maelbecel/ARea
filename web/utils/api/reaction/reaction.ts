/**
 * Retrieve inputs information for a specific reaction by its slug and action slug.
 *
 * @param {string} token      - The user's authentication token.
 * @param {string} slug       - The slug of the reaction.
 * @param {string} actionSlug - The slug of the action within the reaction.
 *
 * @returns {Promise<any | null>} A promise that sends a GET request to retrieve reaction inputs.
 * Returns the input data if found, or null if there's an error or the inputs don't exist.
 */
const GetReactionInputs = async (token: string, slug: string, actionSlug: string): Promise<any | null> => {
    if (slug === null || actionSlug === null) {
        console.log("[GET] .../reaction/${slug}/${actionSlug}: slug or actionSlug is null");
        return null;
    }

    if (token === null) {
        console.log(`[GET] .../reaction/${slug}/${actionSlug}: token is null`);
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/reaction/${slug}/${actionSlug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../reaction/${slug}/${actionSlug} (Error: ${data?.status}): \"${data?.message}\".`);
            return null;
        }

        console.log(`[GET] .../reaction/${slug}/${actionSlug}: \"Reaction inputs found\".`);
        console.log(data);

        return data?.data;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

export { GetReactionInputs };
