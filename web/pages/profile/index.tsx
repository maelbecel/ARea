// --- Librairies import --- //
import type { NextPage } from "next";
import ProfilePicture from "../../components/profilePicture/profilePicture";
import NavBar, { NavBarButton, SimpleLink, Profile } from '../../components/navbar'
import FormProfile from "../../components/formProfile/formProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import LinkedAccounts from "../../components/linkedAccounts/linkedAccounts";

const IndexPage: NextPage = () => {
    const [data, setData] = useState();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }

        const dataFetch = async () => {
            const data = await (
                await fetch("http://zertus.fr:8001/user/me", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
            ).json();
            setData(data);
        };
        dataFetch();
    }, []);

    return (
        <>
            <NavBar>
                <SimpleLink   href="/profile/my-applets" text="My applets" />
                <NavBarButton href="/create"             text="Create" />
                <Profile />
            </NavBar>
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-[30%]">
                    <div className="my-[32px]">
                        <ProfilePicture/>
                    </div>
                    { data && <FormProfile username={data?.data?.username} mail={data?.data?.email} password="aaaaaaa"/> }
                    <LinkedAccounts/>
                </div>
            </div>
        </>
    )
}

export default IndexPage;
