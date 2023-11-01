// --- Librairies import --- //
import type { NextPage } from "next";
import { useRouter } from "next/router";

// --- Components --- //
import CreatePages from "../../components/applets/Create/pages/CreatePages";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import SearchServicePages from "../../components/applets/Create/pages/SearchServicePages";
import { ActionApplet, Card, ReactionApplet, defaultAction, defaultActionApplet, defaultReaction, defaultReactionApplet, defaultReactionsApplet } from "../../components/applets/Create/interface";
import AllActionFromServicePages from "../../components/applets/Create/pages/AllActionFromServicePages";
import ServiceConnexionPages from "../../components/applets/Create/pages/ServiceConnexionPages";
import FillActionInputsPages from "../../components/applets/Create/pages/FillActionInputsPages";
import ValidatePages from "../../components/applets/Create/pages/ValidatePages";

const IndexPage: NextPage = () => {
    const [actionArray, setActionArray] = useState<Card[]>([defaultAction, defaultReaction]);
    const [currentService, setCurrentService] = useState<string>(""); // Service name
    const [currentSlug, setCurrentSlug] = useState<string>(""); // Service slug
    const [pages, setPages] = useState<number>(-1);
    const [index, setIndex] = useState<number>(-1);
    const [token, setToken] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [back, setBack] = useState<boolean>(false);

    const router = useRouter();

    /**
     * First frame useEffect,
     * that clear the "action and reactions" already created in localstorage
     */
    useEffect(() => {
        if (pages === -1) {
            localStorage.removeItem("action");
            localStorage.removeItem("reactions");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const pageStr = router.query.page as string;

        if (pageStr === undefined)
            return;
        else {
            setPages(parseInt(pageStr));
            setAction(defaultActionApplet);
            setReactions(defaultReactionsApplet);

            localStorage.setItem("action", JSON.stringify(defaultActionApplet));
            localStorage.setItem("reactions", JSON.stringify(defaultReactionsApplet));
        }

        const service = router.query.service as string;

        if (service !== undefined) {
            const actionStr = localStorage.getItem("action") as string;
            let newAction = JSON.parse(actionStr) as ActionApplet;

            newAction.actionSlug = service;

            setAction(newAction);

            localStorage.setItem("action", JSON.stringify(newAction));
        } else
            setPages(0);

        router.push("/create", undefined, { shallow: true });

        const back = router.query.back as string;

        if (back !== undefined)
            setBack(true);
        else
            setBack(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);

        if (token === null)
            router.push("/")
    }, [token, router]);

    useEffect(() => {
        if (pages === 0)
            setEditMode(false);
        window.scrollTo(0, 0);
    }, [pages]);

    const getType = (index: number) => {
        if (index === -1)
            return undefined;
        if (index === 0)
            return "action";
        return "reaction";
    }

    // --- Variables --- //
    const [action, setAction] = useState<ActionApplet>({} as ActionApplet);
    const [reactions, setReactions] = useState<ReactionApplet[]>([] as ReactionApplet[]);

    /**
     * First frame useEffect and when pages is updated,
     * Get the action from localStorage
     */
    useEffect(() => {
        if (pages !== 0 && pages !== -1) {
            const actionStr = localStorage.getItem("action") as string;

            // --- If there is no action, return --- //
            if (actionStr === null) {
                setAction({} as ActionApplet);
                return;
            }

            setAction(JSON.parse(actionStr) as ActionApplet);
        }
    }, [pages]);

    /**
     * First frame useEffect and when pages is updated,
     * Get the reactions from localStorage
     */
    useEffect(() => {
        if (pages !== 0 && pages !== -1) {
            const reactionsStr = localStorage.getItem("reactions") as string;

            if (reactionsStr === null) {
                setReactions(defaultReactionsApplet);
                return;
            }

            setReactions(JSON.parse(reactionsStr) as ReactionApplet[]);
        }
    }, [pages]);

    /**
     * When pages is 0 (so when we are on the first page),
     * Remove the index from localStorage
     */
    useEffect(() => {
        if (pages === 0)
            localStorage.removeItem("index");
    }, [pages]);

    return (
        <>
            {(pages === 0 || pages === -1) ? (<CreatePages setPages={setPages} setEditMode={setEditMode} action={action} setAction={setAction} reactions={reactions} setReactions={setReactions} />) : null}
            {(pages === 1) ? (<SearchServicePages          setPages={setPages} />) : null}
            {(pages === 2) ? (<AllActionFromServicePages   setPages={setPages} back={back}/>) : null}
            {(pages === 3) ? (<ServiceConnexionPages       setPages={setPages} />) : null}
            {(pages === 4) ? (<FillActionInputsPages       setPages={setPages} EditMode={editMode} setAction={setAction} setReactions={setReactions} setEditMode={setEditMode} />) : null}
            {(pages === 5) ? (<ValidatePages               setPages={setPages} />) : null}

            {pages !== 3 && pages !== 4 && <Footer />}
        </>
    )
}

export default IndexPage;
