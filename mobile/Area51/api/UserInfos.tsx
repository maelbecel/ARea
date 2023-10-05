/**
 * The Login function is an asynchronous function that sends a POST request to a login API endpoint
 * with the provided token and serverAddress, and returns the response as JSON.
 * @param {string} token - The `token` parameter is a string that represents the user's token.
 * It is used to identify the user during the login process.
 * @param {string} serverAddress - The `serverAddress` parameter is a string that represents the serverAddress.
 * It is used to authenticate the user during the login process.
 * @returns The function `Login` returns a Promise that resolves to a JSON object.
 */
const UserInfosAPI  = async (token: string, serverAddress : string) => {
    try {
        const data = await (
            await fetch(`${serverAddress}/user/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
        ).json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default UserInfosAPI;