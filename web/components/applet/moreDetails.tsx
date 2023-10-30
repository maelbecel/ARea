import React, { useEffect, useState } from "react";
import LogoApplet from "./logo";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { GetActionInfo } from "../../utils/api/action/info";

import DetailLogo from "./detailLogo";

interface reactionDataProps {
    name: string;
    label: string;
    value: string;
    description: string;
}

interface ReactionProps {
    reactionSlug: string;
    reactionData: reactionDataProps[];
}

interface ButtonProps {
    isToggle: boolean;
    actionSlug: string;
    reactions: ReactionProps[];
}

const MoreDetailsButton = ({isToggle, actionSlug, reactions } : ButtonProps) => {

    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(false);
    const { token, setToken } = useToken();
    const [actionData, setActionData] = useState<any>();
    const [reactionData, setReactionData] = useState<any>();

    useEffect(() => {
        setIsButtonToggle(isToggle);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const actionInfo = await GetActionInfo(token, actionSlug);
            setActionData(actionInfo);

            // const reactionInfo = await GetReactionInfo(token, reactionSlug);
            // setReactionData(reactionInfo);

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
                    <div className="flex flex:row justify-start sm:justify-between text-[#363841] font-bold text-[22px] w-[100%]">
                        <div className="hidden sm:visible w-[33%] sm:flex items-center">
                            Action
                        </div>
                        <div className="flex items-center pr-[10%] sm:pr-[0%]">
                            <div className="rounded-full w-[60px] h-[60px]">
                                {actionSlug && <LogoApplet slug={actionSlug.split('.')[0]} width={60} height={60} toogleBackground={true}/>}
                            </div>
                        </div>
                        <div className="sm:w-[33%] w-[100%]">
                            <div className="text-[#363841] font-bold text-[18px] sm:text-[22px]">
                                {actionData?.name}
                            </div>
                            <div className="text-[#363841] font-medium text-[18px] sm:text-[22px]">
                                {actionData?.description}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[100%]">
                        <div className="flex flex-col">
                            {reactions && Array.isArray(reactions) && reactions.map((reaction, key) => {
                                console.log("reaction -> ", reaction);
                                return (
                                    <DetailLogo slug={reaction.reactionSlug} key={key} />
                                );
                            })}
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