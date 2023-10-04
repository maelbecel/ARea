// --- Librairies import --- //
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getTheme } from "../../utils/getTheme";

// --- Components --- //
import NavBar, { LeftSection, MiddleSection, NavBarFuncButton, NavBarNavigateButtonIcon, RightSection, Title } from "../../components/navbar";
import Footer from "../../components/footer";
import { CreateButton, PlusIcon, Button } from "../../components/service/CreateService";

interface Card {
    type: string;
    decoration: {
        logoUrl: string;
        backgroundColor: string;
    };
    slug: string;
    description: string;
};

const ActionCardComponent = ({ color, theme = "light", type, icon, description } : { color: string, theme?: string, type: string, icon: string, description: string }) => {
    if (type === "action")
        type = "Action";
    else if (type === "reaction")
        type = "Reaction";

    return (
        <>
            <div style={{
                    backgroundColor: color,
                    color          : (theme === "light" ? '#363841' : '#ffffff')
                }}
                className={`w-full flex rounded-[15px] flex-col`}
            >
                <div className='w-[95%] flex flex-row gap-[20px] justify-end pt-[8px]'>
                    <div className='font-bold text-[16px] underline'>Edit</div>
                    <div className='font-bold text-[16px] underline'>Delete</div>
                </div>
                <div className="flex flex-row justify-start gap-6 px-[40px] pb-[30px]">
                    <div className="font-extrabold text-[62px]">{type}</div>
                    <Image src={icon} width={100} height={100} alt='' />
                    <div className="font-bold text-[32px]">{description}</div>
                </div>
            </div>
        </>
    );
};

const IndexPage: NextPage = () => {
    const router = useRouter();

    const [actionArray, setActionArray] = useState<Card[]>([{
            type: "action",
            decoration: {
                logoUrl: "",
                backgroundColor: "#D9D9D9"
            },
            slug: "",
            description: ""
        },
        {
            type: "reaction",
            decoration: {
                logoUrl: "",
                backgroundColor: "#363841"
            },
            slug: "",
            description: ""
    }]);

    const getAction = async (token: string) => {
        const newAction : Card = {
            type: "action",
            decoration: {
                logoUrl: "",
                backgroundColor: "#D9D9D9"
            },
            slug: localStorage.getItem("action") as string,
            description: ""
        };
        const slug = newAction.slug?.split(".")[0] as string;

        try {
            const response = await fetch(`http://zertus.fr:8001/service/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await response.json();

            newAction.decoration.logoUrl         = data?.data?.decoration?.logoUrl         as string;
            newAction.decoration.backgroundColor = data?.data?.decoration?.backgroundColor as string;
        } catch (error) {
            return;
        }

        try {
            const response = await fetch(`http://zertus.fr:8001/action/${slug}/${newAction.slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            });

            const data = await response.json();

            newAction.description = data?.data?.description as string;
        } catch (error) {
            return;
        }

        if (actionArray.length === 0) {
            setActionArray([newAction]);
            return;
        }

        setActionArray((prevActionArray) => [newAction, ...prevActionArray.slice(1)]);
    };

    const getReaction = async (token: string, indexToReplace: number) => {
        const newReaction : Card = {
            type: "reaction",
            decoration: {
                logoUrl: "",
                backgroundColor: "#363841"
            },
            slug: localStorage.getItem("reaction") as string,
            description: ""
        };
        const slug = newReaction.slug?.split(".")[0] as string;

        if (newReaction.slug === null || slug === null)
            return;

        try {
            const response = await fetch(`http://zertus.fr:8001/service/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            });
            const data = await response.json();

            newReaction.decoration.logoUrl         = data?.data?.decoration?.logoUrl         as string;
            newReaction.decoration.backgroundColor = data?.data?.decoration?.backgroundColor as string;
        } catch (error) {
            return;
        }

        try {
            const response = await fetch(`http://zertus.fr:8001/reaction/${slug}/${newReaction.slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            });
            const data = await response.json();

            newReaction.description = data?.data?.description as string;
        } catch (error) {
            return;
        }

        setActionArray((prevActionArray) => 
            prevActionArray.map((action, index) => 
                index === indexToReplace ? newReaction : action
            )
        );
    };

    useEffect(() => {
        const token = localStorage.getItem("token") as string;

        if (token === null)
            return;
        if (localStorage.getItem("action") as string !== null)
            getAction(token);
        if (localStorage.getItem("reaction") as string !== null)
            getReaction(token, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <NavBar>
                <LeftSection>
                    <NavBarFuncButton text="Back" func={() => router.back()} />
                </LeftSection>
                <MiddleSection>
                    <Title text="Choose an action" />
                </MiddleSection>
                <RightSection>
                    <NavBarNavigateButtonIcon href="/help">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={'#363841'} />
                        </svg>
                    </NavBarNavigateButtonIcon>
                </RightSection>
            </NavBar>

            <div className={`min-h-screen flex justify-center items-center`}>
                <div className={`max-w-[50%] w-full flex justify-around items-center flex-col gap-[20px]`}>
                    {actionArray && actionArray.map((action: Card, index) => (
                        <>
                            {action.description = "Post a message to a channel"}
                            {action.slug === "" ? (
                                <CreateButton key={index} name={action.type} color={action.decoration.backgroundColor} callbackUrl={`/service/search?type=${action.type}`} /> 
                            ) : (
                                <ActionCardComponent key={index} color={action.decoration.backgroundColor} theme={getTheme(action.decoration.backgroundColor)} type={action.type} icon={action.decoration.logoUrl} description={action.description} />
                            )}
                            <PlusIcon />
                        </>
                    ))}
                    <Button name={"Continue"} />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default IndexPage;
