import React, { useEffect, useState } from "react";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { UpdateAppletWithID } from "../../utils/api/applet/applet";

interface ToggleSwitchProps {
    isCheked: boolean;
    isDisable: boolean;
    yesLabel: string;
    noLabel: string;
    bgColor: string;
    id: string;
}

const ToggleSwitch = ({ isCheked, isDisable, yesLabel, noLabel, bgColor, id } : ToggleSwitchProps) => {
    
    const [isChekedState, setIsChecked] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#ffffff");
    const { token, setToken } = useToken();

    useEffect(() => {
        setIsChecked(isCheked);
        setColor(bgColor);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSwitchChange = () => {

        if (isChekedState == true) {
            console.log("disabled");
            const value = {enabled: false};
            setIsChecked(false);
            UpdateAppletWithID(token, id, value);
        } else {
            console.log("enabled");
            const value = {enabled: true};
            setIsChecked(true);
            UpdateAppletWithID(token, id, value);
        }
    }
  
    return (
        <div className="flex justify-center w-[100%] h-[100%] duration-500">
            <div className="flex justify-center duration-500 w-[100%] h-[100%]">
                <button
                    onClick={handleSwitchChange}
                    className="sm:w-[40%] lg:w-[25%] w-[80%] h-[75px] relative"
                    disabled={isDisable}
                >
                    <div style={{ backgroundColor: color }} className={`h-[100%] w-[100%] rounded-[50px] duration-500 p-[4px] flex items-center`}>
                        <div className="flex-grow text-white font-bold text-center text-[36px]">
                            {isChekedState ? yesLabel : noLabel}
                        </div>
                        <div
                            className={`h-[64px] w-[64px] bg-gray-400 rounded-full absolute top-[50%] left-0 transform -translate-y-1/2 duration-500`}
                            style={{ left: isChekedState ? 'calc(100% - 68px)' : '4px' }}
                        ></div>
                    </div>
                </button>
            </div>
        </div>

  );
};

export default ToggleSwitch;
