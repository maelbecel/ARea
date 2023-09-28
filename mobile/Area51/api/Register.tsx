/**
 * The Register function is an asynchronous function that sends a POST request to the specified API
 * endpoint with the provided email, password, and username, and returns the response as JSON.
 * @param {string} email - The email parameter is a string that represents the email address of the
 * user who wants to register.
 * @param {string} password - The password parameter is a string that represents the user's password.
 * @param {string} username - The `username` parameter is a string that represents the username of the
 * user who wants to register.
 * @returns a JSON object.
 */
const RegisterAPI = async (email: string, password : string, username : string) => {
    try {
        const response = await fetch(`https://api.zertus.fr/area51/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, username}),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default RegisterAPI;