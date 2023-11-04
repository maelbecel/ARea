// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Footer --- //
import Footer from "../../components/Footer/Footer";

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [connected  , setConnected] = useState<boolean>(false);

    // --- Providers --- //
    const { token, setToken } = useToken();
    const { user , setUser  } = useUser();

    // --- useEffect --- //

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);

        if (token)
            setConnected(true);
        else
            setConnected(false);
    }, [setToken, token]);

    useEffect(() => {
        if (connected === false)
            return;

        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }

        if (user?.email === "" || user?.email === null)
            getProfile(token);
    }, [connected, setUser, token, user]);

    return (
        <>
            {/* --- NavBar --- */}
            {connected ? (
                <NavBar>
                    <LeftSection>
                        <Icon />
                    </LeftSection>
                    <RightSection>
                        <SimpleLink     href="/myApplets" text="My applets" />
                        <NavigateButton href="/create"    text="Create"     />
                        <Profile email={user?.email} />
                    </RightSection>
                </NavBar>
            ) : (
                <NavBar>
                    <LeftSection>
                        <Icon />
                    </LeftSection>
                    <RightSection>
                        <SimpleLink     href="/sign-up" text="Sign up" />
                        <NavigateButton href="/login"   text="Login"   />
                    </RightSection>
                </NavBar>
            )}
    
            {/* --- Body --- */}
            <div className="h-screen">
                <div className="flex flex-col w-3/5 mx-auto justify-center text-[24px] sm:text-[48px] text-[#363841] font-bold h-[100%]">
                    <div className="text-center">Hope you are enjoying this website, this is an Epitech student project</div>
                    <div className="text-center">Thanks to Zertus we can host our Api to make the website working as expected</div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default IndexPage;
