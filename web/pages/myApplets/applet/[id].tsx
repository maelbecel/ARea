// --- Librairies import --- //
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

// --- API --- //
import { useServices } from "../../../utils/api/service/Providers/ServiceProvider";
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../../utils/api/user/Providers/UserProvider";
import { GetAppletWithID } from "../../../utils/api/applet/applet";
import { GetServices } from "../../../utils/api/service/service";
import { GetProfile } from "../../../utils/api/user/me";
import { getTheme } from "../../../utils/getTheme";

// --- Interface --- //
import { UserProfile } from "../../../utils/api/user/interface/interface";
import { Service } from "../../../utils/api/service/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../../components/NavBar/navbar";
import { NavigateButton } from "../../../components/NavBar/components/Button";
import SimpleLink from "../../../components/NavBar/components/SimpleLink";
import Icon from "../../../components/NavBar/components/Icon";
    // --- Body --- //
import AppletInfoContainer from "../../../components/Applet/Components/AppletInfoContainer";
import Profile from "../../../components/NavBar/components/Profile";
    // --- Footer --- //
import Footer from "../../../components/Footer/Footer";

interface ReactionDataProps {
    name: string;
    label: string;
    value: string;
    description: string;
}

interface ReactionProps {
    reactionSlug: string;
    reactionData: ReactionDataProps[];
}

interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactions: ReactionProps[];
    actionTrigger: string;
    lastTriggerDate: number;
    createdAt: number;
    enabled: boolean;
    user : {
        username: string;
    }
    notifUser: boolean;
}

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [dataApplet, setDataApplet] = useState<AppletProps | undefined>();
    const [bgColor   , setBgColor]    = useState<string>('');
    const [theme     , setTheme]      = useState<string>('');

    // --- Router --- //
    const router = useRouter();

    const { id } = router.query;

    // --- Providers --- //
    const { services, setServices } = useServices();
    const { token   , setToken    } = useToken();
    const { user    , setUser     } = useUser();

    // --- useEffect --- //

    /**
     * Get the user profile
     */
    useEffect(() => {
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }

        if (user?.email === "" || user?.email === null)
            getProfile(token);
    }, [setUser, token, user]);

    useEffect(() => {
        if (id == undefined)
            return;

        if (token === "") {
            const tokenStore = localStorage.getItem("token");

            if (tokenStore === null) {
                router.push("/");
                return;
            }
            setToken(tokenStore);
        }

        const dataFetch = async () => {
            setDataApplet(await GetAppletWithID(token, id as string));
        };

        dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, token]);

    useEffect(() => {
        if (dataApplet === undefined || dataApplet === null || bgColor !== '')
            return;

        if (services.length === 0) {
            if (token === "") {
                const tokenStore = localStorage.getItem("token");
    
                if (tokenStore === null) {
                    router.push("/");
                    return;
                }
                setToken(tokenStore);
            }
            getServices(token);
        }

        const Service: Service | undefined = services.find((Service: Service) => Service?.slug === dataApplet?.actionSlug.split('.')[0]);

        setBgColor(Service?.decoration?.backgroundColor ?? '#ffffff');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataApplet]);

    useEffect(() => {
        if (bgColor === '')
            return;
        setTheme(getTheme(bgColor));
    }, [bgColor]);

    // --- Functions --- //

    const getServices = async (token: string) => {
        setServices(await GetServices(token));
    };

    return (
        <div>
            {/* --- NavBar --- */}
            {dataApplet &&
                <NavBar color={bgColor.substring(1)}>
                    <LeftSection>
                        <Icon theme={theme} />
                    </LeftSection>
                    <RightSection color={bgColor.substring(1)} theme={theme}>
                        <SimpleLink     href="/myApplets" text="My applets" theme={theme} />
                        <NavigateButton href="/create"    text="Create"     theme={theme} />
                        <Profile email={user?.email} theme={theme} />
                    </RightSection>
                </NavBar>
            }
    
            {/* --- Body --- */}
            <div className={`min-h-screen`}>
                {dataApplet && 
                    <AppletInfoContainer
                        id={dataApplet?.id}
                        name={dataApplet?.name}
                        color={bgColor}
                        theme={theme}
                        actionSlug={dataApplet?.actionSlug}
                        reactions={dataApplet?.reactions}
                        user={dataApplet?.user?.username}
                        enabled={dataApplet?.enabled}
                        createdAt={dataApplet?.createdAt}
                        notifUser={dataApplet?.notifUser}
                    />
                }
            </div>
    
            {/* --- Footer --- */}
            <Footer />
        </div>
    );
}

export default IndexPage;