// --- Librairies import --- //
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LogoApplet from "./logo";

import SwitchNotifyMe from "./switchNotifyMe";
import MoreDetailsButton from "./moreDetails";
import ToggleSwitch from "../switch/toggleSwitch";

interface ServiceInfoContainerProps {
    id?: number;
    name: string;
    color: string;
    theme: string;
    actionSlug: string;
    reactionSlug: string;
    user: string;
    actionTrigger?: string;
    lastTriggerDate?: number; // date
    createdAt?: number; // date
    enabled: boolean;
}

const AppletInfoContainer = ({name, color, theme, actionSlug, reactionSlug, user, enabled, createdAt = 0, lastTriggerDate = 0} : ServiceInfoContainerProps) => {

    const [formattedDate, setFormattedDate] = useState<string>("");
    const [LastUseDate, setLastUseDate] = useState<string>("");
    
    useEffect(() => {
        console.log("enabled -> ", enabled);
    
        if (createdAt != 0) {
            const createdAtDate = new Date(createdAt * 1000);
            const lastUpdateDate = new Date(lastTriggerDate * 1000);
            const formattedDate = createdAtDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
            const formattedLastUseDate = lastUpdateDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
            setLastUseDate(formattedLastUseDate);
            setFormattedDate(formattedDate);
        }
    }, []);

    // TODO: add a link to the edit title
    // TODO: add a link to the edit applet
    // TODO: rework front switch
    // TODO: link notif switch to the backend
    // TODO: add link on each logo (need to see on each which page to link)
    return (
        <div className="w-full flex flex-col justify-center">
            <div style={{ backgroundColor: `${color}` }} className="w-full flex flex-row justify-around sm:justify-between font-bold text-[#363841] text-[18px] sm:text-[24px] py-[2%]">
                <Link href="/myApplets/">
                        {/* Add a child element inside the Lipxnk */}
                        <a className="rounded-[25px] bg-white py-[1%] px-[4%] ml-[50px] mt-[2%]">Back</a>
                </Link>
                <Link href="#">
                        {/* Add a child element inside the Link */}
                        <a  className="rounded-[25px] bg-white py-[1%] px-[4%] mr-[50px] mt-[2%]" >Edit Applet</a>
                </Link>
            </div>
            <div className={`w-full flex justify-center flex-col`} style={{ backgroundColor: `${color}` }}>
                <div style={{backgroundColor: `${color}` }} className="px-[15%] lg:px-[35%]">
                    <div className="cursor-pointer">
                        <div className="flex flex-wrap">
                            {actionSlug && <LogoApplet slug={actionSlug} width={56} height={56} toogleBackground={false}/>}
                            {reactionSlug && <LogoApplet slug={reactionSlug} width={56} height={56} toogleBackground={false}/>}
                        </div>
                        <div className="font-bold text-white text-[37px] pb-[10%] overflow-hidden break-words">
                            {name}
                        </div>
                        <Link href="#">
                            <div className="font-bold text-white text-[20px] flex justify-end underline">
                                <div>Edit title</div>
                            </div>
                        </Link>
                        <div className="text-white text-[20px] flex flex-row justify-start pb-[20%]">
                            <div><span>by </span><span className="font-bold">{user}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center my-[5%]">
                <ToggleSwitch isCheked={enabled} isDisable={false} yesLabel="Enabled" noLabel="Disabled" bgColor="#363841"/>
            </div>
            <div className="flex flex-col flex-start px-[10%] lg:px-[35%] mb-[5%]">
                <div className="text-[#B8B9BB] font-bold">
                    <MoreDetailsButton isToggle={false} actionSlug={actionSlug} reactionSlug={reactionSlug}/>
                </div>
                <div className="text-[#363841] font-bold text-[22px] my-[1%]">
                    {formattedDate ? (
                        <div>Created at {formattedDate}</div>
                    ) : (
                        <div>Date of creation not accesible</div>
                    )}
                </div>
                <div className="text-[#363841] font-bold text-[22px] my-[1%]">
                    {LastUseDate ? (
                        <div>Last use {formattedDate}</div>
                    ) : (
                        <div>Never used yet</div>
                    )}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="text-[#363841] font-bold text-[22px] my-[1%]">
                        Notify me
                    </div>
                    <div className="text-[#363841] font-bold text-[22px] my-[1%]">
                        <SwitchNotifyMe isCheked={false} isDisable={false}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppletInfoContainer;