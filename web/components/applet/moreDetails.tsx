import React, { useEffect, useState } from "react";
import LogoApplet from "./logo";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { GetActionInfo } from "../../utils/api/action/info";
import { GetReactionInfo } from "../../utils/api/reaction/info";

interface ButtonProps {
    isToggle: boolean;
    actionSlug: string;
    reactionSlug: string;
}

const MoreDetailsButton = ({isToggle, actionSlug, reactionSlug } : ButtonProps) => {

    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(false);
    const { token, setToken } = useToken();
    const [actionData, setActionData] = useState<any>();
    const [reactionData, setReactionData] = useState<any>();

    useEffect(() => {
        setIsButtonToggle(isToggle);
        fetchData();
        console.log("isCheked -> ", isToggle);
    }, []);

    const fetchData = async () => {
        try {
            const actionInfo = await GetActionInfo(token, actionSlug);
            setActionData(actionInfo);

            const reactionInfo = await GetReactionInfo(token, reactionSlug);
            setReactionData(reactionInfo);

            console.log("actionData -> ", actionInfo);
            console.log("reactionData -> ", reactionInfo);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {

        console.log("actionData -> ", actionData);
        console.log("reactionData -> ", reactionData);

    }, [actionData, reactionData]);

    const handleClick = () => {
        if (isButtonToggle == true) {
            setIsButtonToggle(false);
            console.log("disabled");
        } else {
            setIsButtonToggle(true);
            console.log("enabled");
        }
    }

    // TODO: eject code for each item in a component adding a fetch on data for each item to get the name and description
    return (
        <div>
            {isButtonToggle ? (
                <div className="flex flex-col items-center">
                    <div className="flex justify-between text-[#363841] font-bold text-[22px] w-[100%]">
                        <div className="w-[33%] flex items-center">
                            Action
                        </div>
                        <div className="flex items-center">
                            <div className="rounded-full w-[60px] h-[60px]">
                                {actionSlug && <LogoApplet slug={actionSlug.split('.')[0]} width={60} height={60} toogleBackground={true}/>}
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <div className="text-[#363841] font-bold text-[22px]">
                                {actionSlug}
                            </div>
                            <div className="text-[#363841] font text-[22px]">
                                {actionData?.description}
                            </div>
                        </div>
                    </div>
                    <div className="py-[8%] px-[2px] bg-[#36384138]">
                    </div>
                    <div className="flex justify-between w-[100%]">
                        <div className="w-[33%] flex items-center text-[#363841] font-bold text-[22px]">
                            REAction
                        </div>
                        <div className="flex items-center">
                            <div className="rounded-full w-[60px] h-[60px]">
                                {reactionSlug && <LogoApplet slug={reactionSlug.split('.')[0]} width={60} height={60} toogleBackground={true}/>}
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <div className="text-[#363841] font-bold text-[22px]">
                                {reactionSlug}
                            </div>
                            <div className="text-[#363841] font text-[22px]">
                                {reactionData?.description}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <button type="button" onClick={handleClick}>More Details</button>
        </div>
    );
}

export default MoreDetailsButton;