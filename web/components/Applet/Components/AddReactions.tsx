// --- Imports --- //
import Image from "next/image";

// --- Types --- //
import { ReactionApplet, defaultReactionApplet } from "../Interface/interface";
import { Dispatch, SetStateAction } from "react";

// --- Component --- //

/**
 * Circle with a plus inside component that execute a callback when is clicked
 *
 * @param  setReactions  set the reactions of the applet
 * @param  index         index of the reaction to add
 */
const AddReactions = ({ setReactions, index } : { setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, index: number }) => {
    const addNewServiceAtIndex = (index: number) => {
        setReactions((prevReactions) => {
            const newArray = [...prevReactions];
    
            if (index >= 0 && index < prevReactions.length)
                newArray.splice(index, 0, defaultReactionApplet);
            else
                newArray.push(defaultReactionApplet);
            return newArray;
        });
    }

    return (
        <div className="w-[40px] h-[40px]" onClick={() => { addNewServiceAtIndex(index); }}>
            <Image src={"/Icons/PlusButton.svg" } width={40} height={40} alt={""} />
        </div>
    );
};

export default AddReactions;
