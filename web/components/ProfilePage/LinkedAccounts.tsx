// --- Imports --- //
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// --- API --- //
import { useServices } from "../../utils/api/service/Providers/ServiceProvider";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { GetServices } from "../../utils/api/service/service";
import { DeleteOAuth2Token, OAuth2GetToken } from "../../utils/api/service/oauth2";

// --- Components --- //
import ModalError from "../Modal/modalErrorNotif";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { Service } from "../../utils/api/service/interface/interface";

// --- Interfaces --- //
interface LinkedAccountProps {
    slug             : string
    token            : string
    urlImg          ?: string
    backgroundColor ?: string
    setCurrentSlug   : Dispatch<SetStateAction<string>>
}

const LinkedAccount = ({ slug, urlImg = "/Logo/Logo.svg", backgroundColor, token, setCurrentSlug } : LinkedAccountProps) => {
    // --- Variables --- //
    const [islinkedState   , setIsLinked]    = useState<boolean>(false);
    const [modalErrorIsOpen, setIsErrorOpen] = useState<boolean>(false);
    const bgColor = backgroundColor ?? "#363841";

    // --- Providers --- //
    const { user, setUser } = useUser();

    // --- Functions --- //

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const deleteRequestoauth2 = async () => {
        const res = await DeleteOAuth2Token(token, slug);

        if (res === false)
            openModalError()
        else {
            setUser({
                ...user,
                connectedServices: user?.connectedServices.filter((element) => element !== slug)
            });
            setIsLinked(false);
        }
    }

    // --- UseEffect --- //

    useEffect(() => {
        if (user?.connectedServices.find((element) => element === slug))
            setIsLinked(true);
        else
            setIsLinked(false);
    }, [slug, user]);

    return (
        <div className="w-[100%] flex flex-col">
            <div className="w-[100%] flex flex-col lg:flex-row justify-between items-center">
                <div style={{backgroundColor : bgColor}} className="flex justify-center rounded-lg w-[50px] h-[50px] p-[8px] text-center">
                    <Image src={urlImg} width={50} height={50} alt={"Logo"}/>   
                </div>
                <div className="flex justify-center text-center font-bold text-[28px] text-[#00C2FF]">
                    {islinkedState ? (
                        <a onClick={() => deleteRequestoauth2()} className="cursor-pointer">
                            Unlink your account
                        </a>
                    ) : (
                        <a onClick={() => setCurrentSlug(slug)} className="cursor-pointer">
                            Link your account
                        </a>
                    ) }
                </div>
            </div>
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </div>
    );
}

const LinkedAccounts = () => {
    // --- Variables --- //
    const [currentSlug, setCurrentSlug] = useState<string>("");

    // --- Providers --- //
    const { services, setServices } = useServices();
    const { token   , setToken    } = useToken();
    const { user    , setUser     } = useUser();

    // --- Router --- //
    const route = useRouter();

    // --- Window --- //
    let oauth2Window: Window | null = null;

    const requestoauth2 = async () => {
        const openOAuth2Window = async () => {
            const handleRedirect = () => {
                if (oauth2Window)
                    oauth2Window.close();
            };

            try {
                const OAuthToken = await OAuth2GetToken(token, currentSlug);

                if (!OAuthToken)
                    return;

                // Open the OAuth2 authorization window
                oauth2Window = window.open(
                    `${localStorage.getItem("address") as string}/service/${currentSlug}/oauth2?redirecturi=http://localhost:8081/close&authToken=${OAuthToken}`,
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

    useEffect(() => {
        if (services.length !== 0)
            return;

        const getServices = async (token: string) => {
            if (token === "") {
                const tokenStore = localStorage.getItem("token");
    
                if (tokenStore === null) {
                    route.push("/");
                    return;
                }
                setToken(tokenStore);
            }

            setServices(await GetServices(token));
        };

        getServices(token);
    }, [services, token, route, setToken, setServices]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('message', (event) => {
                if (event.data === `OAuth2CallbackCompleted`) {
                    setUser({
                        ...user,
                        connectedServices: [...user?.connectedServices, currentSlug]
                    });
                    setCurrentSlug("");
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oauth2Window]);


    useEffect(() => {
        if (currentSlug === "")
            return;
        requestoauth2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSlug]);

    return (
        <div className="flex justify-center flex-col gap-y-10 pb-[10%]">
            <div className="w-[100%] flex justify-center lg:justify-start">
                <label className="text-[#363841] font-bold text-[42px] sm:text-center">
                    Linked Account
                </label>
            </div>
            <div className="flex flex-col items-center gap-y-7">
                {services && services.map((item : Service, index : number) => {
                    if (item.hasAuthentification) {
                        return (
                            <LinkedAccount
                                key={index} 
                                slug={item.slug}
                                token={token}
                                urlImg={item.decoration.logoUrl}
                                backgroundColor={item.decoration.backgroundColor}
                                setCurrentSlug={setCurrentSlug}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default LinkedAccounts;
