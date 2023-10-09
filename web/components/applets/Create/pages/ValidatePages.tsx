import NavBar, { LeftSection, MiddleSection, NavBarFuncButton, NavBarNavigateButtonIcon, RightSection, Title } from "../../../navbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme } from "../../../../utils/getTheme";
import Footer from "../../../footer";
import Image from "next/image";
import { Card, inputs } from "../interface";
import Switch from "../../../switch";

const Headers = ({ callback, color = "#363841" }: { callback: () => void, color?: string }) => {
    const theme = getTheme(color);

    return (
        <NavBar color={color.substring(1)} theme={theme}>
          <LeftSection>
            <NavBarFuncButton text="Back" func={() => callback()} color={color.substring(1)} theme={theme} />
          </LeftSection>
          <MiddleSection>
            <Title text="Review and Validation" theme={theme} />
          </MiddleSection>
          <RightSection>
              <NavBarNavigateButtonIcon href="/help">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
                </svg>
              </NavBarNavigateButtonIcon>
          </RightSection>
        </NavBar>
    )
};

const AppletsInfoContainer = ({ color, theme, props, username, title, setTitle } : { color: string, theme: string, props: any[], username: string, title: string, setTitle: Dispatch<SetStateAction<string>> }) => {
    return (
        <div style={{backgroundColor: `${color}`}} className={`w-full flex justify-center items-center gap-7 p-6 select-none`}>
            <div style={{backgroundColor: `${color}`}} className={`w-[50%] flex-col py-[25px]`}>
                <div style={{backgroundColor: `${color}`}} className={`flex-row py-[10px]`}>
                    {props && props.map((prop: any, id: number) => {
                        return (
                            <Image key={id} src={prop.decoration.logoUrl} width={45} height={45} alt={"Service Logo"} className={"object-contain"} />
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
        <div className={`flex justify-center items-center font-bold text-[36px] rounded-[50px] p-[27px] pl-[130px] pr-[130px]`}
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

const ValidatePages = ({ setPages, token, service, slug, index, array, setArray, title, setTitle, notif, setNotif }: { setPages: Dispatch<SetStateAction<number>>, token: string, service: string, index: number, slug: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, title: string, setTitle: Dispatch<SetStateAction<string>>, notif: boolean, setNotif: Dispatch<SetStateAction<boolean>> }) => {
    const [props, setProps] = useState<any[]>([]);
    const [profile, setProfile] = useState<any | undefined>(undefined);
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        if (profile !== undefined)
            return;

        const getProfile = async () => {
            try {
                const response = await fetch(`https://area51.zertus.fr/user/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                });

                const data = await response.json();

                setProfile(data?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getProfile();
    }, [profile, token]);

    useEffect(() => {
        if (props.length !== 0)
            return;
    
        const getService = async (slug: string) => {
            try {
                const response = await fetch(`https://area51.zertus.fr/service/${slug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const data = await response.json();
    
                setProps((prev) => [...prev, data?.data]);
            } catch (error) {
                console.log(error);
            }
        };

        if (array.length > 0) {
            setProps([]);

            // Create an array of unique service slugs from the 'array' variable
            const uniqueServiceSlugs = Array.from(new Set(array.map((item) => item.service)));
    
            // Iterate through unique slugs and fetch data for each
            uniqueServiceSlugs.forEach((slug) => {
                if (slug !== "") {
                    getService(slug);
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, array]);

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
            <AppletsInfoContainer color={props[0]?.decoration?.backgroundColor} theme={theme} props={props} username={profile?.username} title={title} setTitle={setTitle} />
            <div className={`min-h-screen flex justify-center gap-[100px] items-center flex-col bg-white text-[#363841]`}>
                <div className={`flex-row flex w-[50%] justify-between items-center`}>
                    <div className="text-[24px] font-bold">Receive a notification when the applet is actived</div>
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