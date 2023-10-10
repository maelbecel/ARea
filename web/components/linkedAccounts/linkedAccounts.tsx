import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LinkedAccountProps {
    slug: string
    url?: string
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
}

interface OAuth2Token {
    data: string;
}

const LinkedAccount = ({slug, url = "#", urlImg = "/Logo/Logo.svg", islinked, backgroundColor} : LinkedAccountProps) => {

    const [oauth2Token, setOauth2Token] = useState<OAuth2Token>();
    const bgColor = backgroundColor ?? "#363841";

    const fetchToken = async () => {
        const token = localStorage.getItem("token");
        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch(`https://area51.zertus.fr/service/${slug}/oauth2/token`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                setOauth2Token(data);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }

    const requestoauth2 = async () => {
        if (!islinked) {
            await fetchToken();
        } else {
            console.log("not linked need a oauth2 suppression");
        }
    }

    useEffect(() => {
        if (!oauth2Token || !oauth2Token?.data || oauth2Token?.data == "") {
            return;
        } else {
            window.location.href = `${url}&authToken=${oauth2Token.data}`;
        }
    }), [oauth2Token];

    return (
        <div className="w-[100%] flex flex-row justify-between items-center">
            <div style={{backgroundColor : bgColor}} className="rounded-lg w-[50px] h-[50px] p-[8px]">
                <Image src={urlImg} width={50} height={50} alt={"Logo"}/>   
            </div>
            <div className="font-bold text-[28px] text-[#00C2FF] pl-[10px]">
                { islinked ? (
                    <a onClick={() => requestoauth2()} className="cursor-pointer">Unlike your account</a>
                ) : (
                    <a onClick={() => requestoauth2()} className="cursor-pointer">Link your account</a>
                ) }
            </div>
        </div>
    );
}

const LinkedAccounts = ({linkedAccountsDataArray} : LinkedAccountsData) => {

    const [data, setData] = useState<any | undefined>();
    const [linkedAccountsData, setLinkedAccountsData] = useState<linkedAccountData[] | undefined>();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch("https://area51.zertus.fr/service", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                setData(data);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, []);

    useEffect(() => {

        const tempArray : Array<linkedAccountData> = [];

        if (data != undefined && linkedAccountsDataArray != undefined) {
            for (const element of data?.data) {
                console.log(element.slug);
                const tempElement : linkedAccountData = {
                    url: "",
                    islinked: true,
                };
                if (linkedAccountsDataArray.includes(element.slug)) {
                    tempElement.islinked = true;
                    tempElement.url = "#";
                } else {
                    tempElement.islinked = false;
                    tempElement.url = "https://area51.zertus.fr/service/" + element.slug + "/oauth2" + "?redirecturi=http://localhost:8081/profile" + "&authToken=" + localStorage.getItem("token");
                }
                tempArray.push(tempElement);
            }
            setLinkedAccountsData(tempArray);
        }
    }, [data]);

    useEffect(() => {
        console.log(linkedAccountsData);
    }), [linkedAccountsData];

    return (
        <div className="flex justify-center flex-col gap-y-10 pb-[10%]">
            <label className="text-[#363841] font-bold text-[42px]">Linked Account</label>
            <div className="flex flex-col items-center gap-y-7">
                {linkedAccountsData && data?.data.map((item : any, index : any) => {
                    console.log(linkedAccountsData);
                    console.log(linkedAccountsData[index].islinked);
                    console.log("slug " + item.slug + " " + typeof(item.slug));
                    return (
                        <LinkedAccount
                            key={index} 
                            slug={item.slug}
                            urlImg={item.decoration.logoUrl}
                            url={linkedAccountsData[index].url}
                            islinked={linkedAccountsData[index].islinked}
                            backgroundColor={item.decoration.backgroundColor}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default LinkedAccounts;