// --- Libraries --- //
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// --- Providers --- //
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";

// --- Components --- //
import AllActionFromServicePages from "../../../../components/Applet/Create/Pages/AllActionFromServicePages";
import FillActionInputsPages from "../../../../components/Applet/Create/Pages/FillActionInputsPages";
import ServiceConnexionPages from "../../../../components/Applet/Create/Pages/ServiceConnexionPages";
import SearchServicePages from "../../../../components/Applet/Create/Pages/SearchServicePages";
import Footer from "../../../../components/Footer/Footer";

// --- Interface --- //
import { ActionApplet, ReactionApplet, defaultReactionsApplet } from "../../../../components/Applet/Interface/interface";
import { GetAppletWithID } from "../../../../utils/api/applet/applet";
import EditPages from "../../../../components/Applet/Edit/Pages/EditPages";

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [pages, setPages] = useState<number>(-1);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [dataApplet, setDataApplet] = useState<any>(undefined);

    // --- Providers Hookers --- //
    const { token } = useToken();

    // --- Router --- //
    const router = useRouter();

    // --- Query --- //
    const { id } = router.query;

    useEffect(() => {
        if (token === null)
            router.push("/")
    }, [token, router]);
        
    /**
     * First frame useEffect and when id is updated,
     * that fill "action" and "reactions" in localStorage with the applet
     */
    useEffect(() => {
        if (id === undefined && pages === -1) {
            localStorage.removeItem("action");
            localStorage.removeItem("reactions");
            return;
        }

        if (pages === -1) {
            // Get the applet
            const dataFetch = async () => {
                setDataApplet(await GetAppletWithID(token, id as string));
            };
    
            dataFetch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (dataApplet === undefined)
            return;
        parseDataAppletToAREA(dataApplet);
    }, [dataApplet]);

    useEffect(() => {
        if (token === null)
            router.push("/")
    }, [token, router]);

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

    const parseDataAppletToAREA = (data: any) => {
        let action: ActionApplet = {
            actionSlug: data.actionSlug,
            actionInputs: data.actionData
        };

        let reactions: ReactionApplet[] = [];

        for (let i = 0; i < data.reactions.length; i++) {
            reactions.push({
                reactionSlug: data.reactions[i].reactionSlug,
                reactionInputs: data.reactions[i].reactionData
            });
        }

        setAction(action);
        setReactions(reactions);
    };

    return (
        <>
            {(pages === 0 || pages === -1) ? (<EditPages   setPages={setPages} setEditMode={setEditMode} action={action} setAction={setAction} reactions={reactions} setReactions={setReactions} applet={dataApplet} />) : null}
            {(pages === 1) ? (<SearchServicePages          setPages={setPages} pages={pages} />) : null}
            {(pages === 2) ? (<AllActionFromServicePages   setPages={setPages} back={false} />) : null}
            {(pages === 3) ? (<ServiceConnexionPages       setPages={setPages} />) : null}
            {(pages === 4) ? (<FillActionInputsPages       setPages={setPages} EditMode={editMode} setAction={setAction} setReactions={setReactions} setEditMode={setEditMode} />) : null}

            {pages !== 3 && pages !== 4 && <Footer />}
        </>
    )
}

export default IndexPage;
