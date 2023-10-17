// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect, useState } from "react";

// --- Components import --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import Icon from "../../components/NavBar/components/Icon";
import TextContainer, { Forgot, InputContainer } from "../../components/auth/TextContainer";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
import { NavigateButton } from "../../components/NavBar/components/Button";
import { UserLogin } from "../../utils/api/user/login";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";

const IndexPage: NextPage = () => {
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useToken();

    const route = useRouter();

    useEffect(() => {
        setEmail("");
        setPassword("");

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
        const res = await UserLogin(email, password);

        res === null ? setToken("") : setToken(res);

        clearInputs();

        if (res)
            route.push("/");
    }

    return (
        <>
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <NavigateButton href="/sign-up" text="Sign up" />
                </RightSection>
            </NavBar>

            <div className="h-screen flex justify-center items-start">
                <TextContainer title="Log in" handleClick={handleClick}>
                    <InputContainer placeholder='Email / Username' value={email}    setValue={setEmail}    icon="/Icons/mail.svg"   />
                    <InputContainer placeholder='Password'         value={password} setValue={setPassword} icon="/Icons/lock.svg" secureMode={true} />
                    <Forgot text="Forgot your password ?" redirectUri="/passwords/forgot" />
                </TextContainer>
            </div>

            <Footer />
        </>
    )
}

export default IndexPage;
