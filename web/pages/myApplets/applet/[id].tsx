// --- Librairies import --- //
import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { getTheme } from "../../../utils/getTheme";

// --- Components import --- //
import AppletInfoContainer from "../../../components/applet/appletInfoContainer";
import Footer from "../../../components/footer";
import NavBar, {
    LeftSection,
    RightSection,
    Icon,
    SimpleLink,
    NavBarNavigateButton,
    Profile
} from "../../../components/navbar";

interface AppletProps {
    data : {
        id: number;
        name: string;
        actionSlug: string;
        reactionSlug: string;
        actionTrigger: string;
        lastTriggerDate: number;
        createdAt: number;
        enabled: boolean;
        user : {
            username: string;
        }
    }
}

const IndexPage: NextPage = () => {
    const [bgColor, setBgColor] = useState<string>('');
    const [dataApplet, setDataApplet] = useState<AppletProps | undefined>();
    const router = useRouter();
    const { id } = router.query;
    const [theme, setTheme] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (id == undefined) {
            console.log("something went wrong");
            return;
        }
        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch(`http://zertus.fr:8001/applet/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                console.log("Applets : ", data?.data);
                setDataApplet(data);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, [id]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (dataApplet) {
            const dataFetch = async (slug : string) => {
                try {
                    const dataFetched = await (
                        await fetch(`http://zertus.fr:8001/service/${slug}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            }
                        })
                    ).json();
                    setBgColor(dataFetched?.data?.decoration?.backgroundColor);
                } catch (error) {
                    console.log(error);
                }
            };
            console.log("test enable " + dataApplet?.data?.enabled);
            dataFetch(dataApplet?.data?.actionSlug.split('.')[0]);
        }
    }, [dataApplet]);

    useEffect(() => {
        if (bgColor === undefined)
            return;
        setTheme(getTheme(bgColor));
    }, [bgColor]);

    return (
        <div>
            {dataApplet && <NavBar color={bgColor.substring(1)}>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink   href="/myApplets" text="My applets" />
                <NavBarNavigateButton href="/create"             text="Create" />
                <Profile />
            </RightSection>
            </NavBar>
            }
            <div className={`min-h-screen`}>
                {dataApplet && 
                    <AppletInfoContainer
                        name={dataApplet?.data?.name}
                        color={bgColor}
                        theme={theme}
                        actionSlug={dataApplet?.data?.actionSlug.split('.')[0]}
                        reactionSlug={dataApplet?.data?.reactionSlug.split('.')[0]}
                        user={dataApplet?.data?.user?.username}
                        enabled={dataApplet?.data?.enabled}
                        createdAt={dataApplet?.data?.createdAt}
                    />
                }
            </div>
            <Footer />
        </div>
    )
}

export default IndexPage;