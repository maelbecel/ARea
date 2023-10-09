// --- Librairies import --- //
import type { NextPage } from "next";
import { useRouter } from "next/router";

// --- Components --- //
import CreatePages from "../../components/applets/Create/pages/CreatePages";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import SearchServicePages from "../../components/applets/Create/pages/SearchServicePages";
import { Card, defaultAction, defaultReaction } from "../../components/applets/Create/interface";
import AllActionFromServicePages from "../../components/applets/Create/pages/AllActionFromServicePages";
import ServiceConnexionPages from "../../components/applets/Create/pages/ServiceConnexionPages";
import FillActionInputsPages from "../../components/applets/Create/pages/FillActionInputsPages";
import ValidatePages from "../../components/applets/Create/pages/ValidatePages";

const IndexPage: NextPage = () => {
    const [actionArray, setActionArray] = useState<Card[]>([defaultAction, defaultReaction]);
    const [currentService, setCurrentService] = useState<string>(""); // Service name
    const [currentSlug, setCurrentSlug] = useState<string>(""); // Service slug
    const [pages, setPages] = useState<number>(0);
    const [index, setIndex] = useState<number>(-1);
    const [token, setToken] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [notif, setNotif] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        const pageStr = router.query.page as string;

        if (pageStr === undefined)
            return;
        else
            setPages(parseInt(pageStr));

        const service = router.query.service as string;

        if (service !== undefined)
            setCurrentService(service);
        else
            setPages(0);

        const active = router.query.active as string;

        if (active != undefined)
            setActive(true);
        else
            setActive(false);

        router.push("/create", undefined, { shallow: true });
    }, [router]);

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);

        if (token === null)
            router.push("/")
    }, [token, router]);

    const getType = (index: number) => {
        if (index === -1)
            return undefined;
        if (index === 0)
            return "action";
        return "reaction";
    }

    return (
        <>
            {pages === 0 && <CreatePages setIndex={setIndex} setPages={setPages} token={token} array={actionArray} setArray={setActionArray} setSlug={setCurrentSlug} setService={setCurrentService} active={active} setActive={setActive} title={title} notif={notif} />}
            {pages === 1 && <SearchServicePages setIndex={setIndex} setPages={setPages} currentIndex={index} token={token} setSlug={setCurrentService} setActive={setActive} />}
            {pages === 2 && <AllActionFromServicePages service={currentService} token={token} setPages={setPages} type={getType(index)} setSlug={setCurrentSlug} setIndex={setIndex} index={index} array={actionArray} setArray={setActionArray} />}
            {pages === 3 && <ServiceConnexionPages setPages={setPages} token={token} service={currentService} slug={currentSlug} array={actionArray} index={index} setArray={setActionArray} />}
            {pages === 4 && <FillActionInputsPages setPages={setPages} token={token} service={currentService} index={index} slug={currentSlug} array={actionArray} setArray={setActionArray} />}
            {pages === 5 && <ValidatePages setPages={setPages} token={token} service={currentService} index={index} slug={currentSlug} array={actionArray} setArray={setActionArray} title={title} setTitle={setTitle} notif={notif} setNotif={setNotif} />}

            {pages !== 3 && pages !== 4 && <Footer />}
        </>
    )
}

export default IndexPage;
