// --- Librairies import --- //
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// --- Components import --- //
import NavBar, { LeftSection, RightSection, NavBarFuncButton, NavBarNavigateButtonIcon, MiddleSection, Title } from "../../components/navbar";
import GetActionService from "../../components/service/GetActionService";
import Footer from "../../components/footer";
import { getTheme } from "../../utils/getTheme";
import { ServiceInfoContainer } from "../../components/service/template";

const IndexPage: NextPage = () => {
    const router = useRouter();

    const [service, setService] = useState<any | undefined>(undefined);
    const [actions, setActions] = useState<any[]>([]);
    const [slug   , setSlug]    = useState<string>("");
    const [token  , setToken]   = useState<string>("");
    const [type   , setType]    = useState<string>("");

    useEffect(() => {
        const checkIfNotLogged = async () => {
            setToken(localStorage.getItem("token") as string);

            if (token === null)
                router.push("/");
        }

        const getQueryValue = async () => {
            setSlug(router.query.name as string);
            setType(router.query.type as string);

            if (slug === undefined)
                router.push("/");
        }

        checkIfNotLogged();
        getQueryValue();
    }, [router, token, slug]);

    useEffect(() => {
        const getService = async (slug: string) => {
            if (slug?.length === 0 || token?.length === 0)
                return;

            try {
                const response = await fetch(`http://zertus.fr:8001/service/${slug}`, {

                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                });

                const data = await response.json();

                setService(data?.data);

                if (type === undefined) {
                    if (data?.data && data?.data.actions && data?.data.reactions) {
                        const actionsWithType = data.data.actions.map((action: any) => ({
                            ...action,
                            type: "action",
                        }));
                        const reactionsWithType = data.data.reactions.map((reaction: any) => ({
                            ...reaction,
                            type: "reaction",
                        }));

                        setActions([...actionsWithType, ...reactionsWithType]);
                    }
                } else if (type === "action") {
                    if (data?.data && data?.data.actions) {
                        const actionsWithType = data.data.actions.map((action: any) => ({
                            ...action,
                            type: "action",
                        }));

                        setActions([...actionsWithType]);
                    }
                }  else if (type === "reaction") {
                    if (data?.data && data?.data.reactions) {
                        const reactionsWithType = data.data.reactions.map((reaction: any) => ({
                            ...reaction,
                            type: "reaction",
                        }));

                        setActions([...reactionsWithType])
                    }
                }
            } catch (error) {
                router.push("/");
            }
        }

        getService(slug);
    }, [slug, token, router, type]);

    const theme = getTheme(service?.decoration?.backgroundColor);

    return (
        <>
            {service && <NavBar color={service?.decoration?.backgroundColor?.substring(1)} theme={theme}>
                <LeftSection>
                    <NavBarFuncButton text="Back" color={service?.decoration?.backgroundColor?.substring(1)} func={() => router.back()} theme={theme} />
                </LeftSection>
                <MiddleSection>
                    <Title text="Choose an action" theme={theme} />
                </MiddleSection>
                <RightSection>
                    <NavBarNavigateButtonIcon href="/help">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
                        </svg>
                    </NavBarNavigateButtonIcon>
                </RightSection>
            </NavBar>}

            <div className={`min-h-screen flex justify-start items-center flex-col`}>
                <ServiceInfoContainer color={service?.decoration.backgroundColor} theme={theme} url={service?.decoration.logoUrl} name={service?.name} />

                <div className={`p-[55px]`}>
                    <GetActionService slug={slug} actions={actions} color={service?.decoration?.backgroundColor} theme={theme} />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default IndexPage;
