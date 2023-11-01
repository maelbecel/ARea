import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../NavBar/navbar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme } from "../../../../utils/getTheme";
import Footer from "../../../footer";
import Image from "next/image";
import { ActionApplet, Card, Input, ReactionApplet, inputs } from "../interface";
import Title from "../../../NavBar/components/Title";
import { ButtonIconNavigate, CallBackButton } from "../../../NavBar/components/Button";
import { useServices } from "../../../../utils/api/service/Providers/ServiceProvider";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { useRouter } from "next/router";
import { GetServices } from "../../../../utils/api/service/service";
import { Service } from "../../../../utils/api/service/interface/interface";
import { GetReactionInputs } from "../../../../utils/api/reaction/reaction";
import { GetActionInputs } from "../../../../utils/api/action/action";
import Button from "../../../Button/Button";

const Headers = ({ callback, color = "#363841" }: { callback: () => void, color?: string }) => {
    const theme = getTheme(color);

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
            <Title text="Complete trigger fields" theme={theme} />
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

const TextField = ({ input, theme, setInputsValue, inputsValue, id }: { input: Input, theme: string, setInputsValue: Dispatch<SetStateAction<Input[]>>, inputsValue: Input[], id: number }) => {
    return (
        <div className='flex flex-col w-[90%] lg:w-[50%]'>
            <span className={`text-[24px] font-bold`} style={{ color: (theme === 'light' ? '#363841' : '#ffffff') }}>
                {input.label}
            </span>
            <input
                type="text"
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px] border-[#363841] border-2`}
                value={inputsValue[id].value}
                onChange={(e) => {
                    setInputsValue(inputsValue.map((input: Input, index: number) => {
                        if (index === id)
                            input.value = e.target.value;
                        return input;
                    }));
                }}
            />
        </div>
    );
};

const NumberField = ({ input, theme, setInputsValue, inputsValue, id }: { input: Input, theme: string, setInputsValue: Dispatch<SetStateAction<Input[]>>, inputsValue: Input[], id: number }) => {
    return (
        <div className='flex flex-col w-[90%] lg:w-[50%]'>
            <span className={`text-[24px] font-bold`} style={{ color: (theme === 'light' ? '#363841' : '#ffffff') }}>
                {input.label}
            </span>
            <input
                type="number"
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px] border-[#363841] border-2`}
                value={inputsValue[id].value}
                onChange={(e) => {
                    setInputsValue(inputsValue.map((input: Input, index: number) => {
                        if (index === id)
                            input.value = e.target.value;
                        return input;
                    }));
                }}
            />
        </div>
    );
};

const SelectField = ({ input, theme, setInputsValue, inputsValue, id }: { input: Input, theme: string, setInputsValue: Dispatch<SetStateAction<Input[]>>, inputsValue: Input[], id: number }) => {
    // Put the default value of the select
    if (inputsValue[id].value === undefined || inputsValue[id].value === "") {
        setInputsValue(inputsValue.map((input: Input, index: number) => {
            if (input.type === "SELECT" && (input.value === undefined || input.value === ""))
                input.value = input.options[0];
            return input;
        }));
    }

    return (
        <div className='flex flex-col w-[90%] lg:w-[50%]'>
            <span className={`text-[24px] font-bold`} style={{ color: (theme === 'light' ? '#363841' : '#ffffff') }}>
                {input.label}
            </span>
            <select
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px]`}
                value={inputsValue[id].value}
                onChange={(e) => {
                    setInputsValue(inputsValue.map((input: Input, index: number) => {
                        if (index === id)
                            input.value = e.target.value;
                        return input;
                    }));
                }}
            >
                {input.options?.map((option: string, id: number) => {
                    return (
                        <option key={id} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

const Field = ({ input, theme, id, inputsValue, setInputsValue }: { input: Input, theme: string, id: number, inputsValue: Input[], setInputsValue: Dispatch<SetStateAction<Input[]>> }) => {
    if (input.type === "TEXT" || input.type === "URL")
        return (<TextField   input={input} theme={theme} setInputsValue={setInputsValue} inputsValue={inputsValue} id={id} />);
    if (input.type === "NUMBER")
        return (<NumberField input={input} theme={theme} setInputsValue={setInputsValue} inputsValue={inputsValue} id={id} />);
    if (input.type === "SELECT")
        return (<SelectField input={input} theme={theme} setInputsValue={setInputsValue} inputsValue={inputsValue} id={id} />);
    return (<></>);
};

const FillActionInputsPages = ({ setPages, service, slug, array, setArray, EditMode, setAction, setReactions }: { setPages: Dispatch<SetStateAction<number>>, service: string, slug: string, array: Card[], setArray: Dispatch<SetStateAction<Card[]>>, EditMode: boolean, setAction: Dispatch<SetStateAction<ActionApplet>>, setReactions: Dispatch<SetStateAction<ReactionApplet[]>> }) => {
    // --- Variables --- //
    const [props      , setProps]       = useState<any | undefined>(undefined); // Service for the current action (color, background, logo, etc...)
    const [actionProps, setActionProps] = useState<any | undefined>(undefined); // Action of the current service (inputs, placeholders, etc...)
    const [inputsValue, setInputsValue] = useState<Input[]>([]);                // Value of the inputs
    const [theme      , setTheme]       = useState<string>("light");

    // --- Providers Hooks --- //
    const { services, setServices } = useServices();
    const { token, setToken } = useToken();

    // --- Router --- //
    const router = useRouter();

    /**
     * Get the list of services
     * @returns The list of services
     */
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

    /**
     * Get the name of the current service
     * @returns The name of the current service (action or reaction)
     */
    const getServiceName = (): string => {
        const index = localStorage.getItem("index");

        if (index === null) {
            const actionStr = localStorage.getItem("action") as string;
            const action = JSON.parse(actionStr) as ActionApplet;

            return action.actionSlug.split(".")[0];
        }
        const reactionsStr = localStorage.getItem("reactions") as string;
        const reactions = JSON.parse(reactionsStr) as ReactionApplet[];

        return reactions[parseInt(index)].reactionSlug.split(".")[0];
    };

    /**
     * Fill the props variable with the current service
     */
    useEffect(() => {
        if (props !== undefined)
            return;
        if (services.length === 0)
            getServices();

        const Service: Service | undefined = services.find((Service: Service) => Service.slug === getServiceName());

        setProps(Service);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, services]);

    /**
     * Get the action of the current service
     */
    useEffect(() => {
        if (actionProps !== undefined && props !== undefined)
            return;

        const getAction = async () => {
            const index = localStorage.getItem("index") as string;
            const actionStr = localStorage.getItem("action") as string;
            let action = JSON.parse(actionStr) as ActionApplet;

            if (index === null) {
                await GetActionInputs(token, action.actionSlug).then((response) => {
                    setActionProps(response);
                    setInputsValue(response?.inputs as Input[]);

                    action.actionInputs = response?.inputs as Input[];

                    localStorage.setItem("action", JSON.stringify(action));
                }).catch((error) => {
                    console.log("ERROR : ", error);
                });
            } else {
                const reactionsStr = localStorage.getItem("reactions") as string;
                let reactions = JSON.parse(reactionsStr) as ReactionApplet[];

                await GetReactionInputs(token, reactions[parseInt(index)].reactionSlug, action.actionSlug).then((response) => {
                    setActionProps(response);
                    setInputsValue(response?.inputs as Input[]);

                    reactions[parseInt(index)].reactionInputs = response?.inputs as Input[];

                    localStorage.setItem("reactions", JSON.stringify(reactions));
                }).catch((error) => {
                    console.log("ERROR : ", error);
                });
            }
        };

        getAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [service, slug, token, actionProps]);

    /**
     * Check if the action have inputs
     * if not, go to the next page
     */
    useEffect(() => {
        if (actionProps === undefined)
            return;
        if (actionProps?.inputs.length === 0) {
            if (EditMode === true || localStorage.getItem("index") as string === null) {
                setPages(0);
                return;
            }
            setPages(5);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actionProps]);

    useEffect(() => {
        setTheme(getTheme(props?.decoration?.backgroundColor));
    }, [props]);

    return (
        <>
            <Headers callback={() => {
                        if (EditMode === true)
                            setPages(0);
                        else {
                            const index = localStorage.getItem("index");

                            if (index === null) {
                                const actionStr = localStorage.getItem("action") as string;
                                let action = JSON.parse(actionStr) as ActionApplet;

                                action.actionSlug = action.actionSlug.split(".")[0];

                                localStorage.setItem("action", JSON.stringify(action));
                            } else {
                                const reactionsStr = localStorage.getItem("reactions") as string;
                                let reactions = JSON.parse(reactionsStr) as ReactionApplet[];

                                reactions[parseInt(index)].reactionSlug = reactions[parseInt(index)].reactionSlug.split(".")[0];

                                localStorage.setItem("reactions", JSON.stringify(reactions));
                            }
                            setPages(2);
                        }
                     }}
                     color={props?.decoration?.backgroundColor}
            />
            <div className={`min-h-screen flex justify-start gap-[50px] items-center flex-col py-[5px]`}
                 style={{
                    backgroundColor: props?.decoration?.backgroundColor,
                    color: theme === 'dark' ? '#ffffff' : '#363841'
                 }}
            >
                <ActionInfoContainer color={props?.decoration?.backgroundColor} theme={theme} url={props?.decoration?.logoUrl} title={props?.name} />
                {actionProps?.placeholders &&
                    <ul className='w-[90%] lg:w-[50%] text-[18px]  md:text-[24px]'>
                        {Object.keys(actionProps.placeholders).map((key) => (
                            <li key={key}>
                                <strong>{key}: </strong> {actionProps.placeholders[key]}
                            </li>
                        ))}
                    </ul>
                }
                {inputsValue && inputsValue?.map((input: Input, id: number) => {
                    return (
                        <Field key={id}
                               input={input}
                               theme={theme}
                               inputsValue={inputsValue}
                               setInputsValue={setInputsValue}
                               id={id}
                        />
                    );
                })}
                <Button text={EditMode === true ? "Edit Trigger" : "Create Trigger"}
                        callBack={() => {
                            let good = false as boolean;

                            actionProps?.inputs?.forEach((input: inputs, id: number) => {
                                if (input.label.includes("(optional)") === true)
                                    good = true;
                                else if (inputsValue[id].value === undefined || inputsValue[id].value === "")
                                    good = false;
                                else {
                                    if (input.type === "URL" && !inputsValue[id].value.includes("http"))
                                        good = false;
                                    else
                                        good = true;
                                }
                            });

                            if (good === true) {
                                const index = localStorage.getItem("index") as string;

                                if (index === null) {
                                    const actionStr = localStorage.getItem("action") as string;
                                    let action = JSON.parse(actionStr) as ActionApplet;

                                    action.actionInputs = inputsValue;

                                    localStorage.setItem("action", JSON.stringify(action));

                                    setAction(action);
                                } else {
                                    const reactionsStr = localStorage.getItem("reactions") as string;
                                    let reactions = JSON.parse(reactionsStr) as ReactionApplet[];

                                    reactions[parseInt(index)].reactionInputs = inputsValue;

                                    localStorage.setItem("reactions", JSON.stringify(reactions));

                                    setReactions(reactions);
                                }

                                setPages(0);
                            }
                        }}
                        size={true}
                        backgroundColor={theme === 'dark' ? '#ffffff' : '#363841'}
                        textColor={props?.decoration?.backgroundColor}
                        half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : 2}
                    />
            </div>

            <Footer color={props?.decoration?.backgroundColor.substring(1)} theme={theme} />
        </>
    );
}

export default FillActionInputsPages;
