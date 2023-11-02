// --- Librairies import --- //
import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { getTheme } from "../../../utils/getTheme";

// --- Components import --- //
import AppletInfoContainer from "../../../components/applet/appletInfoContainer";
import Footer from "../../../components/footer";
import NavBar, { LeftSection, RightSection } from "../../../components/NavBar/navbar";
import Icon from "../../../components/NavBar/components/Icon";
import SimpleLink from "../../../components/NavBar/components/SimpleLink";
import Profile from "../../../components/NavBar/components/Profile";
import { useUser } from "../../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../../utils/api/user/me";
import { UserProfile } from "../../../utils/api/user/interface/interface";
import { NavigateButton } from "../../../components/NavBar/components/Button";
import { useServices } from "../../../utils/api/service/Providers/ServiceProvider";
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { GetServices } from "../../../utils/api/service/service";
import { Service } from "../../../utils/api/service/interface/interface";
import { GetAppletWithID } from "../../../utils/api/applet/applet";

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
    const [bgColor, setBgColor] = useState<string>('');
    const [dataApplet, setDataApplet] = useState<AppletProps | undefined>();
    const router = useRouter();
    const [theme, setTheme] = useState<string>('');
    const { id } = router.query;
    const { user, setUser } = useUser();

    const { services, setServices } = useServices();
    const { token, setToken } = useToken();

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

    const getServices = async (token: string) => {
        setServices(await GetServices(token));
    };

    useEffect(() => {
        if (dataApplet === undefined || bgColor !== '')
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

    return (
        <div>
            {dataApplet &&
                <NavBar color={bgColor.substring(1)}>
                    <LeftSection>
                        <Icon theme={theme} />
                    </LeftSection>
                    <RightSection color={bgColor.substring(1)} theme={theme}>
                        <SimpleLink href="/myApplets" text="My applets" theme={theme} />
                        <NavigateButton href="/create" text="Create" theme={theme} />
                        <Profile email={user?.email} theme={theme} />
                    </RightSection>
                </NavBar>
            }
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
            <Footer />
        </div>
    )
}

export default IndexPage;