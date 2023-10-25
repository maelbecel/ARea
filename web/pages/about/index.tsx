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
import { Button } from "../../components/service/CreateService";


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
                <div className="text-[48px] font-bold text-[#363841] flex justify-center text-center pb-[10%]">
                    <div>Area51 helps all your apps and devices work better together</div>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-4 w-[100%]">
                        <div className="flex flex-col justify-start p-[5%]">
                            <div className="flex flex-col">
                                <div className="text-[18px] font-bold text-[#363841] pb-[10%]">
                                    what are
                                </div>
                                <div className="text-[28px] font-bold text-[#363841] pb-[10%]">
                                    Applets?
                                </div>
                                <div className="text-[24px] font-bold text-[#363841] pb-[10%]">
                                    Applets bring your services together to create remarkable, new experiences.
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start p-[5%] w-auto h-[50%]">
                            <img src="/Images/applet.svg" alt="applet"/>
                        </div>
                        <div className="flex flex-col justify-start p-[5%]">
                            <div className="text-[18px] font-bold text-[#363841] pb-[10%]">
                                what are
                            </div>
                            <div className="text-[28px] font-bold text-[#363841] pb-[10%]">
                                Services?
                            </div>
                            <div className="text-[24px] font-bold text-[#363841] pb-[10%]">
                                Services are the apps and devices you use every day. There are countless useful ways to connect services with Applets.
                            </div>
                        </div>
                        <div className="flex justify-center p-[5%] w-auto h-[50%]">
                            <img src="/Images/service.svg" alt="service"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button href="/create" text="Create your first applet"/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default IndexPage;
