// --- Interface --- //
import { Card, defaultReaction } from "./interface";
import { Dispatch, SetStateAction } from "react";

export const getReaction = async (setArray: Dispatch<SetStateAction<Card[]>>, token: string, reactionItem: any, index: number) => {
    let newReaction : Card = defaultReaction as Card;

    newReaction.slug = reactionItem[index - 1];

    if (reactionItem[index - 1] === undefined || newReaction.slug === "0") {
        setArray((prevActionArray) => [...prevActionArray, defaultReaction]);
        return;
    }

    const slug = newReaction.slug?.split(".")[0] as string;

    try {
        const response = await fetch(`http://zertus.fr:8001/service/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });
        const data = await response.json();

        newReaction.decoration.logoUrl         = data?.data?.decoration?.logoUrl         as string;
        newReaction.decoration.backgroundColor = data?.data?.decoration?.backgroundColor as string;
    } catch (error) {
        setArray((prevActionArray) => [...prevActionArray, defaultReaction]);
        return;
    }

    try {
        const response = await fetch(`http://zertus.fr:8001/reaction/${slug}/${newReaction.slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });
        const data = await response.json();

        newReaction.description = data?.data?.description as string;
    } catch (error) {
        setArray((prevActionArray) => [...prevActionArray, defaultReaction]);
        return;
    }

    setArray((prevActionArray) => [...prevActionArray, newReaction]);
};

export const setReactions = async (setArray: Dispatch<SetStateAction<Card[]>>, token: string, reactionQuery: string, reactionItem: any) => {
    for (let i = 1; i < reactionQuery.length; i++) {
        if (reactionItem === null)
            setArray((prevActionArray) => [...prevActionArray, defaultReaction]);
        else if (reactionQuery[i] === '1')
            getReaction(setArray, token, reactionItem, i);
        else
            setArray((prevActionArray) => [...prevActionArray, defaultReaction]);
    }
}
