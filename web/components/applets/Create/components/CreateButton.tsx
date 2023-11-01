import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ReactionApplet, defaultReactionApplet } from "../interface";

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

const CreateButton = ({ name, callback } : { name: string, callback: () => void }) => {
    return (
        <div className={`w-[50%] flex justify-center items-center rounded-[50px] text-[36px] font-bold py-[27px] select-none active:bg-white bg-[#363841] text-white active:text-[#363841]`}
            onClick={() => {callback()}}
        >
            {name}
        </div>
    );
};

export { AddReactions, CreateButton };
