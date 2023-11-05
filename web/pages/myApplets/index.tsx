// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect } from "react";
import router from "next/router";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, {RightSection, LeftSection} from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Body --- //
import SearchApplet from "../../components/Applet/Components/SearchApplet";
    // --- Footer --- //
import Footer from '../../components/Footer/Footer'

const IndexPage: NextPage = () => {
    const { user , setUser } = useUser();
    const { token } = useToken();

    useEffect(() => {
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }

        if (user?.email === "" || user?.email === null)
            getProfile(token);
    }, [setUser, token, user]);

    useEffect(() => {
        if (token === null)
            router.push("/")
    }, [token]);

    return (
        <>
            {/* --- NavBar --- */}
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <NavigateButton href="/create" text="Create" />
                    <Profile email={user?.email} />
                </RightSection>
            </NavBar>
    
            {/* --- Body --- */}
            <div className="w-full min-h-screen bg-background">
                {/* --- Title --- */}
                <div className="flex items-center mt-[2em]">
                    <div className="w-full flex justify-center items-center">
                        <h1 className="text-center font-extrabold text-[#363841] text-[2.6rem] mb-[1em] w-full">
                            Explore your applets
                        </h1>
                    </div>
                </div>
    
                {/* --- Search --- */}
                <SearchApplet />
            </div>
    
            {/* --- Footer --- */}
            <Footer/>
        </>
    );
}

export default IndexPage;
