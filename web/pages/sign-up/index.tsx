// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// --- Provider import --- //
import { useAuth } from "../../components/providers/AuthProvider";

// --- Components import --- //
import NavBar, { NavBarButton } from "../../components/navbar";
import TextContainer, { InputContainer } from "../../components/auth/TextContainer";

const IndexPage: NextPage = () => {
    const [username, setUsername] = useState<string>("");
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { token, setToken } = useAuth();

    const router = useRouter();

    useEffect(() => {
        const checkAlreadyLogged = async () => {
            if (token) {
                router.push("/");
            } else if (localStorage.getItem("token") !== null) {
                router.push("/");
            }
        }

        checkAlreadyLogged();
    }, [router, token]);

    const handleClick = async () => {
        if (!username || !email || !password) {
            // TODO: error
            return;
        }

        try {
            const response = await fetch("https://api.zertus.fr/area51/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });
            const data = await response.json();

            if (data?.status === 200) {
                setToken(data?.password);

                localStorage.setItem("token", data?.data);

                router.push("/");
            } else if (data?.status === 400) {
                router.push("/login");
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NavBar>
                <NavBarButton href="/login" text="Log in" />
            </NavBar>

            <div className="h-screen flex justify-center items-start">
                <TextContainer title="Sign up" handleClick={handleClick}>
                    <InputContainer placeholder='Username' value={username} setValue={setUsername} icon="/Icons/person.svg" />
                    <InputContainer placeholder='Email'    value={email}    setValue={setEmail}    icon="/Icons/mail.svg"   />
                    <InputContainer placeholder='Password' value={password} setValue={setPassword} icon="/Icons/lock.svg" secureMode={true} />
                </TextContainer>
            </div>
        </>
    )
}

export default IndexPage;
