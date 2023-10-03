/**
 * The Login function is an asynchronous function that sends a POST request to a login API endpoint
 * with the provided email and password, and returns the response as JSON.
 * @param {string} email - The `email` parameter is a string that represents the user's email address.
 * It is used to identify the user during the login process.
 * @param {string} password - The `password` parameter is a string that represents the user's password.
 * It is used to authenticate the user during the login process.
 * @returns The function `Login` returns a Promise that resolves to a JSON object.
 */
const LoginAPI  = async (email: string, password : string) => {
    try {
        const response = await fetch(`https://api.zertus.fr/area51/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default LoginAPI;