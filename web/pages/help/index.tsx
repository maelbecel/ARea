// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Image from 'next/image';

// --- Components import --- //
import { GetProfile } from "../../utils/api/user/me";
import Icon from "../../components/NavBar/components/Icon";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { UserProfile } from "../../utils/api/user/interface/interface";
import { NavigateButton } from "../../components/NavBar/components/Button";
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import Profile from "../../components/NavBar/components/Profile";
import Footer from "../../components/Footer/Footer";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";

const Title = ({ title } : { title: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] sm:text-[40px] text-[30px] font-bold text-[#363841] flex flex-col items-center sm:items-start">
            {title}
        </div>
    );
};

const SubTitle = ({ title } : { title: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] sm:text-[32px] text-[24px] font-bold text-[#363841] flex flex-col items-center sm:items-start text-center sm:text-left">
            {title}
        </div>
    );
};

const Description = ({ description } : { description: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] text-[20px] sm:text-[30px] font-medium text-[#363841] flex flex-col items-center sm:items-start">
            {description}
        </div>
    );
};

const SpanDescription = ({ description } : { description: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] text-[20px] sm:text-[30px] font-bold text-[#363841] flex flex-col items-center sm:items-start text-center sm:text-left">
            {description}
        </div>
    );
};

const ImageContainer = ({ src } : { src: string }) => {
    return (
        <div className="flex justify-center p-[5%] w-auto h-[50%]">
            <Image src={src} alt="Service" width={500} height={500}/>
        </div>
    );
};

const IndexPage: NextPage = () => {
    // --- States --- //
    const [connected, setConnected] = useState<boolean>(false);

    const { token, setToken } = useToken();
    const { user, setUser } = useUser();

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
    }, [setUser, token, user, connected]);

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
                    <NavigateButton href="/create"    text="Create" />
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
                    <NavigateButton href="/login"   text="Login" />
                </RightSection>
                </NavBar>
            )}
    
            {/* --- Body --- */}
            <div className="min-h-screen flex flex-col w-3/5 mx-auto justify-start py-[2%]">
                <Title title={"Words to know"} />
                <Description description={`We use some words that you may not be familiar with yet, so here’s a quick run down to get you started.`} />
                <SubTitle title={"Applets"} />
                <Description description={`Applets are automations that connect two or more services to create a new experience. For example, an Applet can turn up your heat if the weather drops below a certain temperature.`} />
                <SubTitle title={"Triggers, actions and queries"} />
                <Description description={`These are the building blocks of an Applet, each one plays an important role in the automation. Each service has unique triggers, queries, and actions that allow you to build different Applets`} />
                <SubTitle title={"Ingredients (placeholders)"} />
                <Description description={`Ingredients are part of the triggers and actions, little individual pieces of information. A user will take these ingredients and use them to fill in fields.`} />
                <Title title={"Creating an Applet"} />
                <SpanDescription description="Making your own Applet is simple. Start with the trigger, which is the If This part of the Applet." />
                <Description description={`“Action”… occurs your Applet will begin. You may need to connect your account from the chosen service to authenticate it, which means that Area51 will be able to know when the trigger occurs.`} />
                <ImageContainer src={"/Images/image7.svg"} />
                <SpanDescription description="Next, select your action, the “Then That” portion of your Applet, which will happen when the Applet is triggered." />
                <ImageContainer src={"/Images/image8.svg"} />
                <SpanDescription description={"To complete the Applet, select Continue, modify the name of the Applet (optional), and select Finish."} />
                <ImageContainer src={"/Images/image9.svg"} />
            </div>
    
            {/* --- Footer --- */}
            <Footer/>
        </>
    );
};

export default IndexPage;
