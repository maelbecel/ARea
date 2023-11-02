// --- Imports --- //
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme } from "../../../utils/getTheme";
import { GetService } from "../../../utils/api/service/service";

// --- Types --- //
import { ReactionApplet, defaultReactionApplet, defaultReactionsApplet } from "../Interface/interface";

// --- API --- //
import { GetReactionInfo } from "../../../utils/api/reaction/info";

// --- Component --- //
import ClickableText from "./LittleComponents/ClickableText";
import AddReactions from "./AddReactions";
import BottomComponentCard from "./LittleComponents/BottomComponentCard";
import EmptyComponent from "./LittleComponents/EmptyCompoennt";

const ReactionCardComponent = ({ reaction, setReactions, onEdit } : { reaction : ReactionApplet, setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, onEdit : () => void }) => {
    // --- Variables --- //
    const [background, setBackground] = useState<string>("#ffffff");
    const [logo      , setLogo]       = useState<string>("");
    const [name      , setName]       = useState<string>("");
    const [theme     , setTheme]      = useState<string>("light");

    /**
     * First frame and when the reaction changes,
     * get the background color, the color, the logo and the name of the reaction
     */
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
                <ClickableText text={"Edit"} onClick={() => { onEdit() }} />
                <ClickableText text={"Delete"}
                               onClick={() => { setReactions((prevState: ReactionApplet[]) => {
                                    const newState = [...prevState];

                                    newState.splice(newState.indexOf(reaction), 1);
                                    return newState;
                                })}}
                />
            </div>
            <BottomComponentCard type={"REAction"} name={name} logo={logo} />
        </div>
    )
};

interface ReactionComponentProps {
    reaction    : ReactionApplet,
    setReactions: Dispatch<SetStateAction<ReactionApplet[]>>,
    onClick     : () => void,
    onEdit      : () => void,
    index       : number
};

const ReactionComponent = ({ reaction, setReactions, index, onClick, onEdit } : ReactionComponentProps) => {
    /**
     * If the reaction is undefined or null or empty,
     * set the default reaction
     */
    if (reaction.reactionSlug === undefined) {
        setReactions((prevState: ReactionApplet[]) => {
            const newState = [...prevState];
            newState[index] = defaultReactionApplet;
            return newState;
        });
    }

    /**
     * If the reaction is empty,
     * return the empty reaction component
     */
    if (reaction.reactionSlug === "")
        return (<EmptyComponent type={"REAction"} onClick={() => { onClick() }} />);

    /**
     * Else return the reaction card component
     */
    return (<ReactionCardComponent reaction={reaction} setReactions={setReactions} onEdit={onEdit} />);
};

// --- Main Component --- //
interface ReactionsComponentProps {
    reactions   : ReactionApplet[],
    setReactions: Dispatch<SetStateAction<ReactionApplet[]>>,
    onClick     : () => void,
    onEdit      : () => void,
};

const ReactionsComponent = ({ reactions, setReactions, onClick, onEdit } : ReactionsComponentProps) => {
    /**
     * If the reactions is undefined or null or empty,
     * set the default reactions
     */
    if (reactions.length === 0)
        setReactions(defaultReactionsApplet);

    /**
     * Loop through the reactions and return the reaction component
     */
    return (
        <>
            {reactions && reactions.map((reaction: ReactionApplet, key: number) => {
                return (
                    <>
                        <ReactionComponent reaction={reaction}
                                           setReactions={setReactions}
                                           index={key}
                                           onClick={() => { onClick(); localStorage.setItem("index", key.toString()); }}
                                           onEdit={() => { onEdit(); localStorage.setItem("index", key.toString()); }}
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
