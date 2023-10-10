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
    const [newName, setNewName] = useState<string>(name);

    // get background color of the action slug
    useEffect(() => {
        const token = localStorage.getItem("token");
        const dataFetch = async (slug : string) => {
            try {
                const data = await (
                    await fetch(`https://area51.zertus.fr/service/${slug}`, {
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

        if (name.length > 50) {
            setNewName(name.slice(0, 50) + "...");
            console.log("name -> ", newName);
        }

    }, []);

    useEffect(() => {
        console.log(bgColor);
    }, [bgColor]);

    return (
        <div style={{backgroundColor: bgColor}} className="rounded-[9px] p-[20px] h-[100%] flex flex-col justify-between">
            <Link href={`/myApplets/applet/${id}`} style={{ cursor: 'pointer', backgroundColor: bgColor }}>
                <div className="cursor-pointer">
                    <div className="flex flex-wrap">
                        {actionSlug && <LogoApplet slug={actionSlug} width={56} height={56} toogleBackground={false}/>}
                        {reactionSlug && <LogoApplet slug={reactionSlug} width={56} height={56} toogleBackground={false}/>}
                    </div>
                    <div className="font-bold text-white text-[28px] pb-[40%] w-full overflow-hidden break-words">
                        <div>
                           {newName}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex justify-end font-bold text-white text-[18px]">
                <Switch isCheked={enabled} isDisable={true}/>
            </div>
        </div>
    );
};

const SearchApplet = () => {
    const [applets, setApplets] = useState<AppletProps[]>([]);
    const [searchApplets, setSearchApplets] = useState<AppletProps[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch(`https://area51.zertus.fr/applet/me`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                setApplets(data?.data);
                setSearchApplets(data?.data);
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

    const findObjectsBySlug = (array: any[], name: string) => {
        return array.filter(item => item?.name.toLowerCase().includes(name.toLowerCase()));
    };

    const handleChange = (event: any) => {
        const newValue = event.target.value;

        setSearchValue(newValue);
        setSearchApplets(findObjectsBySlug(applets, newValue));
    };

    return (
        <div className="flex flex-col justify-center items-center">

            {/* Search bar */}
            <div className="w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] flex mb-[5rem]">
                <div className="m-[10px]">
                    <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
                </div>
                <input value={searchValue}
                        placeholder="Search services"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[10px]"
                />
            </div>
            <div className="w-[75%] grid grid-cols-3 gap-8 h-auto">
                {searchApplets && searchApplets.map((applet) => {
                    return (
                        <div key={applet.id}>
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
  