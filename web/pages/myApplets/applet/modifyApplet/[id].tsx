import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NavBar, { LeftSection, MiddleSection, RightSection } from "../../../../components/NavBar/navbar";
import SimpleLink from "../../../../components/NavBar/components/SimpleLink";
import Icon from "../../../../components/NavBar/components/Icon";
import { Card } from "../../../../components/applets/Create/interface";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { GetAppletWithID } from "../../../../utils/api/applet/applet";
import { ButtonIconNavigate, CallBackButton } from "../../../../components/NavBar/components/Button";
import Title from "../../../../components/NavBar/components/Title";

const IndexPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { token, setToken } = useToken();

    const [actionArray, setActionArray] = useState<Card[]>([]);
    const [dataApplet, setDataApplet] = useState<any>({});

    useEffect(() => {
        if (id == undefined)
            return;

        if (token === "") {
            const tokenStore = localStorage.getItem("token");

            if (tokenStore === null) {
                router.push("/");
                return;
            }
            setToken(tokenStore);
        }

        const dataFetch = async () => {
            console.log("id -> ", id);
            setDataApplet(await GetAppletWithID(token, id as string));
        };

        dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, token]);

    useEffect(() => {
        if ((dataApplet === undefined || dataApplet === {} as any) && actionArray.length === 0)
            return;
        /*export interface Card {
            type: string; // action or reaction
            service: string;     // name of the service
            decoration: {
                logoUrl: string;         // url of the logo
                backgroundColor: string; // background color of the card
            };
            slug: string;        // default "", slug of the card
            name: string;        // default "", name of the card
            description: string; // default "", description of the card
            fields: inputs[];    // default [], fields of the card
            inputs: string[];
            placeholders: any;
        };*/

        //let actionArrayTmp: Card[] = [];

        //const actionData = JSON.parse(dataApplet?.actionData);

        //console.log("actionData -> ", actionData);
        console.log("dataApplet -> ", dataApplet);

        /*let actionTmp = {
            type: "action",
            service: "",
            decoration: {
                logoUrl: "",
                backgroundColor: "#D9D9D9"
            },
            slug: "",
            description: "",
            name: "",
            fields: [] as any[],
            inputs: [] as string[],
            placeholders: {}
        } as Card;*/
    }, [dataApplet, actionArray]);

    return (
        <>
            {/*pages === 0 && <CreatePages setIndex={setIndex} index={index} setPages={setPages} token={token} array={actionArray} setArray={setActionArray} setSlug={setCurrentSlug} setService={setCurrentService} active={active} setActive={setActive} title={title} notif={notif} setEditMode={setEditMode} />}
            {pages === 1 && <SearchServicePages setIndex={setIndex} setPages={setPages} currentIndex={index} token={token} setSlug={setCurrentService} setActive={setActive} array={actionArray} />}
            {pages === 2 && <AllActionFromServicePages service={currentService} setPages={setPages} type={getType(index)} setSlug={setCurrentSlug} setIndex={setIndex} index={index} back={back}/>}
            {pages === 3 && <ServiceConnexionPages setPages={setPages} service={currentService} slug={currentSlug} array={actionArray} index={index} setArray={setActionArray} />}
            {pages === 4 && <FillActionInputsPages setPages={setPages} service={currentService} index={index} slug={currentSlug} array={actionArray} setArray={setActionArray} EditMode={editMode} />}
            {pages === 5 && <ValidatePages setPages={setPages} service={currentService} index={index} slug={currentSlug} array={actionArray} setArray={setActionArray} title={title} setTitle={setTitle} notif={notif} setNotif={setNotif} />}
            {pages !== 3 && pages !== 4 && <Footer />*/}
        </>
    );
};

export default IndexPage;

/*
            <NavBar>
                <LeftSection>
                    <CallBackButton text="Back" func={() => router.push(`/myApplets/applet/${id}`)} />
                </LeftSection>
                <MiddleSection>
                    <Title text="Choose an action" />
                </MiddleSection>
                <RightSection>
                    <ButtonIconNavigate href="/help">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={'#363841'} />
                        </svg>
                    </ButtonIconNavigate>
                </RightSection>
            </NavBar>
*/ 
