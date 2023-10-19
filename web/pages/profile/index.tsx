// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";

// --- Components import --- //
import LinkedAccounts from "../../components/linkedAccounts/linkedAccounts";
import ProfilePicture from "../../components/profilePicture/profilePicture";
import FormProfile from "../../components/formProfile/formProfile";
import UpdateButton from "../../components/updateButton/updateButton";
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import Icon from "../../components/NavBar/components/Icon";
import Profile from "../../components/NavBar/components/Profile";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";
import { UserProfile } from "../../utils/api/user/interface/interface";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";

const IndexPage: NextPage = () => {
    const { user, setUser } = useUser();
    const { token, setToken } = useToken();

    /**
     * Get the user profile
     */
    useEffect(() => {
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }

        if (user?.email === "" || user?.email === null)
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
                    { user && <FormProfile username={user?.username} mail={user?.email} password={"a".repeat(user?.passwordLength)}/> }
                    <UpdateButton/>
                    <LinkedAccounts linkedAccountsDataArray={user?.connectedServices}/>
                </div>
            </div>
        </>
    )
}

export default IndexPage;
