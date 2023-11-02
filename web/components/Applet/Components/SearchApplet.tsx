// --- Libraries import --- //
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// --- Components import --- //
import LogoApplet from "./Logo";
import Switch from "../../Switch/Switch2";

// --- API --- //
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../../utils/api/service/Providers/ServiceProvider";
import { GetServices } from "../../../utils/api/service/service";
import { GetMyApplets } from "../../../utils/api/applet/me";
import { getTheme } from "../../../utils/getTheme";

// --- Interface --- //
import { Service } from "../../../utils/api/service/interface/interface";

interface ReactionProps {
    reactionSlug: string;
}

interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    actionTrigger: string;
    lastTriggerUpdate: string; // date
    createdAt: number; // date
    enabled: boolean;
    reactions: ReactionProps[];
}

const AppletComponent = ({id, name, actionSlug, reactions , actionTrigger, lastTriggerUpdate, createdAt, enabled }: AppletProps) => {
    // --- Variables --- //
    const [bgColor, setBgColor] = useState<string>("");
    const [newName, setNewName] = useState<string>(name);
    const [theme  , setTheme]   = useState<string>("light");

    // --- Providers --- //
    const { services, setServices } = useServices();
    const { token   , setToken    } = useToken();

    // --- Router --- //
    const router = useRouter();

    // --- Functions --- //

    const getServices = async (token: string) => {
        setServices(await GetServices(token));
    }

    // --- UseEffect --- //

    useEffect(() => {
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

        const Service: Service | undefined = services.find((Service: Service) => Service.slug === actionSlug);

        setBgColor(Service?.decoration?.backgroundColor ?? '#ffffff');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bgColor]);

    useEffect(() => {
        setTheme(getTheme(bgColor));
    }, [bgColor]);

    useEffect(() => {
        if (name.length > 50)
            setNewName(name.slice(0, 50) + "...");
    }, [name]);

    return (
        <div style={{
                backgroundColor: bgColor,
                color: theme === "light" ? "#363841" : "#ffffff",
            }}
            className="rounded-[9px] p-[20px] h-[100%] flex flex-col justify-between"
        >
            <Link href={`/myApplets/applet/${id}`} style={{ cursor: 'pointer', backgroundColor: bgColor }}>
                <div className="cursor-pointer">
                    <div className="flex flex-wrap space-x-[3%]">
                        {actionSlug   && <LogoApplet slug={actionSlug}   width={56} height={56} toogleBackground={false}/>}
                        {reactions && Array.isArray(reactions) && reactions.map((reaction, index: number) => {
                            return (<LogoApplet key={index} slug={reaction.reactionSlug.split('.')[0]} width={56} height={56} toogleBackground={false} />);
                        })}
                    </div>
                    <div className="font-bold text-[28px] pb-[40%] w-full overflow-hidden break-words">
                        <div>
                           {newName}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex justify-end font-bold text-[18px]">
                <Switch isCheked={enabled} isDisable={true}/>
            </div>
        </div>
    );
};

const SearchApplet = () => {
    // --- Variables --- //
    const [applets      , setApplets]       = useState<AppletProps[]>([]);
    const [searchApplets, setSearchApplets] = useState<AppletProps[]>([]);
    const [searchValue  , setSearchValue]   = useState<string>("");

    // --- Providers --- //
    const { token, setToken } = useToken();

    // --- Router --- //
    const router = useRouter();

    // --- UseEffect --- //

    useEffect(() => {
        if (applets.length > 0)
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
            setApplets((await GetMyApplets(token)).reverse());
            setSearchApplets((await GetMyApplets(token)).reverse());
        };

        dataFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // --- Functions --- //

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
            <div className="w-[75%] lg:w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] flex mb-[5rem]">
                <div className="m-[10px]">
                    <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
                </div>
                <input value={searchValue}
                        placeholder="Search services"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[10px]"
                />
            </div>

            {/* Applets */}
            <div className="w-[75%] grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto">
                {searchApplets && searchApplets.map((applet) => {
                    return (
                        <div key={applet.id}>
                            <AppletComponent
                                id={applet.id}
                                name={applet.name}
                                reactions={applet.reactions}
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
