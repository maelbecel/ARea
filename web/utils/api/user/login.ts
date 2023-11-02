/**
 * Log in a user by sending a POST request to the server with their email and password.
 *
 * @param {string} email    - The user's email for authentication.
 * @param {string} password - The user's password for authentication.
 *
 * @returns {Promise<string | null>} A promise that attempts to log in the user.
 * Returns the user's token if login is successful, or null if there's an error.
 */
const UserLogin = async (email: string, password: string): Promise<string | null> => {
    if (email === null || password === null) {
        console.log("[POST] .../user/login: email or password is null");
        return null;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email   : email,
                password: password
            })
        });

        const data = await response.json();

        if (data?.status === 401) {
            console.log("[POST] .../user/login (Error: 401): \"Bad Credentials\".");
            localStorage.removeItem("token");
            return null;
        }

        console.log("[POST] .../user/login: \"User logged in successfully\".");
        console.log(data);

        localStorage.setItem("token", data?.data);

        return data?.data as string;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

export { UserLogin };
