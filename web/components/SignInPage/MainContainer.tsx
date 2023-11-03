import { useEffect, useState } from "react";
import TextContainer, { Forgot, InputContainer } from "../Auth/TextContainer";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useRouter } from "next/router";
import React from "react";
import ChangeAddressComponent from "../Modal/ChangeAddress";
import { UserLogin } from "../../utils/api/user/login";
import ModalError from "../Modal/modalErrorNotif";

const MainContainer = () => {
    // --- Form Values --- //
    const [email   , setEmail]    = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // --- Token --- //
    const { setToken } = useToken();

    // --- Router --- //
    const router = useRouter();

    const clearInputs = () => {
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

    const [modalErrorIsOpen, setIsErrorOpen] = useState(false);

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const handleClick = async () => {
        const res = await UserLogin(email, password);

        res === null ? setToken("") : setToken(res);

        clearInputs();

        if (res)
            router.push("/");
        else
            openModalError();
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center p-[15px]">
            <ChangeAddressComponent />
            <TextContainer title="Log in" handleClick={handleClick}>
                <InputContainer placeholder='Email / Username' value={email}    setValue={setEmail}    icon="/Icons/mail.svg" />
                <InputContainer placeholder='Password'         value={password} setValue={setPassword} icon="/Icons/lock.svg" secureMode={true} />
                {/*TODO: <Forgot text="Forgot your password ?" redirectUri="/passwords/forgot" />*/}
            </TextContainer>
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </div>
    )
}

export default MainContainer;