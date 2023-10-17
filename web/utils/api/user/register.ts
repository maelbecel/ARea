/**
 * Register a new user by sending a POST request to the server with their email, username, and password.
 *
 * @param {string} email    - The user's email for registration.
 * @param {string} username - The desired username for the user.
 * @param {string} password - The user's chosen password.
 *
 * @returns {Promise<string | null>} A promise that attempts to register the user.
 * Returns the user's token if registration is successful, or null if there's an error.
 */
const UserRegister = async (email: string, username: string, password: string): Promise<string | null> => {
    if (email === null || username === null || password === null) {
        console.log("[POST] .../user/register: email, username or password is null");
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email   : email,
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[POST] .../user/register (Error: ${data?.status}): \"${data?.message}\".`);
            localStorage.removeItem("token");
            return null;
        }

        console.log("[POST] .../user/register: \"User registered successfully\".");
        console.log(data);

        localStorage.setItem("token", data?.data);

        return data?.data as string;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

export { UserRegister };
