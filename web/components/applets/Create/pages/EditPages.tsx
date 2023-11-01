// --- Librairies import --- //
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";

// --- Components --- //
import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../NavBar/navbar";
import { CreateButton, AddReactions } from "../components/CreateButton";
import { ButtonIconNavigate } from "../../../NavBar/components/Button";
import ReactionsComponent from "../components/ReactionButton";
import ActionComponent from "../components/ActionButton";
import Title from "../../../NavBar/components/Title";
import Button from "../../../Button/Button";

// --- Interface --- //
import { ActionApplet, ReactionApplet } from "../interface";
import { UpdateAppletWithID } from "../../../../utils/api/applet/applet";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";

const CreateHeader = () => {
    const router = useRouter();

    return (
        <NavBar>
            <LeftSection>
                <Button text="Back"
                        callBack={() => router.back()}
                        backgroundColor="#363841"
                        textColor="#ffffff"
                        half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 4}
                />
            </LeftSection>
            <MiddleSection>
                <Title text="Choose an action" />
            </MiddleSection>
            <RightSection width={true}>
                <ButtonIconNavigate href="/help">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={'#363841'} />
                    </svg>
                </ButtonIconNavigate>
            </RightSection>
        </NavBar>
    )
}

const CreateContainerComponent = ({ action, setAction, reactions, setReactions, setPages, setEditMode, applet }: { setPages: Dispatch<SetStateAction<number>>, setEditMode: Dispatch<SetStateAction<boolean>>, action: ActionApplet, setAction: Dispatch<SetStateAction<ActionApplet>>, reactions: ReactionApplet[], setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, applet: any }) => {
    // --- Providers --- //
    const { token } = useToken();

    // --- Router --- //
    const router = useRouter();

    /**
     * When action is updated,
     * Update the localStorage
     */
    useEffect(() => {
        localStorage.setItem("action", JSON.stringify(action));
    }, [action]);

    /**
     * When reactions is updated,
     * Update the localStorage
     */
    useEffect(() => {
        localStorage.setItem("reactions", JSON.stringify(reactions));
    }, [reactions]);

    const handleClick = async () => {
        // --- If Action is empty --- //
        if (action.actionSlug === "" || action.actionSlug === null)
            return;
        let count = 0;

        for (let i = 0; i < reactions.length; i++) {
            if (reactions[i].reactionSlug !== "" && reactions[i].reactionSlug !== null)
                count++;
        }

        if (count === 0)
            return;
        else {
            for (let i = 0; i < reactions.length; i++) {
                if (reactions[i].reactionSlug === "" || reactions[i].reactionSlug === null)
                    setReactions(reactions.filter((_, index) => index !== i));
            }
        }

        let body = {
            name: applet.name,
            actionSlug: action.actionSlug,
            actionData: action.actionInputs,
            reactions: reactions,
            notifUser: applet.notifUser,
            enabled: true,
            id: applet.id,
            user: applet.user,
            createdAt: applet.createdAt
        };

        const status = await UpdateAppletWithID(token, applet.id, body);

        if (status === true)
            router.push(`/myApplets/applet/${applet.id}`);
    };

    return (
        <div className={`min-h-screen flex justify-center items-center`}>
            <div className={`lg:max-w-[75%] xl:max-w-[60%] w-[90%] lg:w-full flex justify-around items-center flex-col gap-[20px] py-[10px]`}>
                {action && (
                    <>
                        <ActionComponent action={action}
                                         setAction={setAction}
                                         onEdit={() => { setEditMode(true); setPages(4); }}
                                         onClick={() => { setPages(1) }}
                        />
                        {reactions.length <= 8 && <AddReactions setReactions={setReactions} index={0} />}
                    </>
                )}
                {reactions && (
                    <>
                        <ReactionsComponent reactions={reactions}
                                            setReactions={setReactions}
                                            onEdit={() => { setEditMode(true); setPages(4); }}
                                            onClick={() => {
                                                if (action.actionSlug !== "" && action.actionSlug !== null && action.actionSlug.includes("."))
                                                    setPages(1)
                                            }}
                        />
                    </>
                )}
                <CreateButton name={"Continue"} callback={() => {handleClick()}} />
            </div>
        </div>
    );
};

const EditPages = ({ setPages, setEditMode, action, setAction, reactions, setReactions, applet } : { setPages: Dispatch<SetStateAction<number>>, setEditMode: Dispatch<SetStateAction<boolean>>, action: ActionApplet, setAction: Dispatch<SetStateAction<ActionApplet>>, reactions: ReactionApplet[], setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, applet: any }) => {
    return (
        <>
            <CreateHeader />
            <CreateContainerComponent setPages={setPages} setEditMode={setEditMode} action={action} setAction={setAction} reactions={reactions} setReactions={setReactions} applet={applet} />
        </>
    )
}

export default EditPages;
