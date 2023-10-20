/**
 * Retrieve inputs information for a specific action by its slug.
 *
 * @param {string} token      - The user's authentication token.
 * @param {string} slug       - The slug of the action.
 *
 * @returns {Promise<any | null>} A promise that sends a GET request to retrieve action inputs.
 * Returns the input data if found, or null if there's an error or the inputs don't exist.
 */
const GetActionInputs = async (token: string, slug: string): Promise<any | null> => {
    if (slug === null) {
        console.log("[GET] .../action/${slug}: slug is null");
        return null;
    }

    if (token === null) {
        console.log(`[GET] .../action/${slug}: token is null`);
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/action/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        console.log("DATA -> ",     data);

        if (data?.status !== 200) {
            console.log(`[GET] .../action/${slug} (Error: ${data?.status}): \"${data?.message}\".`);
            return null;
        }

        console.log(`[GET] .../action/${slug}: \"Action found\".`);
        console.log(data);

        return data?.data;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

export { GetActionInputs };
