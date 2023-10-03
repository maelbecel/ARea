// --- Librairies import --- //
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

// --- Components import --- //
import NavBar, { LeftSection, RightSection, NavBarFuncButton, NavBarNavigateButtonIcon, MiddleSection, Title } from "../../../components/navbar";
import GetActionService from "../../../components/service/GetActionService";
import Footer from "../../../components/footer";
import { getTheme } from "../../../utils/getTheme";
import { ServiceInfoContainer } from "../../../components/service/template";

const IndexPage: NextPage = () => {
    const router = useRouter();

    const [service, setService] = useState<any | undefined>(undefined);
    const [action, setAction] = useState<any>({});
    const [slug, setSlug] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [token, setToken] = useState<string>("");

    //TODO: add filter system that just create a list of reactions or actions

    useEffect(() => {
        const checkIfNotLogged = async () => {
            setToken(localStorage.getItem("token") as string);

            if (token === null)
                router.push("/");
        }

        const getQueryValue = async () => {
            setName(router.query.service as string);
            setSlug(router.query.slug    as string);

            if (name === undefined || slug === undefined)
                router.push("/");
        }

        checkIfNotLogged();
        getQueryValue();
    }, [router, token, name, slug]);

    useEffect(() => {
        const getService = async (name: string, slug: string) => {
            if (name?.length === 0 || slug?.length === 0 || token?.length === 0)
                return;

            try {
                const response = await fetch(`http://zertus.fr:8001/service/${name}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                });

                const data = await response.json();

                setService(data?.data);

                // Check if service and its properties are defined before spreading
                if (data?.data && data?.data.actions && data?.data.reactions) {
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
                router.push("/");
            }
        }

        getService(name, slug);
    }, [name, slug, token, router]);

    const theme = getTheme(service?.decoration?.backgroundColor);

    const [active, setActive] = useState<boolean>(false);

    const handleClick = async () => {
        //TODO: connect with aouth2 the user

        console.log("click")

        setActive(false);
    }

    return (
        <>
            <NavBar color={service?.decoration?.backgroundColor?.substring(1)} theme={theme}>
                <LeftSection>
                    <NavBarFuncButton text="Back" color={service?.decoration?.backgroundColor?.substring(1)} func={() => router.back()} theme={theme} />
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

            <div className={`min-h-screen flex justify-start gap-[100px] items-center flex-col`}
                style={{
                    backgroundColor: service?.decoration?.backgroundColor,
                    color: theme === 'dark' ? '#ffffff' : '#363841'
                }}
            >
                <ServiceInfoContainer color={service?.decoration.backgroundColor} theme={theme} url={service?.decoration.logoUrl} name={service?.name} />

                <div className={`w-full flex justify-center items-center text-[24px]`}>
                    {action?.description}
                </div>
                <div className={`flex justify-center items-center w-full h-full`}>
                    <div className={`flex justify-center items-center font-bold text-[36px] rounded-[50px] p-[27px] pl-[130px] pr-[130px]`}
                         style={{
                            backgroundColor: active ? service?.decoration?.backgroundColor : (theme === 'dark' ? 'white' : '#363841'),
                            color          : active ? (theme === 'dark' ? 'white' : '#363841') : service?.decoration?.backgroundColor,
                         }}
                         onMouseDown={() => { setActive(true) }}
                         onMouseLeave={() => { setActive(false) }}
                         onClick={handleClick}
                    >
                        Connection
                    </div>
                </div>
            </div>

            <Footer color={service?.decoration?.backgroundColor?.substring(1)} theme={theme} />
        </>
    )
}

export default IndexPage;