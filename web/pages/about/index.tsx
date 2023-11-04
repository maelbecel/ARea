// --- Librairies import --- //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Image from 'next/image';

// --- API --- //
import { useToken } from '../../utils/api/user/Providers/TokenProvider';
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
    // --- Body --- //
import Button from "../../components/Button/Button";
    // --- Footer --- //
import Footer from "../../components/Footer/Footer";

const Container = ({ title, subtitle, description, url, alt } : { title: string, subtitle: string, description: string, url: string, alt: string }) => {
    return (
        <>
            <div className="flex flex-col justify-start p-[5%] h-[50%]">
                <div className="flex flex-col">
                    <div className="text-[18px] font-bold text-[#363841] pb-[10%]">
                        {subtitle}
                    </div>
                    <div className="text-[28px] font-bold text-[#363841] pb-[10%]">
                        {title}
                    </div>
                    <div className="text-[24px] font-bold text-[#363841] pb-[10%]">
                        {description}
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-[5%] w-auto h-[50%]">
                <Image src={url} alt={alt} width={500} height={500}/>
            </div>
        </>
    );
};

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [connected, setConnected] = useState<boolean>(false);

    // --- Providers --- //
    const { user , setUser  } = useUser();
    const { token, setToken } = useToken();

    // --- Router --- //
    const router = useRouter();

    // --- UseEffect --- //

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);
    
        if (token)
            setConnected(true);
        else
            setConnected(false);
    }, [token, setToken]);

    useEffect(() => {
        if (connected === false)
            return;
    
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }
    
        if (user?.email === "" || user?.email === null)
            getProfile(token);
    }, [token, user, setUser, connected]);

    const handleClick = () => {
        router.push("/help")
    }

    return (
        <>
            {/* --- NavBar --- */}
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
    
            {/* --- Body --- */}
            <div className="min-h-screen flex flex-col w-3/5 mx-auto justify-start py-[2%]">
                {/* Title */}
                <div className="text-[28px] md:text-[48px] font-bold text-[#363841] flex justify-center text-center pb-[10%]">
                    <div>Area51 helps all your apps and devices work better together</div>
                </div>
    
                {/* Container */}
                <div className="flex flex-col justify-center">
                    <div className="flex flex-col md:grid md:grid-cols-4 w-[100%]">
                        <Container title={"Applets"} subtitle={'what are'} description={'Applets bring your services together to create remarkable, new experiences.'}
                                    url={"/Images/applet.svg"} alt={"applet"} 
                        />
                        <Container title={"Services ?"} subtitle={'what are'} description={'Services are the apps and devices you use every day. There are countless useful ways to connect services with Applets.'}
                                    url={"/Images/service.svg"} alt={"Services"}
                        />
                    </div>
                    <div className="flex flex-col items-center py-[10%]">
                        <div className="flex justify-center w-[80%] sm:w-[40%] md:w-[30%] lg:w-[25%]">
                            <Button callBack={handleClick} text="Learn more" backgroundColor="#363841" textColor="#ffffff" size={false}/>
                        </div>
                        <div className="flex flex-wrap gap-x-[1%] justify-center py-[10%] sm:py-[5%]">
                            <div className="text-[18px] font-bold text-[#363841] text-center">
                                You want to use mobile version ? You can download it
                            </div>
                            <a href='apk/app.apk' download={'apk/app.apk'} className="text-[18px] font-bold text-[#00B2FF]">here</a>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* --- Footer --- */}
            <Footer/>
        </>
    );
};

export default IndexPage;
