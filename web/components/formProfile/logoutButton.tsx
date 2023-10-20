import React from "react";
import { useRouter } from "next/router";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { UserProfile } from "../../utils/api/user/interface/interface";


const LogoutButton = () => {

    const router = useRouter();
    const { user, setUser } = useUser();
    const { token, setToken } = useToken();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken("" as string);
        setUser({} as UserProfile);
        router.push("/");
    }

    return (
        <button className="text-[#363841] font-bold text-[24px] p-[1%]" onClick={handleLogout}>
            Lougout
        </button>
    )
}

export default LogoutButton;