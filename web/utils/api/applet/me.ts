/**
 * Retrieve a list of applets associated with the authenticated user.
 *
 * @param {string} token - The user's authentication token.
 *
 * @returns {Promise<any[]>} A promise that sends a GET request to retrieve the user's applets.
 * Returns an array of applet data or an empty array if there's an error.
 */
const GetMyApplets = async (token: string): Promise<any[]> => {
    if (token === null) {
        console.log(`[GET] .../applet/me: token is null`);
        return [];
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/applet/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../applet/me (Error: ${data?.status}): \"${data?.message}\".`);
            return [];
        }

        console.log(`[GET] .../applet/me: \"Successfully retrieved applets.\"`);
        console.log(data);

        return data?.data;
    } catch (error: any) {
        console.log(error);
    }
    return [];
};

export { GetMyApplets };
