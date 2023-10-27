import { NextRouter } from "next/router";

/**
 * Create an applet by sending a POST request to the server.
 *
 * @param {string} token      - The user's authentication token.
 * @param {Object} body       - The request body containing data to create the applet.
 * @param {NextRouter} router - Next.js router object for navigation.
 *
 * @returns {Promise<void>} A promise that sends a POST request to create an applet.
 * Redirects to "/myApplets" upon success. Logs success or error messages.
 */
const CreateApplet = async (token: string, body: any, router: NextRouter): Promise<void> => {
    if (token === null) {
        console.log("[POST] .../applet: token is null");
        return;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/applet`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data?.status !== 201) {
            console.log(`[POST] .../applet (Error: ${data?.status}): \"${data?.message}\".`);
            return;
        }

        console.log("[POST] .../applet: \"Successfully created applet.\"");
        console.log(data);

        router.push("/myApplets");
    } catch (error: any) {
        console.log(error);
    }
    return;
};

/**
 * Retrieve an applet with a specific ID by sending a GET request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} id    - The ID of the applet to retrieve.
 *
 * @returns {Promise<Object | null>} A promise that sends a GET request to retrieve an applet.
 * Returns the applet data if successful, or null on error. Logs success or error messages.
 */
const GetAppletWithID = async (token: string, id: string): Promise<any | null> => {
    if (id === null) {
        console.log(`[GET] .../applet/{id}: id is null`);
        return null;
    }

    if (token === null) {
        console.log(`[GET] .../applet/${id}: token is null`);
        return null;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[GET] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
            return null;
        }

        console.log(`[GET] .../applet/${id}: \"Successfully retrieved applet.\"`);
        console.log(data);

        return data?.data;
    } catch (error: any) {
        console.log(error);
    }
    return null;
};

/**
 * Delete an applet with a specific ID by sending a DELETE request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} id    - The ID of the applet to delete.
 *
 * @returns {Promise<void>} A promise that sends a DELETE request to delete an applet.
 * Logs success or error messages. Does not return data.
 */
const DeleteAppletWithID = async (token: string, id: string): Promise<void> => {
    if (id === null) {
        console.log(`[DELETE] .../applet/{id}: id is null`);
        return;
    }

    if (token === null) {
        console.log(`[DELETE] .../applet/${id}: token is null`);
        return;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data?.status !== 204) {
            console.log(`[DELETE] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
            return;
        }

        console.log(`[DELETE] .../applet/${id}: \"Successfully deleted applet.\"`);
        console.log(data);
    } catch (error: any) {
        console.log(error);
    }
    return;
};

/**
 * Update an applet with a specific ID by sending a PATCH request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} id    - The ID of the applet to delete.
 * @param {string} title - The new title of the applet.
 *
 * @returns {Promise<void>} A promise that sends a PATCH request to patch an applet.
 * Logs success or error messages. Does not return data.
 */
const UpdateAppletTitleWithID = async (token: string, id: string, title: string ): Promise<void> => {
    if (id === null) {
        console.log(`[PATCH] .../applet/{id}: id is null`);
        return;
    }

    if (token === null) {
        console.log(`[PATCH] .../applet/${id}: token is null`);
        return;
    }

    if (title === null) {
        console.log(`[PATCH] .../applet/${id}: title is null`);
        return;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({
                name   : title,
            })
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[PATCH] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
            return;
        }

        console.log(`[PATCH] .../applet/${id}: \"Successfully patched applet.\"`);
        console.log(data);
    } catch (error: any) {
        console.log(error);
    }
    return;
};

/**
 * Update an applet with a specific ID by sending a PATCH request to the server.
 *
 * @param {string} token - The user's authentication token.
 * @param {string} id    - The ID of the applet to delete.
 * @param {object} body - The new content of the applet.
 *
 * @returns {Promise<void>} A promise that sends a PATCH request to patch an applet.
 * Logs success or error messages. Does not return data.
 */
const UpdateAppletWithID = async (token: string, id: string, body: object): Promise<void> => {
    if (id === null) {
        console.log(`[PATCH] .../applet/{id}: id is null`);
        return;
    }

    if (token === null) {
        console.log(`[PATCH] .../applet/${id}: token is null`);
        return;
    }

    try {
        const response = await fetch(`${localStorage.getItem("address") as string}/applet/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data?.status !== 200) {
            console.log(`[PATCH] .../applet/${id} (Error: ${data?.status}): \"${data?.message}\".`);
            return;
        }

        console.log(`[PATCH] .../applet/${id}: \"Successfully patched applet.\"`);
        console.log(data);
    } catch (error: any) {
        console.log(error);
    }
    return;
};

export { CreateApplet, GetAppletWithID, DeleteAppletWithID, UpdateAppletTitleWithID, UpdateAppletWithID };
