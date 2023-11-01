// --- Imports --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme } from "../../../../utils/getTheme";
import { GetService } from "../../../../utils/api/service/service";
import Image from "next/image";

// --- Types --- //
import { ActionApplet, defaultActionApplet } from "../interface";
import { GetActionInfo } from "../../../../utils/api/action/info";

// --- Component --- //
const EmptyActionComponent = ({ onClick } : { onClick : () => void }) => {
    return (
        <div className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none hover:brightness-110 bg-[#D9D9D9] text-[#363841]`} onClick={() => { onClick() }}>
            Action
        </div>
    )
};

const ActionCardComponent = ({ action, setAction, onEdit } : { action : ActionApplet, setAction: Dispatch<SetStateAction<ActionApplet>>, onEdit : () => void }) => {
    const [background, setBackground] = useState<string>("#ffffff");
    const [logo      , setLogo]       = useState<string>("");
    const [name      , setName]       = useState<string>("");
    const [theme     , setTheme]      = useState<string>("light");

    useEffect(() => {
        if (action === null || action.actionSlug === null || action.actionSlug === "" || action.actionSlug === undefined)
            return;

        const getBackground = async () => {
            const service = action.actionSlug.split(".")[0];
            const token   = localStorage.getItem("token") as string;

            const serviceInfo = await GetService(token, service);
            const actionInfo  = await GetActionInfo(token, action.actionSlug);

            if (serviceInfo === null || actionInfo === null)
                return;
            setBackground(serviceInfo.decoration.backgroundColor);
            setLogo(serviceInfo.decoration.logoUrl);
            setTheme(getTheme(serviceInfo.decoration.backgroundColor));
            setName(actionInfo.description);
        };

        getBackground();
    }, [action]);

    return (
        <div style={{
                backgroundColor: background,
                color          : (theme === "light" ? '#363841' : '#ffffff')
             }}
             className={`w-full flex rounded-[15px] flex-col hover:brightness-110 cursor-pointer`}
        >
            <div className='w-[95%] flex flex-row gap-[20px] justify-end pt-[5px] sm:pt-[8px]'>
                <div className='font-bold text-[12px] sm:text-[16px] underline' onClick={() => { onEdit() }}>
                    Edit
                </div>
                <div className='font-bold text-[12px] sm:text-[16px] underline' onClick={() => { setAction(defaultActionApplet) }}>
                    Delete
                </div>
            </div>
            <div className="flex flex-row justify-start gap-6 px-[5px] md:px-[40px] pb-[5px] md:pb-[30px] items-center">
                <div className="font-extrabold text-[24px] sm:text-[48px] lg:text-[62px]">
                    Action
                </div>
                {logo !== '' && <Image src={logo} width={100} height={100} alt='' />}
                <div className="font-bold text-[18px] sm:text-[24px] lg:text-[32px]">
                    {name}
                </div>
            </div>
        </div>
    )
};

const ActionComponent = ({ action, setAction, onClick, onEdit } : { action : ActionApplet, setAction: Dispatch<SetStateAction<ActionApplet>>, onClick : () => void, onEdit : () => void }) => {
    if (action.actionSlug === undefined)
        setAction(defaultActionApplet);
    if (action.actionSlug === "")
        return (<EmptyActionComponent onClick={() => { onClick(); localStorage.removeItem("index"); }} />);
    return (<ActionCardComponent action={action} setAction={setAction} onEdit={onEdit} />);
};

export default ActionComponent;
