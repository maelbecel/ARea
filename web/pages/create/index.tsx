// --- Librairies import --- //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";

// --- Interface --- //
import { ActionApplet, ReactionApplet, defaultActionApplet, defaultReactionsApplet } from "../../components/Applet/Interface/interface";

// --- Components --- //
import CreatePages from "../../components/Applet/Create/Pages/CreatePages";
import SearchServicePages from "../../components/Applet/Create/Pages/SearchServicePages";
import AllActionFromServicePages from "../../components/Applet/Create/Pages/AllActionFromServicePages";
import ServiceConnexionPages from "../../components/Applet/Create/Pages/ServiceConnexionPages";
import FillActionInputsPages from "../../components/Applet/Create/Pages/FillActionInputsPages";
import ValidatePages from "../../components/Applet/Create/Pages/ValidatePages";
import Footer from "../../components/Footer/Footer";

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [pages    , setPages] = useState<number>(-1); // The page we are on
    const [editMode, setEditMode] = useState<boolean>(false);
    const [back    , setBack] = useState<boolean>(false);

    // --- Providers Hookers --- //
    const [token, setToken] = useState<string | null | undefined>("");

    // --- Router --- //
    const router = useRouter();

    useEffect(() => {

        console.log("token -> ", token);

        if (token === null)
            router.push("/")
    }, [token, router]);

    /**
     * First frame useEffect,
     * that clear the "action and reactions" already created in localstorage
     */
    useEffect(() => {
        setToken(localStorage.getItem("token") as string);

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
        if (pages === 0)
            setEditMode(false);
        window.scrollTo(0, 0);
    }, [pages]);

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
            {(pages === 1) ? (<SearchServicePages          setPages={setPages} pages={pages} />) : null}
            {(pages === 2) ? (<AllActionFromServicePages   setPages={setPages} back={back} />) : null}
            {(pages === 3) ? (<ServiceConnexionPages       setPages={setPages} />) : null}
            {(pages === 4) ? (<FillActionInputsPages       setPages={setPages} EditMode={editMode} setAction={setAction} setReactions={setReactions} setEditMode={setEditMode} />) : null}
            {(pages === 5) ? (<ValidatePages               setPages={setPages} />) : null}
    
            {pages !== 3 && pages !== 4 && <Footer />}
        </>
    );
}

export default IndexPage;
