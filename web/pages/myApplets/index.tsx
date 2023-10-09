// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// --- Components import --- //
import NavBar, {RightSection, LeftSection, SimpleLink, Icon, NavBarNavigateButton, Profile} from "../../components/navbar";
import SearchApplet from "../../components/applet/searchApplet";
import Footer from '../../components/footer'

const IndexPage: NextPage = () => {

    const [token, setToken] = useState<string>('');
    const [connected  , setConnected] = useState<boolean>(false);

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);
        if (token) {
            setConnected(true);
            console.log("token -> ", token);
        } else
            // set router to login page
            setConnected(false);
    }, [token]);

    return (
        <>
            <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <NavBarNavigateButton href="/create"             text="Create" />
                <Profile />
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
