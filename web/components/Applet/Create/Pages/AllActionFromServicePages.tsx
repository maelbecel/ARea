// --- Imports --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";

// --- API --- //
import { getTheme } from "../../../../utils/getTheme";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../../../utils/api/service/Providers/ServiceProvider";
import { GetServices } from "../../../../utils/api/service/service";
import { Service } from "../../../../utils/api/service/interface/interface";

// --- Components --- //
import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../NavBar/navbar";
import { ServiceInfoContainer } from "../../../Service/Template";
import GetActionService from "../../../Service/GetActionService";
import Title from "../../../NavBar/components/Title";
import { ButtonIconNavigate } from "../../../NavBar/components/Button";
import Button from "../../../Button/Button";

// --- Interfaces --- //
import { ActionApplet, ReactionApplet } from "../../Interface/interface";

// --- Headers --- //
const Headers = ({ color = "#363841", setPages, back, theme }: { color?: string, setPages: Dispatch<SetStateAction<number>>, back: boolean, theme: string }) => {
    // --- Router --- //
    const router = useRouter();

    /**
     * Function that handle on Back button
     */
    const callBack = () => {
        const index = localStorage.getItem("index") as string;

        if (index !== null) {
            const reactionsStr = localStorage.getItem("reactions") as string;
            let reactions = JSON.parse(reactionsStr) as ReactionApplet[];

            reactions[parseInt(index)].reactionSlug = "";

            localStorage.setItem("reactions", JSON.stringify(reactions));
        } else {
            const actionStr = localStorage.getItem("action") as string;
            let action = JSON.parse(actionStr) as ActionApplet;

            action.actionSlug = "";

            localStorage.setItem("action", JSON.stringify(action));
        }

        if (back === true) {
            router.back();
            router.back();
            return;
        }

        setPages(1)
    };

    return (
        <NavBar color={color.substring(1)} theme={theme}>
            <LeftSection>
                <Button text="Back"
                        callBack={() => { callBack() }}
                        backgroundColor={theme === 'light' ? '#363841' : '#ffffff'}
                        textColor={color}
                        half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 4}
                />
            </LeftSection>
            <MiddleSection>
                <Title text="Choose an action" theme={theme} />
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
}

const AllActionFromServicePages = ({ setPages, back } : { setPages: Dispatch<SetStateAction<number>>, back: boolean }) => {
    // --- Variables --- //
    const [props, setProps] = useState<any | undefined>(undefined); // Service props (for get color, logo etc...)
    const [actions, setActions] = useState<any[]>([]);              // All the actions or reactions from the service to draw
    const [theme, setTheme] = useState<string>("light");            // Theme of the page
    const [type , setType] = useState<string>("undefined");         // Type of the page (action or reaction)

    // --- Provides Hookers --- //
    const { services, setServices } = useServices();
    const { token, setToken } = useToken();

    // --- Router --- //
    const router = useRouter();

    // --- Functions --- //

    /**
     * Get all the Services, available for the user
     * Store them in the service providers.
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
        const index = localStorage.getItem("index") as string;

        if (index !== null) {
            const reactionsStr = localStorage.getItem("reactions") as string;
            const reactions = JSON.parse(reactionsStr) as ReactionApplet[];

            return reactions[parseInt(index)].reactionSlug;
        }
        const actionStr = localStorage.getItem("action") as string;
        const action = JSON.parse(actionStr) as ActionApplet;

        return action.actionSlug;
    }

    const handleClick = (slug: string) => {
        const index = localStorage.getItem("index") as string;

        if (index !== null) {
            const reactionsStr = localStorage.getItem("reactions") as string;
            let reactions = JSON.parse(reactionsStr) as ReactionApplet[];

            reactions[parseInt(index)].reactionSlug = slug;

            localStorage.setItem("reactions", JSON.stringify(reactions));
        } else {
            const actionStr = localStorage.getItem("action") as string;
            let action = JSON.parse(actionStr) as ActionApplet;

            action.actionSlug = slug;

            localStorage.setItem("action", JSON.stringify(action));
        }
        setPages(3);
    };

    // --- UseEffects --- //

    /**
     * First frame useEffect,
     * that get the type (action or reaction) of the page.
     */
    useEffect(() => {
        const index = localStorage.getItem("index") as string;

        if (index !== null)
            setType("reaction");
        else
            setType("action");
    }, [type]);

    /**
     * Get all services, if the services providers is empty.
     * Draw the actions or reactions depending on the type.
     */
    useEffect(() => {
        if (props !== undefined || type === "undefined")
            return;
        if (services.length === 0)
            getServices();

        const Service: Service | undefined = services.find((Service: Service) => Service.slug === getServiceName());

        setProps(Service);

        if (type === "action") {
            if (Service && Service.actions) {
                const actionsWithType = Service.actions.map((action: any) => ({
                    ...action,
                    type: "action"
                }));

                setActions([...actionsWithType]);
            }
        } else if (type === "reaction") {
            if (Service && Service.reactions) {
                const reactionsWithType = Service.reactions.map((reaction: any) => ({
                    ...reaction,
                    type: "reaction"
                }));

                setActions([...reactionsWithType])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, props, actions, services]);

    /**
     * Get the theme of the page, depending on the color of the service.
     */
    useEffect(() => {
        setTheme(getTheme(props?.decoration?.backgroundColor));
    }, [props]);

    return (
        <>
            <Headers color={props?.decoration?.backgroundColor}
                     setPages={setPages}
                     back={back}
                     theme={theme}
            />
            <div className={`min-h-screen flex justify-start items-center flex-col`}>
                <ServiceInfoContainer color={props?.decoration.backgroundColor} theme={theme} url={props?.decoration.logoUrl} name={props?.name} />

                <div className={`p-[10px] md:p-[55px] w-full`}>
                    <GetActionService
                        actions={actions}
                        color={props?.decoration?.backgroundColor}
                        theme={theme}
                        callback={(slug: string) => { handleClick(slug) }}
                    />
                </div>
            </div>
        </>
    );
}

export default AllActionFromServicePages;
