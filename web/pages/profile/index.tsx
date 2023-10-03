// --- Librairies import --- //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

// --- Components import --- //
import LinkedAccounts from "../../components/linkedAccounts/linkedAccounts";
import ProfilePicture from "../../components/profilePicture/profilePicture";
import FormProfile from "../../components/formProfile/formProfile";
import UpdateButton from "../../components/updateButton/updateButton";

const IndexPage: NextPage = () => {
    const [data, setData] = useState<any | undefined>();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
        const dataFetch = async () => {
            try {
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
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, []);

    /*
        // TODO:
        <NavBar>
            <SimpleLink   href="/myApplets" text="My applets" />
            <NavBarButton href="/create"             text="Create" />
            <Profile />
        </NavBar>
    */

    return (
        <>
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-[30%]">
                    <div className="my-[32px]">
                        <ProfilePicture/>
                    </div>
                    { data && <FormProfile username={data?.data?.username} mail={data?.data?.email} password="aaaaaaa"/> }
                    <UpdateButton/>
                    <LinkedAccounts linkedAccountsDataArray={data?.data?.connectedServices}/>
                </div>
            </div>
        </>
    )
}

export default IndexPage;
