// --- Librairies import --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";

// --- Components import --- //
import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../NavBar/navbar";
import Footer from "../../../footer";
import { ServiceInfoContainer } from "../../../service/template";
import Title from "../../../NavBar/components/Title";
import { ButtonIconNavigate } from "../../../NavBar/components/Button";
import Button from "../../../Button/Button";

// --- API --- //
import { getTheme } from "../../../../utils/getTheme";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../../../utils/api/service/Providers/ServiceProvider";
import { GetServices } from "../../../../utils/api/service/service";
import { OAuth2GetToken } from "../../../../utils/api/service/oauth2";
import { useUser } from "../../../../utils/api/user/Providers/UserProvider";

// --- Interface --- //
import { ActionApplet, ReactionApplet } from "../../Interface/interface";
import { Service } from "../../../../utils/api/service/interface/interface";

// --- Headers --- //
const Headers = ({ color = "#363841", theme, setPages }: { color?: string, theme: string, setPages: Dispatch<SetStateAction<number>> }) => {
    const handleClick = () => {
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
    };

    return (
        <NavBar color={color.substring(1)} theme={theme}>
            <LeftSection>
                <Button text="Back"
                        callBack={() => { handleClick() }}
                        backgroundColor={theme === 'light' ? '#363841' : '#ffffff'}
                        textColor={color}
                        half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 4}
                />
            </LeftSection>
            <MiddleSection>
                <Title text="Complete the action fields" theme={theme} />
            </MiddleSection>
            <RightSection color={color.substring(1)} theme={theme} width={true}>
                <ButtonIconNavigate href="/help">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
                    </svg>
                </ButtonIconNavigate>
            </RightSection>
        </NavBar>
    );
}

const ServiceConnexionPages = ({ setPages }: { setPages: Dispatch<SetStateAction<number>> }) => {
    // --- Variables --- //
    const [props, setProps] = useState<Service | undefined>(undefined); // Service props for the current service (color, logo, name, etc...)
    const [theme, setTheme] = useState<string>("");
    const [action, setAction] = useState<any>({});

    // --- Providers Hooks --- //
    const { services, setServices } = useServices();
    const { token   , setToken    } = useToken();
    const { user    , setUser     } = useUser();

    // --- Router --- //
    const router = useRouter();

    // --- Window --- //
    let oauth2Window: Window | null = null;

    /**
     * Listen for the OAuth2 callback
     */
    window.addEventListener('message', (event) => {
        if (event.data === 'OAuth2CallbackCompleted')
            setPages(4);
    });

    // --- Fonction --- //

    /**
     * Get the services from the API
     * Store them in the services providers
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

    const handleClick = async () => {
        const openOAuth2Window = async () => {
            const handleRedirect = () => {
                if (oauth2Window)
                    oauth2Window.close();
            };

            const serviceName = getServiceName();

            try {
                const OAuthToken = await OAuth2GetToken(token, serviceName);

                if (!OAuthToken)
                    return;

                // Open the OAuth2 authorization window
                oauth2Window = window.open(
                    `${localStorage.getItem("address") as string}/service/${serviceName}/oauth2?redirecturi=http://localhost:8081/close&authToken=${OAuthToken}`,
                    'OAuth2 Authorization',
                    'width=720,height=480'
                );

                // Check if the window has been closed
                const checkWindowClosed = () => {
                    if (!oauth2Window || oauth2Window.closed) {
                        // Callback to handle the redirect
                        handleRedirect();
                        clearInterval(checkInterval);
                    }
                };

                const checkInterval = setInterval(checkWindowClosed, 1000);
            } catch (error) {
                console.log(error);
            }
        };

        openOAuth2Window();
    }

    // --- UseEffect --- //

    /**
     * First frame useEffect,
     * Check if the OAuth2 callback is already done
     */
    useEffect(() => {
        const serviceName = getServiceName();

        for (let i = 0; i < user.connectedServices.length; i++) {
            if (user.connectedServices[i] === serviceName) {
                setPages(4);
                return;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, setUser]);

    useEffect(() => {
        if (props !== undefined)
            return;
        if (services.length === 0)
            getServices();

        const Service: Service | undefined = services.find((Service: Service) => Service.slug === getServiceName());

        if (Service?.hasAuthentification === false) {
            setPages(4);
            return;
        }

        setProps(Service);

        if (Service && Service.actions && Service.reactions) {
            const findObjectBySlug = (array: any[], slug: string) => {
                return array.find(item => item?.slug === slug);
            };

            const index = localStorage.getItem("index");
            let slug: string = "";

            if (index === null) {
                const actionStr = localStorage.getItem("action") as string;
                const action = JSON.parse(actionStr) as ActionApplet;

                slug = action.actionSlug;
            } else {
                const reactionsStr = localStorage.getItem("reactions") as string;
                const reactions = JSON.parse(reactionsStr) as ReactionApplet[];

                slug = reactions[parseInt(index)].reactionSlug;
            }

            const actionWithSlug = findObjectBySlug(Service.actions, slug);

            if (actionWithSlug) {
                setAction(actionWithSlug)
                return;
            }

            const reactionWithSlug = findObjectBySlug(Service.reactions, slug);

            if (reactionWithSlug) {
                setAction(reactionWithSlug);
                return;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, props, action]);

    /**
     * Set the theme of the page
     */
    useEffect(() => {
        setTheme(getTheme(props?.decoration?.backgroundColor ?? "#ffffff"));
    }, [props, theme]);

    return (
        <>
            <Headers color={props?.decoration?.backgroundColor} setPages={setPages} theme={theme} />

            <div className={`min-h-screen flex justify-start gap-[100px] items-center flex-col`}
                style={{
                    backgroundColor: props?.decoration?.backgroundColor,
                    color: theme === 'dark' ? '#ffffff' : '#363841'
                }}
            >
                <ServiceInfoContainer color={props?.decoration.backgroundColor ?? '#fffffff'} theme={theme} url={props?.decoration.logoUrl ?? ''} name={props?.name ?? ''} />
                <div className={`w-[90%] flex justify-center items-center text-[24px] text-center`}>
                    {action?.description}
                </div>
                <div className={`flex justify-center items-center w-full h-full`}>
                    <Button callBack={() => { handleClick() }}
                            text={"Connection"}
                            backgroundColor={theme === 'dark' ? '#ffffff' : '#363841'}
                            textColor={props?.decoration?.backgroundColor}
                            size={true}
                            half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : 1}
                    />
                </div>
            </div>
            <Footer color={props?.decoration?.backgroundColor.substring(1)} theme={theme} />
        </>
    );
}

export default ServiceConnexionPages;
