// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// --- Components import --- //
import NavBar, {RightSection, LeftSection} from "../../components/NavBar/navbar";
import Icon from "../../components/NavBar/components/Icon";
import SearchApplet from "../../components/Applet/Components/SearchApplet";
import Footer from '../../components/Footer/Footer'
import Profile from "../../components/NavBar/components/Profile";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";
import { UserProfile } from "../../utils/api/user/interface/interface";
import { NavigateButton } from "../../components/NavBar/components/Button";

const IndexPage: NextPage = () => {

    const [token, setToken] = useState<string>('');
    const [connected  , setConnected] = useState<boolean>(false);
    const { user, setUser } = useUser();

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);
        if (token) {
            setConnected(true);
            console.log("token -> ", token);
        } else
            // set router to login page
            setConnected(false);
    }, [token]);

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
                <NavigateButton href="/create"             text="Create" />
                <Profile email={user?.email} />
            </RightSection>
            </NavBar>
            <div className="w-full min-h-screen bg-background">
                <div className="flex items-center mt-[2em]">
                    <div className="w-full flex justify-center items-center">
                        <h1 className="text-center font-extrabold text-[#363841] text-[2.6rem] mb-[1em] w-full">
                            Explore your applets
                        </h1>
                    </div>
                </div>
                <SearchApplet />
            </div>
            <Footer/>
        </>
    )
}

export default IndexPage;
