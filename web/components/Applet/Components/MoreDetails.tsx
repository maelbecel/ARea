// --- Imports --- //
import React, { useEffect, useState } from "react";

// --- Components --- //
import LogoApplet from "./Logo";
import DetailLogo from "./DetailLogo";

// --- API --- //
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { GetActionInfo } from "../../../utils/api/action/info";

// --- Interface --- //
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
    // --- Variables --- //
    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(false);
    const [actionData    , setActionData]     = useState<any>();

    // --- Providers --- //
    const { token } = useToken();

    // --- UseEffect --- //

    useEffect(() => {
        setIsButtonToggle(isToggle);
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Functions --- //

    const fetchData = async () => {
        const actionInfo = await GetActionInfo(token, actionSlug);

        setActionData(actionInfo);
    }

    const handleClick = () => {
        if (isButtonToggle == true) {
            setIsButtonToggle(false);
            return;
        }

        setIsButtonToggle(true);
    }

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
                            {reactions && Array.isArray(reactions) && reactions.map((reaction, index: number) => {
                                return (<DetailLogo key={index} slug={reaction.reactionSlug} />);
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