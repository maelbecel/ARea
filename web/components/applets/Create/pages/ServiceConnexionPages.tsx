// --- Librairies import --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// --- Components import --- //
import NavBar, { LeftSection, MiddleSection, NavBarFuncButton, NavBarNavigateButtonIcon, RightSection, Title } from "../../../navbar";
import { getTheme } from "../../../../utils/getTheme";
import Footer from "../../../footer";
import { ServiceInfoContainer } from "../../../service/template";
import { Card } from "../interface";

const Headers = ({ color = "#363841", setPages }: { color?: string, setPages: Dispatch<SetStateAction<number>> }) => {
    const theme = getTheme(color);

    return (
        <NavBar color={color.substring(1)} theme={theme}>
            <LeftSection>
                <NavBarFuncButton text="Back" color={color.substring(1)} func={() => setPages(2)} theme={theme} />
            </LeftSection>
            <MiddleSection>
                <Title text="Complete the action fields" theme={theme} />
            </MiddleSection>
            <RightSection>
                <NavBarNavigateButtonIcon href="/help">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
                    </svg>
                </NavBarNavigateButtonIcon>
            </RightSection>
        </NavBar>
    );
}

const ConnexionButton = ({ props, callback } : { props: any | undefined, callback: () => void }) => {
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
            Connection
        </div>
    )
}

const ServiceConnexionPages = ({ setPages, token, service, slug, index, array, setArray }: { setPages: Dispatch<SetStateAction<number>>, token: string, service: string, slug: string, array: Card[], index: number, setArray: Dispatch<SetStateAction<Card[]>> }) => {
    const [props, setProps] = useState<any | undefined>(undefined);
    const [theme, setTheme] = useState<string>("");
    const [action, setAction] = useState<any>({});

    //TODO: check if the oauth2 is already done if yes auto redirect to pages(4)

    let oauth2Window: Window | null = null;

    useEffect(() => {
        if (props !== undefined)
            return;

        const getService = async (service: string) => {
            try {
                const response = await fetch(`https://area51.zertus.fr/service/${service}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                });

                const data = await response.json();

                setProps(data?.data);

                if (data?.data && data?.data.actions && data?.data.reactions) {
                    console.log(slug);

                    const findObjectBySlug = (array: any[], slug: string) => {
                        return array.find(item => item?.slug === slug);
                    };

                    const actionWithSlug = findObjectBySlug(data.data.actions, slug);

                    if (actionWithSlug) {
                        setAction(actionWithSlug)
                        return;
                    }

                    const reactionWithSlug = findObjectBySlug(data.data.reactions, slug);

                    if (reactionWithSlug) {
                        setAction(reactionWithSlug);
                        return;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        getService(service);
    }, [service, token, slug, props, action]);

    useEffect(() => {
        setTheme(getTheme(props?.decoration?.backgroundColor));
    }, [props, theme]);

    const handleClick = async () => {
        const handleRedirect = () => {
            if (oauth2Window)
                oauth2Window.close();
        };

        const openOAuth2Window = async () => {
            try {
                const response = await fetch(`https://area51.zertus.fr/service/${service}/oauth2/token`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                // Open the OAuth2 authorization window
                oauth2Window = window.open(
                    `https://area51.zertus.fr/service/${service}/oauth2?redirecturi=http://localhost:8081/close&authToken=${data?.data}`,
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

    // Ajouter un gestionnaire d'événements pour écouter le signal
    window.addEventListener('message', (event) => {
        if (event.data === 'OAuth2CallbackCompleted') {
            setArray(array.map((card: Card, id: number) => {
                if (id === index)
                    return {
                        ...card,
                        slug: slug,
                        service: props?.slug,
                        name: action?.name,
                        description: action?.description,
                        decoration: {
                            logoUrl: props?.decoration.logoUrl,
                            backgroundColor: props?.decoration.backgroundColor,
                        }
                    };
                return card;
            }));
            setPages(4);
        }
    });

    return (
        <>
            <Headers color={props?.decoration?.backgroundColor} setPages={setPages} />
            <div className={`min-h-screen flex justify-start gap-[100px] items-center flex-col`}
                style={{
                    backgroundColor: props?.decoration?.backgroundColor,
                    color: theme === 'dark' ? '#ffffff' : '#363841'
                }}
            >
                <ServiceInfoContainer color={props?.decoration.backgroundColor} theme={theme} url={props?.decoration.logoUrl} name={props?.name} />

                <div className={`w-full flex justify-center items-center text-[24px]`}>
                    {action?.description}
                </div>
                <div className={`flex justify-center items-center w-full h-full`}>
                    <ConnexionButton props={props} callback={() => {handleClick()}} />
                </div>
            </div>
            <Footer color={props?.decoration?.backgroundColor.substring(1)} theme={theme} />
        </>
    );
}

export default ServiceConnexionPages;
