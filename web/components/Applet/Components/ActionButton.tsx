// --- Imports --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// --- Types --- //
import { ActionApplet, defaultActionApplet } from "../Interface/interface";

// --- API --- //
import { GetActionInfo } from "../../../utils/api/action/info";
import ClickableText from "./LittleComponents/ClickableText";
import { getTheme } from "../../../utils/getTheme";
import { GetService } from "../../../utils/api/service/service";

// --- Component --- //
import BottomComponentCard from "./LittleComponents/BottomComponentCard";
import EmptyComponent from "./LittleComponents/EmptyCompoennt";

interface ActionCardComponentProps {
    action   : ActionApplet,
    setAction: Dispatch<SetStateAction<ActionApplet>>,
    onEdit   : () => void
};

const ActionCardComponent = ({ action, setAction, onEdit } : ActionCardComponentProps) => {
    // --- Variables --- //
    const [background, setBackground] = useState<string>("#ffffff");
    const [logo      , setLogo]       = useState<string>("");
    const [name      , setName]       = useState<string>("");
    const [theme     , setTheme]      = useState<string>("light");

    /**
     * First frame and when action is updated,
     * Initialize the background, logo, theme and name of the action
     */
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
                <ClickableText text={"Edit"}   onClick={() => { onEdit() }} />
                <ClickableText text={"Delete"} onClick={() => { setAction(defaultActionApplet) }} />
            </div>
            <BottomComponentCard type={"Action"} name={name} logo={logo} />
        </div>
    )
};

// --- Main Component --- //
interface ActionComponentProps {
    action   : ActionApplet,
    setAction: Dispatch<SetStateAction<ActionApplet>>,
    onClick  : () => void,
    onEdit   : () => void
};

const ActionComponent = ({ action, setAction, onClick, onEdit } : ActionComponentProps) => {
    /**
     * If the action is undefined or null or empty,
     * set the default action
     */
    if (action.actionSlug === undefined)
        setAction(defaultActionApplet);

    /**
     * If the action is empty,
     * return the empty action component
     */
    if (action.actionSlug === "")
        return (<EmptyComponent type={"Action"} onClick={() => { onClick(); localStorage.removeItem("index"); }} />);

    /**
     * Else return the action card component
     */
    return (<ActionCardComponent action={action} setAction={setAction} onEdit={onEdit} />);
};

export default ActionComponent;
