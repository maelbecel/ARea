// --- Librairies import --- //
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// --- Components import --- //
import LogoApplet from "./Logo";
import SwitchNotifyMe from "../../switch/switchNotifyMe";
import MoreDetailsButton from "./MoreDetails";
import ToggleSwitch from "../../switch/toggleSwitch";
import ModalError from "../../Modal/modalErrorNotif";

// --- API import --- //
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { DeleteAppletWithID } from "../../../utils/api/applet/applet";
import Button from "../../Button/Button";

// --- Interfaces --- //
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

interface ServiceInfoContainerProps {
    id: number;
    name: string;
    color: string;
    theme: string;
    actionSlug: string;
    reactions: ReactionProps[];
    user: string;
    actionTrigger?: string;
    lastTriggerDate?: number; // date
    createdAt?: number; // date
    enabled: boolean;
    notifUser: boolean;
}

const EditContainer = ({ color, theme, actionSlug, name, id, user, reactions } : { color: string, theme: string, actionSlug: string, name: string, id: number, user: string, reactions: ReactionProps[] }) => {
    // --- Router --- //
    const router = useRouter();

    return (
        <>
            <div style={{
                    backgroundColor: `${color}`,
                    color: theme === "light" ? "#363841" : "#ffffff"
                }}
                className="w-full flex flex-row justify-around sm:justify-between font-bold text-[18px] sm:text-[24px] p-[2%]"
            >
                <Button text={"Back"}
                        backgroundColor={theme === "light" ? "#363841" : "#ffffff"}
                        textColor={theme === "light" ? "#ffffff" : color}
                        callBack={() => router.back()}
                        size={false}
                        half={1}
                />
                <Button text={"Edit Applet"}
                        backgroundColor={theme === "light" ? "#363841" : "#ffffff"}
                        textColor={theme === "light" ? "#ffffff" : color}
                        callBack={() => router.push(`/myApplets/applet/modifyApplet/${id}`)}
                        size={false}
                        half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 2 : 1}
                />
            </div>
            <div className={`w-full flex justify-center flex-col`}
                style={{
                    backgroundColor: `${color}`,
                    color: theme === "light" ? "#363841" : "#ffffff"
                }}
            >
                <div style={{backgroundColor: `${color}` }} className="px-[15%] lg:px-[35%]">
                    <div className="cursor-pointer">
                        <div className="flex flex-wrap space-x-[3%]">
                            {actionSlug && <LogoApplet slug={actionSlug.split('.')[0]} width={56} height={56} toogleBackground={false}/>}
                            {reactions && Array.isArray(reactions) && reactions.map((reaction: ReactionProps, index: number) => {
                                return (
                                    <LogoApplet key={index} slug={reaction.reactionSlug.split('.')[0]} width={56} height={56} toogleBackground={false} />
                                );
                            })}
                        </div>
                        <div className="font-bold text-[37px] pb-[10%] overflow-hidden break-words">
                            {name}
                        </div>
                        <Link href={`/myApplets/applet/modifyTitle/${id}`}>
                            <div className="font-bold text-[20px] flex justify-end underline">
                                Edit title
                            </div>
                        </Link>
                        <div className="text-[20px] flex flex-row justify-start pb-[20%]">
                            <div><span>by </span><span className="font-bold">{user}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

const InfoContainer = ({ enabled, createdAt, lastTriggerDate, id, reactions, actionSlug, notifUser } : { enabled: boolean, createdAt: number, lastTriggerDate: number, id: number, reactions: ReactionProps[], actionSlug: string, notifUser: boolean }) => {
    // --- Variables --- //
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [LastUseDate, setLastUseDate] = useState<string>("");
    const [modalErrorIsOpen, setIsErrorOpen] = useState(false);

    // --- Providers --- //
    const { token } = useToken();

    // --- router --- //
    const router = useRouter();

    // --- UseEffect --- //
    useEffect(() => {    
        if (createdAt != 0) {
            const createdAtDate        = new Date(createdAt * 1000);
            const lastUpdateDate       = new Date(lastTriggerDate * 1000);

            const formattedDate        = createdAtDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });
            const formattedLastUseDate = lastUpdateDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' });

            setLastUseDate(formattedLastUseDate);
            setFormattedDate(formattedDate);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Function --- //
    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    return (
        <>
            <div className="flex flex-col items-center my-[5%]">
                <ToggleSwitch isCheked={enabled} isDisable={false} yesLabel="Enabled" noLabel="Disabled" bgColor="#363841" id={id?.toString()}/>
            </div>
            <div className="flex flex-col flex-start px-[10%] lg:px-[35%] mb-[5%]">
                <div className="text-[#B8B9BB] font-bold">
                    <MoreDetailsButton isToggle={false} actionSlug={actionSlug} reactions={reactions}/>
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
                        <SwitchNotifyMe isCheked={notifUser} isDisable={false} id={id?.toString()}/>
                    </div>
                </div>
                <div className="text-[#FF0000] font-bold text-[22px] my-[1%] cursor-pointer"
                    onClick={async () => {
                        const status = await DeleteAppletWithID(token, id.toString());

                        if (status === true)
                            router.push("/myApplets");
                        else
                            openModalError();
                    }}
                >
                    Delete Applet
                </div>
                <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
            </div>
        </>
    );
};

// --- Main Component --- //
const AppletInfoContainer = ({id, name, color, theme, actionSlug, reactions, user, enabled, createdAt = 0, lastTriggerDate = 0, notifUser} : ServiceInfoContainerProps) => {
    return (
        <div className="w-full flex flex-col justify-center">
            <EditContainer color={color} theme={theme} actionSlug={actionSlug} name={name} id={id} user={user} reactions={reactions} />
            <InfoContainer enabled={enabled} createdAt={createdAt} lastTriggerDate={lastTriggerDate} id={id} notifUser={notifUser} reactions={reactions} actionSlug={actionSlug} />
        </div>
    )
}

export default AppletInfoContainer;
