import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../NavBar/navbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme } from "../../../../utils/getTheme";
import Image from "next/image";
import { Card } from "../interface";
import Switch from "../../../switch";
import Title from "../../../NavBar/components/Title";
import { ButtonIconNavigate, CallBackButton } from "../../../NavBar/components/Button";
import { GetProfile } from "../../../../utils/api/user/me";
import { UserProfile } from "../../../../utils/api/user/interface/interface";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../../../utils/api/service/Providers/ServiceProvider";
import { useRouter } from "next/router";
import { Service } from "../../../../utils/api/service/interface/interface";
import { GetServices } from "../../../../utils/api/service/service";

const Headers = ({ callback, color = "#363841" }: { callback: () => void, color?: string }) => {
    const theme = getTheme(color);

    return (
        <NavBar color={color.substring(1)} theme={theme}>
          <LeftSection>
            <CallBackButton text="Back" func={() => callback()} color={color.substring(1)} theme={theme} />
          </LeftSection>
          <MiddleSection>
            <Title text="Review and Validation" theme={theme} />
          </MiddleSection>
          <RightSection color={color.substring(1)} theme={theme}>
              <ButtonIconNavigate href="/help">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
                </svg>
              </ButtonIconNavigate>
          </RightSection>
        </NavBar>
    )
};

const AppletsInfoContainer = ({ color, theme, props, username, title, setTitle } : { color: string, theme: string, props: any[], username: string | undefined, title: string, setTitle: Dispatch<SetStateAction<string>> }) => {
    return (
        <div style={{backgroundColor: `${color}`}} className={`w-full flex justify-center items-center gap-7 p-6 select-none`}>
            <div style={{backgroundColor: `${color}`}} className={`w-[90%] md:w-[50%] flex-col py-[25px]`}>
                <div style={{backgroundColor: `${color}`}} className={`flex-row py-[10px] flex gap-2`}>
                    {props && props.map((prop: any, id: number) => {
                        return (
                            (props[0]?.decoration.backgroundColor === "#ffffff" ? (
                                <div key={id} style={{backgroundColor : `${prop.decoration.backgroundColor}`}} className="flex justify-center items-center rounded-lg w-[45px] h-[45px] p-[5px]">
                                    <Image src={prop.decoration.logoUrl} width={45} height={45} alt={"Logo"} />
                                </div>
                            ) : (
                                <Image src={prop.decoration.logoUrl} width={45} height={45} alt={"Logo"} />
                            ))
                        )
                    })}
                </div>
                <div style={{color: (theme === "dark" ? "#ffffff" : "#363841")}} className={`text-[20px]`}>
                    Applet title
                </div>
                <input
                    type="text"
                    className={`rounded-[10px] w-full p-2 text-[#363841] font-bold text-[24px]`}
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

const ValidateButton = ({ props, callback }  : { props: any | undefined, callback: () => void }) => {
    const [active, setActive] = useState<boolean>(false);

    const theme = getTheme(props?.decoration?.backgroundColor);

    return (
        <div className={`flex justify-center items-center font-bold text-[36px] rounded-[50px] py-[10px] md:py-[27px] w-[90%] md:w-[75%] lg:w-[50%] xl:w-[25%]`}
            style={{
                backgroundColor: !active ? props?.decoration?.backgroundColor : (theme === 'dark' ? 'white' : '#363841'),
                color          : !active ? (theme === 'dark' ? 'white' : '#363841') : props?.decoration?.backgroundColor,
            }}
            onMouseDown={() => { setActive(true) }}
            onMouseLeave={() => { setActive(false) }}
            onClick={() => {
                setActive(false);
                callback();
            }}
        >
            Validate
        </div>
    )
};

const ValidatePages = ({ setPages, service, slug, index, array, setArray, title, setTitle, notif, setNotif }: { setPages: Dispatch<SetStateAction<number>>, service: string, index: number, slug: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, title: string, setTitle: Dispatch<SetStateAction<string>>, notif: boolean, setNotif: Dispatch<SetStateAction<boolean>> }) => {
    const [props, setProps] = useState<Service[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [theme, setTheme] = useState<string>("light");

    const { token, setToken } = useToken();
    const { services, setServices } = useServices();

    const router = useRouter();

    /**
     * Fetch user profile
     */
    useEffect(() => {
        if (profile !== null && profile !== undefined)
            return;
        if (token === "") {
            const tokenStore = localStorage.getItem("token");
            
            if (tokenStore === null) {
                router.push("/");
                return;
            }
            setToken(tokenStore);
        }

        const getProfile = async (token: string) => {
            setProfile(await GetProfile(token));
        };

        getProfile(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile, token]);

    const getServices = async (token: string) => {
        setServices(await GetServices(token));
    };

    const getServiceBySlug = (slug: string) => {
        for (let i = 0; i < services.length; i++) {
            if (services[i].slug === slug)
                return (services[i]);
        }
        return (null);
    }

    /**
     * Fetch service data
     */
    useEffect(() => {
        if (props.length !== 0)
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

        for (let i = 0; i < array.length; i++) {
            const service = getServiceBySlug(array[i].service);

            if (service === null)
                continue;
            setProps((prev) => [...prev, service]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, services, array, token]);

    useEffect(() => {
        setTheme(getTheme(props[0]?.decoration?.backgroundColor));
    }, [props]);

    return (
        <>
            <Headers
                callback={() => {
                    setTitle("");
                    setPages(4);
                }}
                color={props[0]?.decoration?.backgroundColor}
            />
            <div className={`min-h-screen flex justify-start gap-[100px] items-center flex-col bg-white text-[#363841] pb-[5px]`}>
                <AppletsInfoContainer color={props[0]?.decoration?.backgroundColor} theme={theme} props={props} username={profile?.username} title={title} setTitle={setTitle} />
                <div className={`flex-row flex w-[90%] md:w-[50%] justify-between items-center`}>
                    <div className="text-[18px] md:text-[24px] font-bold">Receive a notification when the applet is actived</div>
                    <Switch isCheked={notif} isDisable={false} setChecked={setNotif} />
                </div>
                <ValidateButton
                    props={props[0]}
                    callback={() => {
                        if (title === "")
                            return;
                        setPages(0);
                    }}
                />
            </div>
        </>
    );
}

export default ValidatePages;
0