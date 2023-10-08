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

const IndexPage: NextPage = () => {
    const [actionArray, setActionArray] = useState<Card[]>([defaultAction, defaultReaction]);
    const [currentService, setCurrentService] = useState<string>(""); // Service name
    const [currentSlug, setCurrentSlug] = useState<string>(""); // Service slug
    const [pages, setPages] = useState<number>(0);
    const [index, setIndex] = useState<number>(-1);
    const [token, setToken] = useState<string>('');

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
    }, [router]);

    useEffect(() => {
        setToken(localStorage.getItem("token") as string);
  
        if (token === null)
            router.push("/")
    }, [token, router]);

    useEffect(() => {
        console.log(pages, index, currentService, currentSlug);
    }, [pages, index, currentService, currentSlug]);

    const getType = (index: number) => {
        if (index === -1)
            return undefined;
        if (index === 0)
            return "action";
        return "reaction";
    }

    return (
        <>
            {pages === 0 && <CreatePages setIndex={setIndex} setPages={setPages} token={token} array={actionArray} setArray={setActionArray} />}
            {pages === 1 && <SearchServicePages setIndex={setIndex} setPages={setPages} currentIndex={index} token={token} setSlug={setCurrentService} />}
            {pages === 2 && <AllActionFromServicePages service={currentService} token={token} setPages={setPages} type={getType(index)} setSlug={setCurrentSlug} />}
            {pages === 3 && <ServiceConnexionPages setPages={setPages} token={token} service={currentService} slug={currentSlug} array={actionArray} />}
            {pages === 4 && <Footer />}

            {pages !== 3 && <Footer />}
        </>
    )
}

export default IndexPage;
