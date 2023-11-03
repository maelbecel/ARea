// --- Imports --- //
import React from "react";
import { useEffect, useState } from "react";

// --- API --- //
import { GetReactionInfo } from "../../../utils/api/reaction/info";

// --- Components --- //
import LogoApplet from "./Logo";

// --- Interface ---//
interface reactionInfoProps {
    name: string;
    description: string;
    slug: string;
}

const DetailLogo = ({ slug } : { slug: string }) => {
    // --- Variables --- //
    const [token       , setToken]        = useState<string>('');
    const [reactionInfo, setReactionInfo] = useState<reactionInfoProps>();

    // --- UseEffect --- //

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);

        if (token) {
            const reactionInfo = async (token: string) => {
                const data = await GetReactionInfo(token, slug);
                setReactionInfo(data);
            }

            reactionInfo(token);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div>
            <div className="flex justify-start sm:justify-center pl-[28px] sm:pl-[0px]">
                <div className="w-[6px] h-[60px] bg-[#0000001e]">
                </div>
            </div>
            <div className="flex flex-row justify-start sm:justify-between items-center">
                <div className="hidden w-[33%] sm:flex items-center text-[#363841] font-bold text-[22px]">
                    REAction
                </div>
                <div className="flex items-center pr-[10%] sm:pr-[0%]">
                    <div className="rounded-full w-[60px] h-[60px]">
                        {reactionInfo?.slug && <LogoApplet slug={reactionInfo?.slug.split('.')[0]} width={60} height={60} toogleBackground={true}/>}
                    </div>
                </div>
                <div className="sm:w-[33%] w-[100%]">
                    <div className="text-[#363841] font-bold text-[18px] sm:text-[22px]">
                        {reactionInfo?.name}
                    </div>
                    <div className="text-[#363841] font-medium text-[18px] sm:text-[22px]">
                        {reactionInfo?.description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailLogo;
