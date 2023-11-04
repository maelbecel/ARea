// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";

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

const Title = ({ title } : { title: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] text-[48px] font-bold text-[#363841] flex flex-col items-center sm:items-start">
            {title}
        </div>
    );
};

const Description = ({ title, description } : { title: string, description: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
            <div className="text-[#00B2FF] font-bold text-[28px] break-all">
                {title}
            </div>
            <div className="text-[#363841] font-medium text-[28px]">
                {description}
            </div>
        </div>
    );
};

const DescriptionWithNavigation = ({ title, description, hyperlink, textOfLink } : { title: string, description: string, hyperlink: string, textOfLink: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
            <div className="text-[#00B2FF] font-bold text-[28px] break-all">
                {title}
            </div>
            <div className="text-[#363841] font-medium text-[28px]">
                {description}
                <Link href={hyperlink}>
                    <a className="text-[#00B2FF]">
                        {textOfLink}
                    </a>
                </Link>
            </div>
        </div>
    );
};

const IndexPage: NextPage = () => {
    // --- States --- //
    const [connected, setConnected] = useState<boolean>(false);

    // --- Providers --- //
    const { token, setToken } = useToken();
    const { user , setUser  } = useUser();

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
            <div className="min-h-screen flex flex-col w-[90%] md:w-3/4 mx-auto justify-start py-[2%] overflow-x-hidden">
                <Title title={"Contact"} />
                <Description title={"lucas.dupont@epitech.eu"}  description={"Backend developer, server"} />
                <Description title={"mael.becel@epitech.eu"}    description={"SCRUM Master, mobile"} />
                <Description title={"enzo.garnier@epitech.eu"}  description={"Frontend developer, mobile"} />
                <Description title={"ethan1.hernou@epitech.eu"} description={"Frontend developer, web"} />
                <Description title={"jovan.hillion@epitech.eu"} description={"Frontend developer, web"} />
    
                <Title title={"Project"} />
                <DescriptionWithNavigation title={"Github of the project"}  description={"You can find the github of the project "} hyperlink={"https://github.com/maelbecel/ARea"} textOfLink={"here"} />
                <Description title={"Help"}  description={"Explore help articles about many AREA51 topics and file support tickets."} />
            </div>
    
            {/* --- Footer --- */}
            <Footer/>
        </>
    );
}

export default IndexPage;
