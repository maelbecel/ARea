// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// --- Components import --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import Icon from "../../components/NavBar/components/Icon";
import TextContainer, { InputContainer } from "../../components/auth/TextContainer";
import Footer from "../../components/footer";
import { NavigateButton } from "../../components/NavBar/components/Button";

const IndexPage: NextPage = () => {
    const [username, setUsername] = useState<string>("");
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        setEmail("");
        setPassword("");
        
        const checkAlreadyLogged = async () => {
            if (localStorage.getItem("token") !== null) {
                router.push("/");
            }
        }

        checkAlreadyLogged();
    }, [router]);

    const clearInputs = () => {
        setUsername("");
        setEmail("");
        setPassword("");
    }

    const handleClick = async () => {
        if (!username || !email || !password) {
            // TODO: error
            return;
        }

        try {
            const response = await fetch("https://area51.zertus.fr/user/register", {
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
                localStorage.setItem("token", data?.data);

                clearInputs();

                router.push("/");
            } else if (data?.status === 400) {
                clearInputs();

                router.push("/login");
            } else {
                clearInputs();

                console.log(data);
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
                    <NavigateButton href="/login" text="Log in" />
                </RightSection>
            </NavBar>

            <div className="h-screen flex justify-center items-start">
                <TextContainer title="Sign up" handleClick={handleClick}>
                    <InputContainer placeholder='Username' value={username} setValue={setUsername} icon="/Icons/person.svg" />
                    <InputContainer placeholder='Email'    value={email}    setValue={setEmail}    icon="/Icons/mail.svg"   />
                    <InputContainer placeholder='Password' value={password} setValue={setPassword} icon="/Icons/lock.svg" secureMode={true} />
                </TextContainer>
            </div>

            <Footer />
        </>
    )
}

export default IndexPage;
