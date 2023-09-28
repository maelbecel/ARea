import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

"https://api.zertus.fr/area51/services"

interface LinkedAccountProps {
    url?: string
    islinked: boolean
    backgroundColor?: string
}

const LinkedAccount = ({url = "/Logo/Logo.svg", islinked, backgroundColor} : LinkedAccountProps) => {

    return (
        <div className="w-[100%] flex flex-row justify-between items-center">
            <Image className={`bg-[${backgroundColor}]`} src={url} width={50} height={50} alt={"Service Logo"}/>   
            <div className="font-bold text-[28px] text-[#00C2FF] pl-[10px]">
                { islinked ? (
                    <Link href="#">Unlike to your account</Link>
                ) : (
                    <Link href="#">Link to your account</Link>
                ) }
            </div>
        </div>
    );
}

const LinkedAccounts = () => {

    const [data, setData] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch("http://zertus.fr:8001/service", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                setData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, []);

    return (
        <div className="flex justify-center flex-col gap-y-10 mt-[80px]">
            <label className="text-[#363841] font-bold text-[42px]">Linked Account</label>
            <div className="flex flex-col items-center gap-y-7 bg-[]">
                {data?.data.map((item : any, index : any) => (
                    <LinkedAccount
                        key={index}
                        url={item.decoration.logoUrl}
                        islinked={item.islinked}
                        backgroundColor={item.decoration.backgroundColor}
                    />
                ))}
            </div>
        </div>
    );
}

export default LinkedAccounts;