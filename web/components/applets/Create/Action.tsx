// --- Interface --- //
import { Card, defaultAction } from "./interface";
import { Dispatch, SetStateAction } from "react";

const setAction = (len: number, setArray: Dispatch<SetStateAction<Card[]>>, newValue: Card) => {
    if (len === 0) {
        setArray([newValue]);
        return;
    }

    setArray((prevActionArray) => [newValue, ...prevActionArray.slice(1)]);
};

export const getAction = async (setArray: Dispatch<SetStateAction<Card[]>>, len: number, token: string, slugID: string) => {
    let newAction : Card = defaultAction as Card;

    newAction.slug = slugID;

    const slug = newAction.slug?.split(".")[0] as string;

    try {
        const response = await fetch(`http://zertus.fr:8001/service/${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        newAction.decoration.logoUrl         = data?.data?.decoration?.logoUrl         as string;
        newAction.decoration.backgroundColor = data?.data?.decoration?.backgroundColor as string;
    } catch (error) {
        setAction(len, setArray, newAction);
        return;
    }

    try {
        const response = await fetch(`http://zertus.fr:8001/action/${slug}/${newAction.slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        });

        const data = await response.json();

        newAction.description = data?.data?.description as string;
    } catch (error) {
        setAction(len, setArray, newAction);
        return;
    }

    setAction(len, setArray, newAction);
};
