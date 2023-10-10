// --- Librairies import --- //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

// --- Components import --- //
import LinkedAccounts from "../../components/linkedAccounts/linkedAccounts";
import ProfilePicture from "../../components/profilePicture/profilePicture";
import FormProfile from "../../components/formProfile/formProfile";
import UpdateButton from "../../components/updateButton/updateButton";
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import Icon from "../../components/NavBar/components/Icon";
import Profile from "../../components/NavBar/components/Profile";
import { useUser } from "../../utils/api/user/UserProvider";
import { GetProfile } from "../../utils/api/user/me";
import { UserProfile } from "../../utils/api/user/interface";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";

const IndexPage: NextPage = () => {
    const [data, setData] = useState<any | undefined>();
    const [token, setToken] = useState<string>('');
    const router = useRouter();
    const { user, setUser } = useUser();

    useEffect(() => {
        const token = localStorage.getItem("token") as string;

        if (!token)
            router.push("/login");

        setToken(token);

        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch("https://area51.zertus.fr/user/me", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                console.log(data);
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, [token, router]);

    useEffect(() => {
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }

        if (user?.email === null || user?.email === "")
            getProfile(token);
    }, [setUser, token, user]);

    return (
        <>
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink   href="/myApplets" text="My applets" />
                    <NavigateButton href="/create"             text="Create" />
                    <Profile email={user?.email} />
                </RightSection>
            </NavBar>
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
