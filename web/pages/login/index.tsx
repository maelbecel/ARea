// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// --- Provider import --- //
import { useAuth } from "../../components/providers/AuthProvider";

// --- Components import --- //
import NavBar, { NavBarButton } from "../../components/navbar";
import TextContainer, { Forgot, InputContainer } from "../../components/auth/TextContainer";
import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { token, setToken } = useAuth();

    const route = useRouter();

    useEffect(() => {
        const checkAlreadyLogged = async () => {
            if (token) {
                route.push("/");
            } else if (localStorage.getItem("token") !== null) {
                route.push("/");
            }
        }

        console.log(token);

        checkAlreadyLogged();
    }, [route, token]);

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
                setToken(data?.data);

                localStorage.setItem("token", data?.data);

                route.push("/");
            } else {
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
                <NavBarButton href="/sign-up"   text="Sign up" />
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
