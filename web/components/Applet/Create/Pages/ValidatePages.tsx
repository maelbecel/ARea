// --- Components --- //
import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../NavBar/navbar";
import Switch from "../../../switch";
import Title from "../../../NavBar/components/Title";
import { ButtonIconNavigate } from "../../../NavBar/components/Button";
import ModalError from "../../../Modal/modalErrorNotif";
import Button from "../../../Button/Button";

// --- Imports --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// --- API --- //
import { getTheme } from "../../../../utils/getTheme";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../../../utils/api/service/Providers/ServiceProvider";
import { GetService, GetServices } from "../../../../utils/api/service/service";
import { useUser } from "../../../../utils/api/user/Providers/UserProvider";
import { CreateApplet } from "../../../../utils/api/applet/applet";

// --- Interface --- //
import { ActionApplet, ReactionApplet } from "../../Interface/interface";
import { Service } from "../../../../utils/api/service/interface/interface";

// --- Headers --- //
const Headers = ({ callback, color = "#363841", theme }: { callback: () => void, color?: string, theme: string }) => {
    return (
        <NavBar color={color.substring(1)} theme={theme}>
          <LeftSection>
            <Button text="Back"
                    callBack={() => callback()}
                    backgroundColor={theme === 'light' ? '#363841' : '#ffffff'}
                    textColor={color}
                    half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 4}
            />
          </LeftSection>
          <MiddleSection>
            <Title text="Review and Validation" theme={theme} />
          </MiddleSection>
          <RightSection color={color.substring(1)} theme={theme} width={true}>
              <ButtonIconNavigate href="/help">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
                </svg>
              </ButtonIconNavigate>
          </RightSection>
        </NavBar>
    )
};

interface AppletsInfoContainerProps {
    color   : string;
    theme   : string;
    props   : any[];
    username: string | undefined;
    title   : string;
    setTitle: Dispatch<SetStateAction<string>>;
}

const AppletsInfoContainer = ({ color, theme, props, username, title, setTitle } : AppletsInfoContainerProps) => {
    return (
        <div style={{backgroundColor: `${color}`}} className={`w-full flex justify-center items-center gap-7 p-6 select-none`}>
            <div style={{backgroundColor: `${color}`}} className={`w-[90%] md:w-[50%] flex-col py-[25px]`}>
                <div style={{backgroundColor: `${color}`}} className={`flex-row py-[10px] flex gap-2`}>
                    {props && props.map((prop: any, id: number) => {
                        return (
                            (props[0]?.backgroundColor === "#ffffff" ? (
                                <div key={id} style={{backgroundColor : `${prop.backgroundColor}`}} className="flex justify-center items-center rounded-lg w-[45px] h-[45px] p-[5px]">
                                    <Image src={prop.logoUrl} width={45} height={45} alt={"Logo"} />
                                </div>
                            ) : (
                                <Image src={prop.logoUrl} width={45} height={45} alt={"Logo"} />
                            ))
                        )
                    })}
                </div>
                <div style={{color: (theme === "dark" ? "#ffffff" : "#363841")}} className={`text-[20px]`}>
                    Applet title
                </div>
                <input
                    type="text"
                    className={`rounded-[10px] w-full p-2 text-[#363841] font-bold text-[24px] border-[#363841] border-2`}
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); }}
                />
                <div style={{color: (theme === "dark" ? "#ffffff" : "#363841")}} className={`text-[12px]`}>
                    by <span className={"font-bold"}>{username}</span>
                </div>
            </div>
        </div>
    );
};

// --- Main Components --- //
const ValidatePages = ({ setPages }: { setPages: Dispatch<SetStateAction<number>> }) => {
    // --- Variables --- //
    const [theme   , setTheme]    = useState<string>("light");
    const [pictures, setPictures] = useState<{ logoUrl: string | undefined, backgroundColor: string | undefined }[]>([]);
    const [modalErrorIsOpen, setIsErrorOpen] = useState(false);

        // --- Sending Value --- //
    const [title, setTitle] = useState<string>("");
    const [notif, setNotif] = useState<boolean>(true);

    // --- Providers Hooker --- //
    const { services, setServices } = useServices();
    const { token, setToken } = useToken();
    const { user } = useUser();

    // --- Router --- //
    const router = useRouter();

    // --- Function --- //

    const getServices = async () => {
        if (token === "") {
            const tokenStore = localStorage.getItem("token");

            if (tokenStore === null) {
                router.push("/");
                return;
            }
            setToken(tokenStore);
        }

        setServices(await GetServices(token));
    };

    const getServiceName = (slug: string) => {
        if (slug.includes("."))
            return (slug.split(".")[0]);
        return slug;
    }

    const GetPictureFromService = async (service: string) => {
        const response = (await GetService(token, service)) as Service;

        setPictures((pictures) => [
            ...pictures,
            { logoUrl: response?.decoration?.logoUrl || undefined, backgroundColor: response?.decoration?.backgroundColor || undefined },
        ]);
    };

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const SendButton = async () => {
        if (title === "")
            return;

        const actionStr = localStorage.getItem("action") as string;
        const action = JSON.parse(actionStr) as ActionApplet;

        const reactionStr = localStorage.getItem("reactions") as string;
        const reactions = JSON.parse(reactionStr) as ReactionApplet[];

        let body = {
            name: title,
            actionSlug: action.actionSlug,
            actionInputs: action.actionInputs,
            reactions: reactions,
            notifUser: notif,
            enabled: true
        };

        const status = await CreateApplet(token, body, router);

        if (status === false)
            openModalError();
    };

    // --- UseEffect --- //

    /**
     * Fetch service data
     */
    useEffect(() => {
        if (pictures.length !== 0)
            return;
        if (services.length === 0)
            getServices();

        const actionStr = localStorage.getItem("action") as string;
        const action = JSON.parse(actionStr) as ActionApplet;

        GetPictureFromService(getServiceName(action.actionSlug));

        const reactionStr = localStorage.getItem("reactions") as string;
        const reactions = JSON.parse(reactionStr) as ReactionApplet[];

        for (let i = 0; i < reactions.length; i++)
            GetPictureFromService(getServiceName(reactions[i].reactionSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [services]);

    useEffect(() => {
        setTheme(getTheme(pictures[0]?.backgroundColor ?? "#ffffff"));
    }, [pictures]);

    return (
        <>
            <Headers
                theme={theme}
                callback={() => { setPages(0); }}
                color={pictures[0]?.backgroundColor}
            />

            <div className={`min-h-screen flex justify-start gap-[100px] items-center flex-col bg-white text-[#363841] pb-[5px]`}>
                <AppletsInfoContainer color={pictures[0]?.backgroundColor ?? "#ffffff"} theme={theme} props={pictures} username={user.username} title={title} setTitle={setTitle} />
                <div className={`flex-row flex w-[90%] md:w-[50%] justify-between items-center`}>
                    <div className="text-[18px] md:text-[24px] font-bold">
                        Receive a notification when the applet is actived
                    </div>
                    <Switch isCheked={notif} isDisable={false} setChecked={setNotif} />
                </div>
                <Button callBack={async () => { await SendButton(); }}
                        text="Validate"
                        backgroundColor={pictures[0]?.backgroundColor}
                        textColor={theme === 'dark' ? '#ffffff' : '#363841'}
                        size={true}
                        half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : 2}
                />
            </div>
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </>
    );
}

export default ValidatePages;
0