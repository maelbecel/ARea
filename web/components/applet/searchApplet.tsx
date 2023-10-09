// --- Libraries import --- //
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

// --- Components import --- //
import Image from "next/image";
import LogoApplet from "./logo";
import Switch from "./switch";

interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    reactionSlug: string;
    actionTrigger: string;
    lastTriggerUpdate: string; // date
    createdAt: number; // date
    enabled: boolean;
}

interface logo {
    logoUrl: string;
    backgroundColor?: string;
}

interface SwitchProps {
    isCheked: boolean;
    isDisable: boolean;
}

const AppletComponent = ({id, name, actionSlug, reactionSlug , actionTrigger, lastTriggerUpdate, createdAt, enabled }: AppletProps) => {

    const [bgColor, setBgColor] = useState<string>("");

    // get background color of the action slug
    useEffect(() => {
        const token = localStorage.getItem("token");
        const dataFetch = async (slug : string) => {
            try {
                const data = await (
                    await fetch(`http://zertus.fr:8001/service/${slug}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                console.log(data);
                setBgColor(data?.data?.decoration?.backgroundColor);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch(actionSlug);
    }, []);

    useEffect(() => {
        console.log(bgColor);
    }, [bgColor]);

    return (
        <div style={{backgroundColor: bgColor}} className="rounded-[9px] p-[20px]">
            <Link href={`/myApplets/applet/${id}`} style={{ cursor: 'pointer', backgroundColor: bgColor }}>
                <div className="cursor-pointer">
                    <div className="flex flex-wrap">
                        {actionSlug && <LogoApplet slug={actionSlug} width={56} height={56} toogleBackground={false}/>}
                        {reactionSlug && <LogoApplet slug={reactionSlug} width={56} height={56} toogleBackground={false}/>}
                    </div>
                    <div className="font-bold text-white text-[28px] pb-[40%]">
                        {name}
                    </div>
                </div>
            </Link>
            <div className="font-bold text-white text-[18px]">
                <Switch isCheked={enabled} isDisable={true}/>
            </div>
        </div>
    );
};

const SearchApplet = () => {
    const [applets, setApplets] = useState<AppletProps[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch(`http://zertus.fr:8001/applet/me`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                console.log(data);
                setApplets(data?.data);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, []);

    useEffect(() => {
        if (applets) {
            console.log(applets);
        }
    }, [applets]);

    return (
        <div className="flex flex-col justify-center items-center">

            {/* Search bar */}
            <div className="w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] flex mb-[5rem]">
                <div className="m-[10px]">
                    <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
                </div>
                <input value={searchValue}
                        placeholder="Search services"
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[10px]"
                />
            </div>
            <div className="w-[75%] grid grid-cols-3 gap-8 h-auto">
                {applets && applets.map((applet, index) => {
                    return (
                        <div key={index}>
                            <AppletComponent
                                id={applet.id}
                                name={applet.name}
                                reactionSlug={applet.reactionSlug.split('.')[0]}
                                actionSlug={applet.actionSlug.split('.')[0]}
                                actionTrigger={applet.actionTrigger}
                                lastTriggerUpdate={applet.lastTriggerUpdate}
                                createdAt={applet.createdAt}
                                enabled={applet.enabled}
                            /> 
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default SearchApplet;
  