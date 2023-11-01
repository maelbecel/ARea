import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useServices } from "../../utils/api/service/Providers/ServiceProvider";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useRouter } from "next/router";
import { GetServices } from "../../utils/api/service/service";
import ModalError from "../modalErrorNotif";
import { DeleteOAuth2Token, OAuth2GetToken } from "../../utils/api/service/oauth2";

interface LinkedAccountProps {
    slug: string
    url?: string
    token: string
    urlImg?: string
    islinked: boolean
    backgroundColor?: string
}

interface LinkedAccountsData {
    linkedAccountsDataArray: Array<any>;
}

interface linkedAccountData {
    url: string,
    islinked: boolean,
    hasAuthentification: boolean
}

const LinkedAccount = ({slug, url = "#", urlImg = "/Logo/Logo.svg", islinked, backgroundColor, token} : LinkedAccountProps) => {
    const [oauth2Token, setOauth2Token] = useState<string>("");
    const bgColor = backgroundColor ?? "#363841";
    const [islinkedState, setIsLinked] = useState<boolean>(islinked);
    const [modalErrorIsOpen, setIsErrorOpen] = useState(false);

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const fetchToken = async () => {
        const dataFetch = async () => {
            const status = await OAuth2GetToken(token, slug)

            if (status === null)
                return;

            setOauth2Token(status);
        };
        dataFetch();
    }

    const requestoauth2 = async () => {
        if (!islinked) {
            await fetchToken();
            return;
        } else {
            console.log("not linked need a oauth2 suppression");
        }
    }

    const deleteRequestoauth2 = async () => {
        if (islinked) {
            const res = await DeleteOAuth2Token(token, slug);

            (res === false) ? openModalError() : setIsLinked(false);
        }
    }

    useEffect(() => {
        if (!oauth2Token || oauth2Token == "")
            return;

        window.location.href = `${url}&authToken=${oauth2Token}`;
    }), [oauth2Token];

    return (
        <div className="w-[100%] flex flex-col">
            <div className="w-[100%] flex flex-col lg:flex-row justify-between items-center">
                <div style={{backgroundColor : bgColor}} className="flex justify-center rounded-lg w-[50px] h-[50px] p-[8px] text-center">
                    <Image src={urlImg} width={50} height={50} alt={"Logo"}/>   
                </div>
                <div className="flex justify-center text-center font-bold text-[28px] text-[#00C2FF]">
                    { islinkedState ? (
                        <a onClick={() => deleteRequestoauth2()} className="cursor-pointer">Unlink your account</a>
                    ) : (
                        <a onClick={() => requestoauth2()} className="cursor-pointer">Link your account</a>
                    ) }
                </div>
            </div>
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </div>
    );
}

const LinkedAccounts = ({linkedAccountsDataArray} : LinkedAccountsData) => {
    const [linkedAccountsData, setLinkedAccountsData] = useState<linkedAccountData[] | undefined>();
    const { services, setServices } = useServices();
    const { token, setToken } = useToken();

    const route = useRouter();

    useEffect(() => {
        if (services.length !== 0)
            return;

        if (token === "") {
            const tokenStore = localStorage.getItem("token");

            if (tokenStore === null) {
                route.push("/");
                return;
            }
            setToken(tokenStore);
        }

        const getServices = async (token: string) => {
            setServices(await GetServices(token));
        };

        getServices(token);
    }, [services, token, route, setToken, setServices]);

    useEffect(() => {
        if (services.length === 0 || token === "")
            return;
        const tempArray : Array<linkedAccountData> = [];

        if (linkedAccountsDataArray !== undefined) {
            for (const element of services) {
                const tempElement : linkedAccountData = { url: "", islinked: true, hasAuthentification: element.hasAuthentification };

                if (linkedAccountsDataArray.includes(element.slug)) {
                    tempElement.islinked = true;
                    tempElement.url = "#";
                } else {
                    tempElement.islinked = false;
                    tempElement.url = `${localStorage.getItem("address") as string}/service/${element.slug}/oauth2?redirecturi=http://localhost:8081/profile"&authToken=${token}`;
                }
                tempArray.push(tempElement);
            }
            setLinkedAccountsData(tempArray);
        }
    }, [services, token, linkedAccountsDataArray]);

    return (
        <div className="flex justify-center flex-col gap-y-10 pb-[10%]">
            <div className="w-[100%] flex justify-center lg:justify-start">
                <label className="text-[#363841] font-bold text-[42px] sm:text-center">Linked Account</label>
            </div>
            <div className="flex flex-col items-center gap-y-7">
                {linkedAccountsData && services.map((item : any, index : any) => {
                    if (item.hasAuthentification) {
                        return (
                                <LinkedAccount
                                key={index} 
                                slug={item.slug}
                                token={token}
                                urlImg={item.decoration.logoUrl}
                                url={linkedAccountsData[index].url}
                                islinked={linkedAccountsData[index].islinked}
                                backgroundColor={item.decoration.backgroundColor}
                                />
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default LinkedAccounts;