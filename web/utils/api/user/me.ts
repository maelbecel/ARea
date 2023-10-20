// --- Type --- //
import { NextRouter } from "next/router";

// --- Interface --- //
import { UserProfile } from "./interface/interface";

/**
 * Retrieve the user's profile using a GET request.
 *
 * @param {string} token - The user's authentication token.
 *
 * @returns {Promise<UserProfile | null>} A promise that retrieves the user's profile.
 * Returns the user's profile data if successful, or null in case of an error.
 *
 * @warning Don't forget to check if the result is null, before giving it to the useAuth provider.
 */
const GetProfile = async (token: string): Promise<UserProfile | null> => {
    if (token === null) {
        console.log("[GET] .../user/me: token is null");
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/user/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../user/me (Error: ${data?.status}): \"${data?.message}\".`);
            return null;
        }

        console.log("[GET] .../user/me: \"User found\".");
        console.log(data);

        return data?.data as UserProfile;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

/**
 * Delete the user's profile using a DELETE request.
 * At the end, redirect into the home page ("/")
 * @param {string} token      - The user's authentication token.
 * @param {NextRouter} router - The Next.js router instance for page navigation.
 *
 */
const DeleteProfile = async (token: string, router: NextRouter) => {
    if (token === null) {
        console.log("[DELETE] .../user/me: token is null");
        return;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/user/me`, {
            method: "DELETE",
            headers: {
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status === 400) {
            console.log("[DELETE] .../user/me (Error: 400): \"Bad user id\".");
            return;
        }

        console.log("[DELETE] .../user/me: \"User deleted\".");
        console.log(data);

        localStorage.removeItem("token");
        router.push("/");
    } catch (error: any) {
        console.log(error);
    }
};

/**
 * Update user profile information using a PATCH request.
 *
 * @param {string} token    - The user's authentication token.
 * @param {string} email    - The user's new email.
 * @param {string} username - The user's new username.
 *
 * @returns {Promise<UserProfile | null>} A promise that resolves with the updated user profile data or null on error.
 * 
 * @warning Don't forget to check if the result is null, before giving it to the useAuth provider.
 */
const PatchProfile = async (token: string, email: string, username: string): Promise<UserProfile | null> => {
    if (token === null) {
        console.log("[PATCH] .../user/me: token is null");
        return null;
    }

    if (email === null || username === null) {
        console.log("[PATCH] .../user/me: email, username or password is null");
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/user/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                email   : email,
                username: username,
            })
        });

        const data = await response.json();

        if (data?.status === 400) {
            console.log("[PATCH] .../user/me (Error: 400): \"Bad format email\".");
            return null;
        }

        console.log("[PATCH] .../user/me: \"User updated\".");
        console.log(data);

        return data?.data;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};


/**
 * Update user profile information using a PATCH request.
 *
 * @param {string} token    - The user's authentication token.
 * @param {string} password - The user's new password.
 *
 * @returns {Promise<UserProfile | null>} A promise that resolves with the updated user profile data or null on error.
 * 
 * @warning Don't forget to check if the result is null, before giving it to the useAuth provider.
 */
const PatchProfilePassword = async (token: string, password: string): Promise<UserProfile | null> => {
    if (token === null) {
        console.log("[PATCH] .../user/me: token is null");
        return null;
    }

    if (password === null || password === "") {
        console.log("[PATCH] .../user/me: password is null");
        return null;
    }

    try {
        const response = await fetch(`https://area51.zertus.fr/user/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                password: password
            })
        });

        const data = await response.json();

        if (data?.status === 400) {
            console.log("[PATCH] .../user/me (Error: 400): \"Bad format email\".");
            return null;
        }

        console.log("[PATCH] .../user/me: \"User updated\".");
        console.log(data);

        return data?.data as UserProfile;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};
export { GetProfile, DeleteProfile, PatchProfile, PatchProfilePassword };
