import { useEffect, useState } from "react";
import { UserRegister } from "../../utils/api/user/register";
import TextContainer, { InputContainer } from "../auth/TextContainer";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useRouter } from "next/router";
import React from "react";
import ChangeAddressComponent from "../Modal/ChangeAddress";

const MainContainer = () => {
    // --- Form Values --- //
    const [username, setUsername] = useState<string>("");
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // --- Token --- //
    const { setToken } = useToken();

    // --- Router --- //
    const router = useRouter();

    const clearInputs = () => {
        setUsername("");
        setEmail("");
        setPassword("");
    }

    useEffect(() => {
        clearInputs();

        const checkAlreadyLogged = async () => {
            if (localStorage.getItem("token") !== null) {
                router.push("/");
            }
        }

        checkAlreadyLogged();
    }, [router]);

    const handleClick = async () => {
        const res = await UserRegister(email, username, password);

        res === null ? setToken("") : setToken(res);

        clearInputs();

        if (res)
            router.push("/");
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center p-[15px]">
            <ChangeAddressComponent />
            <TextContainer title="Sign up" handleClick={handleClick}>
                <InputContainer placeholder='Username' value={username} setValue={setUsername} icon="/Icons/person.svg" />
                <InputContainer placeholder='Email'    value={email}    setValue={setEmail}    icon="/Icons/mail.svg"   />
                <InputContainer placeholder='Password' value={password} setValue={setPassword} icon="/Icons/lock.svg" secureMode={true} />
            </TextContainer>
        </div>
    )
}

export default MainContainer;