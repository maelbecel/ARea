// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// --- Components import --- //
import { GetProfile } from "../../utils/api/user/me";
import Icon from "../../components/NavBar/components/Icon";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { UserProfile } from "../../utils/api/user/interface/interface";
import { NavigateButton } from "../../components/NavBar/components/Button";
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import Profile from "../../components/NavBar/components/Profile";
import Footer from "../../components/footer";
import SimpleLink from "../../components/NavBar/components/SimpleLink";


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
            {connected ? (
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
            ) : (
                <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink   href="/sign-up" text="Sign up" />
                    <NavigateButton href="/login"   text="Login" />
                </RightSection>
                </NavBar>
            )}
            <div className="min-h-screen flex flex-col w-3/5 mx-auto justify-start py-[2%]">
                <div className="pb-[15%] sm:pb-[2%] text-[48px] font-bold text-[#363841] flex flex-col items-center sm:items-start">
                    <div>Contact</div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
                    <div className="text-[#00B2FF] font-bold text-[28px]">
                        lucas.dupont@epitech.eu
                    </div>
                    <div className="text-[#363841] font-medium text-[28px]">
                        Backend developer, server
                    </div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
                    <div className="text-[#00B2FF] font-bold text-[28px]">
                        mael.becel@epitech.eu
                    </div>
                    <div className="text-[#363841] font-medium text-[28px]">
                        SCRUM Master, mobile
                    </div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
                    <div className="text-[#00B2FF] font-bold text-[28px]">
                        enzo.garnier@epitech.eu
                    </div>
                    <div className="text-[#363841] font-medium text-[28px]">
                        Frontend developer, mobile
                    </div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
                    <div className="text-[#00B2FF] font-bold text-[28px]">
                        jovan.hillion@epitech.eu
                    </div>
                    <div className="text-[#363841] font-medium text-[28px]">
                        Frontend developer, web
                    </div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
                    <div className="text-[#00B2FF] font-bold text-[28px]">
                        ethan.hernou@epitech.eu
                    </div>
                    <div className="text-[#363841] font-medium text-[28px]">
                        Frontend developer, web
                    </div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] text-[48px] font-bold text-[#363841] flex flex-col items-center sm:items-start">
                    <div>Project</div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
                    <div className="text-[#00B2FF] font-bold text-[28px]">
                        Github of the project
                    </div>
                    <div className="text-[#363841] font-medium text-[28px]">
                        You can find the github of the project here
                    </div>
                </div>
                <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
                    <div className="text-[#00B2FF] font-bold text-[28px]">
                        Help
                    </div>
                    <div className="text-[#363841] font-medium text-[28px]">
                        Explore help articles about many IFTTT topics and file support tickets.
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndexPage;
