// --- Type --- //
import { NextRouter } from "next/router";

// --- Provider --- //
import { useUser } from "./UserProvider";

// --- Interface --- //
import { UserProfile } from "./interface";

const GetProfile = async (token: string) => {
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
        return null;
    }
};

const DeleteProfile = async (token: string, router: NextRouter) => {
    if (token === null)
        console.log("[DELETE] .../user/me: token is null");

    try {
        const response = await fetch(`https://area51.zertus.fr/user/me`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
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

export { GetProfile, DeleteProfile };
