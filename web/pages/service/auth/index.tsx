// --- Librairies import --- //
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

// --- Components import --- //
import NavBar, { LeftSection, RightSection, NavBarFuncButton, NavBarNavigateButtonIcon, MiddleSection, Title } from "../../../components/navbar";
import GetActionService from "../../../components/service/GetActionService";
import Footer from "../../../components/footer";

const IndexPage: NextPage = () => {
    const router = useRouter();

    const [color   , setColor] = useState<string>("");
    const [service , setService]  = useState<string>("");

    useEffect(() => {
        const checkIfNotLogged = async () => {
            if (localStorage.getItem("token") === null)
                router.push("/");
        }

        const getQueryValue = async () => {
            setColor(router.query.color as string);
            setService(router.query.service as string);

            if (color === undefined || service === undefined)
                router.push("/");
        }

        checkIfNotLogged();
        getQueryValue();
    }, [router, color, service]);

    const getTheme = (hexColor : string ) => {
        if (hexColor?.length !== 6)
            hexColor = hexColor?.split("").map((char) => char + char).join("") as string;

        // Convertir la couleur hexadécimale en valeurs RVB
        const r = parseInt(hexColor?.substring(1, 3), 16);
        const g = parseInt(hexColor?.substring(3, 5), 16);
        const b = parseInt(hexColor?.substring(5, 7), 16);

        // Calculer la luminosité (en utilisant la formule YIQ)
        const luminosity = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Déterminer si la couleur de fond est claire ou sombre
        if (luminosity < 0.5)
            return 'dark';  // Couleur de fond sombre, texte clair
        else
            return 'light'; // Couleur de fond clair, texte sombre
    }

    const theme = getTheme(color);
    const hexColor = "bg-[#" + color + "]";

    const [active, setActive] = useState<boolean>(false);

    const handleClick = async () => {
        //TODO: connect with aouth2 the user

        console.log("click")

        setActive(false);
    }

    return (
        <>
            <NavBar color={hexColor} theme={theme}>
                <LeftSection>
                    <NavBarFuncButton text="Back" color={color} func={() => router.back()} theme={theme} />
                </LeftSection>
                <MiddleSection>
                    <Title text="Complete the action fields" theme={theme} />
                </MiddleSection>
                <RightSection>
                    <NavBarNavigateButtonIcon href="/help">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18.3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
                        </svg>
                    </NavBarNavigateButtonIcon>
                </RightSection>
            </NavBar>

            <div className={`min-h-screen flex justify-start gap-[100px] items-center flex-col ${theme === 'dark' ? 'text-white' : 'text-[#363841]'} ${hexColor}`}>
                <div className={`w-full flex justify-center flex-col gap-7 p-6 select-none`}>
                    {/* TODO: remove placeholder */}
                    <Image src={"/Logo/WhiteLogo.svg"} width={168} height={168} alt={"Service Logo"} />
                    <div className={`font-bold text-[50px] flex justify-center`}>
                        {service}
                    </div>
                </div>
                <div className={`w-full flex justify-center items-center text-[24px]`}>
                    {/* TODO: remove place holder and fetch on api */}
                    Cette action s’active à chaque fois que vous likez une vidéo
                </div>
                <div className={`flex justify-center items-center w-full h-full`}>
                    <div className={`flex justify-center items-center font-bold text-[36px] rounded-[50px] p-[27px] pl-[130px] pr-[130px]`}
                         style={{
                            backgroundColor: active ? '#' + color : (theme === 'dark' ? 'white' : '#363841'),
                            color          : active ? (theme === 'dark' ? 'white' : '#363841') : '#' + color,
                         }}
                         onMouseDown={() => { setActive(true) }}
                         onMouseLeave={() => { setActive(false) }}
                         onClick={handleClick}
                    >
                        Connection
                    </div>
                </div>
            </div>

            <Footer color={hexColor} theme={theme} />
        </>
    )
}

export default IndexPage;
