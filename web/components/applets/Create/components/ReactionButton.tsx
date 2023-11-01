// --- Imports --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme } from "../../../../utils/getTheme";
import { GetService } from "../../../../utils/api/service/service";
import Image from "next/image";

// --- Types --- //
import { ReactionApplet, defaultReactionApplet, defaultReactionsApplet } from "../interface";
import { GetReactionInfo } from "../../../../utils/api/reaction/info";
import { CreateButton, AddReactions } from "./CreateButton";

// --- Component --- //
const EmptyReactionComponent = ({ onClick } : { onClick : () => void }) => {
    return (
        <div className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none hover:brightness-110 bg-[#363841] text-[#ffffff]`} onClick={() => { onClick() }}>
            REAction
        </div>
    )
};

const ReactionCardComponent = ({ reaction, setReactions, onEdit } : { reaction : ReactionApplet, setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, onEdit : () => void }) => {
    const [background, setBackground] = useState<string>("#ffffff");
    const [logo      , setLogo]       = useState<string>("");
    const [name      , setName]       = useState<string>("");
    const [theme     , setTheme]      = useState<string>("light");

    useEffect(() => {
        if (reaction.reactionSlug === null)
            return;

        const getBackground = async () => {
            const service = reaction.reactionSlug.split(".")[0];
            const token   = localStorage.getItem("token") as string;

            const serviceInfo = await GetService(token, service);
            const reactionInfo  = await GetReactionInfo(token, reaction.reactionSlug);

            if (serviceInfo === null || reactionInfo === null)
                return;
            setBackground(serviceInfo.decoration.backgroundColor);
            setLogo(serviceInfo.decoration.logoUrl);
            setTheme(getTheme(serviceInfo.decoration.backgroundColor));
            setName(reactionInfo.description);
        };

        getBackground();
    }, [reaction]);

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
                <div className='font-bold text-[12px] sm:text-[16px] underline'
                     onClick={() => { setReactions((prevState: ReactionApplet[]) => {
                        const newState = [...prevState];
                        newState.splice(newState.indexOf(reaction), 1);
                        return newState;
                     })}}
                >
                    Delete
                </div>
            </div>
            <div className="flex flex-row justify-start gap-6 px-[5px] md:px-[40px] pb-[5px] md:pb-[30px] items-center">
                <div className="font-extrabold text-[24px] sm:text-[48px] lg:text-[62px]">
                    REAction
                </div>
                {logo !== '' && <Image src={logo} width={100} height={100} alt='' />}
                <div className="font-bold text-[18px] sm:text-[24px] lg:text-[32px]">
                    {name}
                </div>
            </div>
        </div>
    )
};

const ReactionComponent = ({ reaction, setReactions, index, onClick, onEdit } : { reaction : ReactionApplet, setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, index: number, onClick : () => void, onEdit : () => void }) => {
    if (reaction.reactionSlug === undefined) {
        setReactions((prevState: ReactionApplet[]) => {
            const newState = [...prevState];
            newState[index] = defaultReactionApplet;
            return newState;
        });
    }

    if (reaction.reactionSlug === "")
        return (<EmptyReactionComponent onClick={() => { onClick() }} />);
    return (<ReactionCardComponent reaction={reaction} setReactions={setReactions} onEdit={onEdit} />);
};

const ReactionsComponent = ({ reactions, setReactions, onClick, onEdit } : { reactions : ReactionApplet[], setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, onClick : () => void, onEdit : () => void }) => {
    if (reactions.length === 0)
        setReactions(defaultReactionsApplet);

    return (
        <>
            {reactions && reactions.map((reaction: ReactionApplet, key: number) => {
                return (
                    <>
                        <ReactionComponent reaction={reaction}
                                           setReactions={setReactions}
                                           index={key}
                                           onClick={() => { onClick(); localStorage.setItem("index", key.toString()); }}
                                           onEdit={() => { onEdit() }}
                                           key={key}
                        />
                        {reactions.length <= 8 && <AddReactions setReactions={setReactions} index={key + 1} />}
                    </>
                )
            })}
        </>
    )
};

export default ReactionsComponent;
