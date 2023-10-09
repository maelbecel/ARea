import NavBar, { LeftSection, MiddleSection, NavBarFuncButton, NavBarNavigateButtonIcon, RightSection, Title } from "../../../navbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme } from "../../../../utils/getTheme";
import Footer from "../../../footer";
import Image from "next/image";
import { Card, inputs } from "../interface";

const Headers = ({ callback, color = "#363841" }: { callback: () => void, color?: string }) => {
    const theme = getTheme(color);

    return (
        <NavBar color={color.substring(1)} theme={theme}>
          <LeftSection>
            <NavBarFuncButton text="Back" func={() => callback()} color={color.substring(1)} theme={theme} />
          </LeftSection>
          <MiddleSection>
            <Title text="Complete trigger fields" theme={theme} />
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

const ActionInfoContainer = ({ color, theme, url, title } : { color: string, theme: string, url: string, title: string }) => {
    return (
        <div style={{backgroundColor: `${color}`}} className={`w-full flex justify-center flex-col gap-7 p-6 select-none`}>
            <Image src={url} width={168} height={168} alt={"Service Logo"} className={"object-contain"} />
            <div className={`font-bold text-[50px] flex justify-center`} style={{ color: (theme === 'dark') ? '#ffffff' : '#363841' }}>
                {title}
            </div>
        </div>
    );
};

const TextField = ({ input, color, theme, array, setArray, index, id }: { input: inputs, color: string, theme: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, index: number, id: number }) => {
    return (
        <div className='flex flex-col w-[50%]'>
            <span className={`text-[24px] font-bold`} style={{ color: (theme === 'light' ? '#363841' : '#ffffff') }}>
                {input.label}
            </span>
            <input
                type="text"
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px]`}
                value={array[index].inputs[id]}
                onChange={(e) => {
                    const newArray = [...array];

                    newArray[index].inputs[id] = e.target.value;

                    setArray(newArray);
                }}
            />
        </div>
    );
};

const Field = ({ input, color, theme, array, setArray, index, id }: { input: inputs, color: string, theme: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, index: number, id: number }) => {
    if (input.type === "TEXT" || input.type === "URL")
        return (<TextField input={input} color={color} theme={theme} array={array} setArray={setArray} index={index} id={id} />);
    return (
        <>
        </>
    );
};

const ValidateTriggersButton = ({ props, callback, text }  : { props: any | undefined, callback: () => void, text: string }) => {
    const [active, setActive] = useState<boolean>(false);

    const theme = getTheme(props?.decoration?.backgroundColor);

    return (
        <div className={`flex justify-center items-center font-bold text-[36px] rounded-[50px] p-[27px] pl-[130px] pr-[130px]`}
            style={{
                backgroundColor: active ? props?.decoration?.backgroundColor : (theme === 'dark' ? 'white' : '#363841'),
                color          : active ? (theme === 'dark' ? 'white' : '#363841') : props?.decoration?.backgroundColor,
            }}
            onMouseDown={() => { setActive(true) }}
            onMouseLeave={() => { setActive(false) }}
            onClick={() => {
                setActive(false);
                callback();
            }}
        >
            {text}
        </div>
    )
};

const FillActionInputsPages = ({ setPages, token, service, slug, index, array, setArray, EditMode }: { setPages: Dispatch<SetStateAction<number>>, token: string, service: string, index: number, slug: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, EditMode: boolean }) => {
    const [props, setProps] = useState<any | undefined>(undefined);
    const [actionProps, setActionProps] = useState<any | undefined>(undefined);
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        if (props !== undefined)
            return;

        const getService = async (slug: string) => {
            try {
                const response = await fetch(`https://area51.zertus.fr/service/${slug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                });

                const data = await response.json();

                setProps(data?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getService(service);
    }, [props, service, token]);

    useEffect(() => {
        if (actionProps !== undefined)
            return;

            const getAction = async (service: string, slug: string) => {
            try {
                const response = await fetch(`https://area51.zertus.fr/${index === 0 ? `action/${slug}` : `reaction/${slug}/${array[0].slug}`}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                });

                const data = await response.json();

                setActionProps(data?.data);

                setArray((prev) => {
                    const newArray = [...prev];

                    newArray[index].fields = data?.data?.inputs;

                    return (newArray);
                });

                console.log(data?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAction(service, slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, service, slug, token, actionProps, array]);

    useEffect(() => {
        setTheme(getTheme(props?.decoration?.backgroundColor));
    }, [props]);

    return (
        <>
            <Headers
                callback={() => {
                    if (EditMode === true)
                        setPages(0);
                    else
                        setPages(3);
                }}
                color={props?.decoration?.backgroundColor}
            />
            <div className={`min-h-screen flex justify-start gap-[100px] items-center flex-col`}
                style={{
                    backgroundColor: props?.decoration?.backgroundColor,
                    color: theme === 'dark' ? '#ffffff' : '#363841'
                }}
            >
                <ActionInfoContainer color={props?.decoration?.backgroundColor} theme={theme} url={props?.decoration?.logoUrl} title={props?.name} />
                {actionProps?.inputs?.map((input: inputs, id: number) => {
                    return (
                        <Field key={id} input={input} color={props?.decoration?.backgroundColor} theme={theme} array={array} setArray={setArray} index={index} id={id} />
                    );
                })}
                <ValidateTriggersButton
                    props={props}
                    text={EditMode === true ? "Edit Trigger" : "Create Trigger"}
                    callback={() => {
                        let good = false as boolean;

                        actionProps?.inputs?.forEach((input: inputs, id: number) => {
                            if (array[index].inputs[id] === undefined || array[index].inputs[id] === "")
                                good = false;
                            else {
                                if (input.type === "URL" && !array[index].inputs[id].includes("http"))
                                    good = false;
                                else
                                    good = true;
                            }
                        });

                        if (good === true) {
                            if (EditMode === true || index === 0) {
                                setPages(0);
                                return;
                            }
                            setPages(5);
                        }
                    }}
                />
            </div>

            <Footer color={props?.decoration?.backgroundColor.substring(1)} theme={theme} />
        </>
    );
}

export default FillActionInputsPages;