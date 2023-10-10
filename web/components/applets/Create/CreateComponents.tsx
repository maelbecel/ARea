// --- Components --- //
import Image from "next/image";
import { CreateButton, PlusIcon, Button } from "../../service/CreateService";

// --- Interface --- //
import { Card, defaultAction, defaultReaction } from "./interface";

// --- Function --- //
import { setReactions, getReaction } from "./Reaction";
import { getTheme } from "../../../utils/getTheme";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAction } from "./Action";

const CardComponent = ({ color, theme = "light", type, icon, description } : { color: string, theme?: string, type: string, icon: string, description: string }) => {
    if (type === "action")
        type = "Action";
    else if (type === "reaction")
        type = "Reaction";

    return (
        <>
            <div style={{
                    backgroundColor: color,
                    color          : (theme === "light" ? '#363841' : '#ffffff')
                }}
                className={`w-full flex rounded-[15px] flex-col`}
            >
                <div className='w-[95%] flex flex-row gap-[20px] justify-end pt-[8px]'>
                    <div className='font-bold text-[16px] underline'>Edit</div>
                    <div className='font-bold text-[16px] underline'>Delete</div>
                </div>
                <div className="flex flex-row justify-start gap-6 px-[40px] pb-[30px]">
                    <div className="font-extrabold text-[62px]">{type}</div>
                    <Image src={icon} width={100} height={100} alt='' />
                    <div className="font-bold text-[32px]">{description}</div>
                </div>
            </div>
        </>
    );
};

const reactionQuery = (array: Card[]) => {
    let newQuery: string = '';

    for (let i = 1; i < array.length; i++) {
        if (array[i].slug === defaultReaction.slug)
            newQuery += '0';
        else
            newQuery += '1';
    }
    return `${newQuery}`;
};

const actionQuery = (array: Card[]) => {
    if (array[0].slug === defaultAction.slug)
        return `0`;
    return `1`;
};

const getQuery = (array: Card[]) => {
    return `&card=${actionQuery(array)}${reactionQuery(array)}`
}

const CreateContainerComponent = () => {
    const router = useRouter();

    const [actionArray, setActionArray] = useState<Card[]>([defaultAction, defaultReaction]);
    const [cardID, setCardID] = useState<string>("");

    useEffect(() => {
        localStorage.removeItem('index');

        setCardID(router.query.card as string);

        const actionItem = localStorage.getItem("action") as string;
        const reactionItem: any = JSON.parse(localStorage.getItem("reaction") as string);

        const token = localStorage.getItem("token") as string;

        if (token === null)
            return;

        if (cardID === undefined || cardID === "" || cardID[0] === "0" || actionItem === null) {
            //localStorage.removeItem("action");

            setActionArray([defaultAction]);
        } else {
            getAction(setActionArray, actionArray.length, token, actionItem);
        }

        if (cardID === undefined || cardID === "") {
            //localStorage.removeItem("reaction");

            setActionArray((prevActionArray) => [...prevActionArray, defaultReaction]);
        } else {
            setReactions(setActionArray, token, cardID.slice(1), reactionItem);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router, cardID]);

    return (
        <div className={`min-h-screen flex justify-center items-center`}>
            <div className={`max-w-[50%] w-full flex justify-around items-center flex-col gap-[20px]`}>
                {actionArray && actionArray.map((service: Card, index: number) => {
                    return (
                        <>
                            {/*service.description = "Post a message to a channel"*/}
                            {service.slug === "" ? (
                                <CreateButton key={index} name={service.type} color={service.decoration.backgroundColor} callbackUrl={`/service/search?type=${service.type}${getQuery(actionArray)}`} index={index} /> 
                            ) : (
                                <CardComponent key={index} color={service.decoration.backgroundColor} theme={getTheme(service.decoration.backgroundColor)} type={service.type} icon={service.decoration.logoUrl} description={service.description} />
                            )}
                            <PlusIcon />
                        </>
                    )})}
                <Button name={"Continue"} />
            </div>
        </div>
    );
};

export default CreateContainerComponent;
