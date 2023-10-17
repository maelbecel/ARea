/**
 * Verify the user's authentication token using a GET request.
 *
 * @param {string} token - The user's authentication token to verify.
 *
 * @returns {Promise<string | null>} A promise that verifies the user's token.
 * Returns the original token if it's valid, or null if it's invalid.
 */
const VerifyUserToken = async (token: string): Promise<string | null> => {
    if (token === null) {
        console.log("[GET] .../user/verify: token is null");
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/user/verify`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status === 401) {
            console.log("[GET] .../user/verify (Error: 401): \"Token is invalid\".");
            localStorage.removeItem("token");
            return null;
        }

        console.log("[GET] .../user/verify: \"Token is valid\".");
        console.log(data);

        return token;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

export { VerifyUserToken };
