// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";

// --- Components import --- //
import { GetProfile } from "../../utils/api/user/me";
import Icon from "../../components/NavBar/components/Icon";
import Profile from "../../components/NavBar/components/Profile";
import FormProfile from "../../components/Form/Profile/FormProfile";
import LogoutButton from "../../components/Button/LogoutButton";
import DeleteButton from "../../components/Button/DeleteButton";
import UpdateButton from "../../components/Button/UpdateButton";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import { UserProfile } from "../../utils/api/user/interface/interface";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { NavigateButton } from "../../components/NavBar/components/Button";
import LinkedAccounts from "../../components/ProfilePage/LinkedAccounts";
import ProfilePicture from "../../components/ProfilePage/ProfilePicture";
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import router from "next/router";

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [username, setUsername] = useState<string>("");
    const [email   , setEmail]    = useState<string>("");

    // --- Providers --- //
    const { user , setUser  } = useUser();
    const { token, setToken } = useToken();

    // --- UseEffect --- //

    /**
     * Get the user profile
     */
    useEffect(() => {
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile)
        }

        if (user?.email === undefined || user?.email === "" || user?.email === null)
            getProfile(token);
    }, [setUser, token, user]);

    useEffect(() => {
        setUsername(user?.username as string);
        setEmail(user?.email as string);
    }, [user]);

    useEffect(() => {
        if (token === null)
            router.push("/")
    }, [token, router]);

    return (
        <>
            {/* --- NavBar --- */}
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
    
            {/* --- Body --- */}
            <div className="min-h-screen flex flex-col items-center">
                {/* --- Profile --- */}
                <div className="w-[75%] lg:w-[30%]">
                    {/* --- Profile Picture --- */}
                    <div className="my-[32px]">
                        <ProfilePicture/>
                    </div>
                        
                    {/* --- Form --- */}
                    {user &&
                        <FormProfile
                            username={username}
                            mail={email}
                            password={"a".repeat(user?.passwordLength)}
                            loginWithService={user?.loginWithService}
                            setUsernameFunction={setUsername}
                            setMailFunction={setEmail}
                        />
                    }
                    <UpdateButton username={username} email={email} token={token} setToken={setToken}/>
    
                    {/* --- Linked Accounts --- */}
                    <LinkedAccounts />
                </div>
    
                {/* --- Logout & Delete --- */}
                <LogoutButton/>
                <DeleteButton token={token}/>
            </div>
        </>
    );
}

export default IndexPage;
