// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// --- Components import --- //
import NavBar, { Icon, LeftSection, NavBarNavigateButton, RightSection } from "../../components/navbar";
import TextContainer, { Forgot, InputContainer } from "../../components/auth/TextContainer";
import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const route = useRouter();

    useEffect(() => {
        const checkAlreadyLogged = async () => {
            if (localStorage.getItem("token") !== null) {
                route.push("/");
            }
        }

        checkAlreadyLogged();
    }, [route]);

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

    const handleClick = async () => {
        if (!email || !password) {
            // TODO: error
            return;
        }

        try {
            const response = await fetch("https://api.zertus.fr/area51/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();

            if (data?.status === 200) {
                localStorage.setItem("token", data?.data);

                clearInputs();

                route.push("/");
            } else {
                clearInputs();

                console.log(data);
                // TODO: error
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <NavBarNavigateButton href="/sign-up" text="Sign up" />
                </RightSection>
            </NavBar>

            <div className="h-screen flex justify-center items-start">
                <TextContainer title="Log in" handleClick={handleClick}>
                    <InputContainer placeholder='Email'    value={email}    setValue={setEmail}    icon="/Icons/mail.svg"   />
                    <InputContainer placeholder='Password' value={password} setValue={setPassword} icon="/Icons/lock.svg" secureMode={true} />
                    <Forgot text="Forgot your password ?" redirectUri="/passwords/forgot" />
                </TextContainer>
            </div>
        </>
    )
}

export default IndexPage;
