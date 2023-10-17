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
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { UserRegister } from "../../utils/api/user/register";

const IndexPage: NextPage = () => {
    const [username, setUsername] = useState<string>("");
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useToken();

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
        const res = await UserRegister(email, username, password);

        res === null ? setToken("") : setToken(res);

        clearInputs();

        if (res)
            router.push("/");
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
