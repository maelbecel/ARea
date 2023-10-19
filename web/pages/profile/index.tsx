// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";

// --- Components import --- //
import { GetProfile } from "../../utils/api/user/me";
import Icon from "../../components/NavBar/components/Icon";
import Profile from "../../components/NavBar/components/Profile";
import FormProfile from "../../components/formProfile/formProfile";
import LogoutButton from "../../components/formProfile/logoutButton";
import DeleteButton from "../../components/formProfile/deleteButton";
import UpdateButton from "../../components/updateButton/updateButton";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import { UserProfile } from "../../utils/api/user/interface/interface";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { NavigateButton } from "../../components/NavBar/components/Button";
import LinkedAccounts from "../../components/linkedAccounts/linkedAccounts";
import ProfilePicture from "../../components/profilePicture/profilePicture";
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";

const IndexPage: NextPage = () => {
    const { user, setUser } = useUser();
    const { token, setToken } = useToken();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    /**
     * Get the user profile
     */
    useEffect(() => {
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile)
        }

        if (user?.email === undefined || user?.email === "" || user?.email === null) {
            getProfile(token);
        }
    }, [setUser, token, user]);

    useEffect(() => {
        setUsername(user?.username as string);
        setEmail(user?.email as string);
    }, [user]);

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
                <div className="w-[75%] lg:w-[30%]">
                    <div className="my-[32px]">
                        <ProfilePicture/>
                    </div>
                    { user && <FormProfile
                        username={username}
                        mail={email}
                        password={"a".repeat(user?.passwordLength)}
                        setUsernameFunction={setUsername}
                        setMailFunction={setEmail}
                    /> }
                    <UpdateButton username={username} email={email} token={token}/>
                    <LinkedAccounts linkedAccountsDataArray={user?.connectedServices}/>
                </div>
                <LogoutButton/>
                <DeleteButton token={token}/>
            </div>
        </>
    )
}

export default IndexPage;
