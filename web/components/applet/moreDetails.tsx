import React, { useEffect, useState } from "react";
import LogoApplet from "./logo";

interface ButtonProps {
    isToggle: boolean;
    actionSlug: string;
    reactionSlug: string;
}

const MoreDetailsButton = ({isToggle, actionSlug, reactionSlug, } : ButtonProps) => {

    const [isButtonToggle, setIsButtonToggle] = useState<boolean>(false);

    useEffect(() => {
        setIsButtonToggle(isToggle);
        console.log("isCheked -> ", isToggle);
    }, []);

    const handleClick = () => {
        if (isButtonToggle == true) {
            setIsButtonToggle(false);
            console.log("disabled");
        } else {
            setIsButtonToggle(true);
            console.log("enabled");
        }
    }

    // partial place holder
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
                                {actionSlug && <LogoApplet slug={actionSlug} width={60} height={60} toogleBackground={true}/>}
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <div className="text-[#363841] font-bold text-[22px]">
                                Name of Action
                            </div>
                            <div className="text-[#363841] font text-[22px]">
                                Description of Action
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
                                {reactionSlug && <LogoApplet slug={reactionSlug} width={60} height={60} toogleBackground={true}/>}
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <div className="text-[#363841] font-bold text-[22px]">
                                Name of Reaction
                            </div>
                            <div className="text-[#363841] font text-[22px]">
                                Description of Reaction
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