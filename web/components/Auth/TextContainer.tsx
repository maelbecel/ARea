// --- Librairies import --- //
import Link from "next/link"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

// --- Interfaces --- //
interface ButtonProps {
    text         : string
    handleClick ?: () => void
}

interface InputProps {
    placeholder : string
    secureMode ?: boolean
    value       : string
    setValue    : Dispatch<SetStateAction<string>>
    icon       ?: string
}

interface ContainerProps {
    title        : string
    submit      ?: string
    children    ?: React.ReactNode
    noAccount   ?: boolean
    handleClick ?: () => void
}

// --- TextContainer Component --- //
const Title = ({ title }: { title: string }) => {
    return (
        <div className="font-extrabold text-[2.6rem] text-[#363841]">
            {title}
        </div>
    )
}

const RedirectText = ({ text, redirectUri }: { text: string, redirectUri: string }) => {
    return (
        <Link href={redirectUri}>
            <div className="text-[#363841] text-[1rem] font-bold underline cursor-pointer">
                {text}
            </div>
        </Link>
    )
}

const RequestButton = ({ text, handleClick }: ButtonProps) => {
    return (
        <button className="bg-[#363841] text-white font-extrabold text-[1.8rem] cursor-pointer rounded-[50px] p-[1.6rem] pl-[4.4rem] pr-[4.4rem] select-none
                            active:bg-white active:text-[#363841]"
                onClick={handleClick}
        >
            {text}
        </button>
    )
}

const InputContainer = ({ placeholder, secureMode = false, value, setValue, icon }: InputProps) => {
    const [mode, setMode] = useState<boolean>(secureMode);

    return (
        <div className="w-full flex justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] p-[5px] m-[10px]">
            {icon &&
                <Image className="p-[5px]" src={icon} width={45} height={45} alt={"Icon"} />
            }

            <input type={mode ? "password" : "text"}
                   value={value}
                   placeholder={placeholder}
                   onChange={(e) => setValue(e.target.value)}
                   className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[5px]"
            />

            {secureMode &&
                <button onClick={() => setMode(!mode)} className="flex justify-center items-center">
                    <Image src={mode ? "/Icons/eye.svg" : "/Icons/eye-slash.svg"} width={36} height={36} alt={"Secure mode icon"} />
                </button>
            }
        </div>
    )
}

const ConnectWithGoogle = () => {
    // --- Window --- //
    let oauth2Window: Window | null = null;

    /**
     * Listen for the OAuth2 callback
     */
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data === 'OAuth2CallbackCompleted') {
                console.log('OAuth2 callback completed');
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleClick = async () => {
        const openOAuth2Window = async () => {
            const handleRedirect = () => {
                if (oauth2Window) oauth2Window.close();
            };

            try {
                // Open the OAuth2 authorization window
                oauth2Window = window.open(
                    `${localStorage.getItem('address') as string}/user/login/google?redirecturi=`,
                    'Connexion with Google',
                    'width=720,height=480'
                );

                // Check if the window has been closed
                const checkWindowClosed = () => {
                    if (!oauth2Window || oauth2Window.closed) {
                        // Callback to handle the redirect
                        handleRedirect();
                        clearInterval(checkInterval);
                    }
                };

                const checkInterval = setInterval(checkWindowClosed, 1000);
            } catch (error) {
                console.log(error);
            }
        };

        openOAuth2Window();
    };

  return (
    <div className="w-[90%] sm:w-[50%] xl:w-[50%] h-auto md:w-[80%] bg-[#363841] rounded-[50px] p-5 flex items-center justify-between cursor-pointer"
         onClick={() => handleClick()}
    >
        <div className="text-[20px] xl:text-[22px] 2xl:text-[28px] text-white font-bold">
            Log in with Google
        </div>
        <Image src="/Icons/Google.png" width={36} height={36} alt="Google" />
    </div>
  );
};

const TextContainer = ({ title, submit, children, handleClick, noAccount = false }: ContainerProps) => {
    return (
        <div className="min-h-[75%] w-full md:w-[50%] flex justify-around items-center flex-col">
            <Title title={title} />
            <div className="flex justify-between items-center flex-col">
                {children}
            </div>
            <RequestButton text={submit ? submit : title} handleClick={handleClick} />
            {noAccount &&
                <RedirectText text="No account ? Sign up here" redirectUri="/sign-up" />
            }
            <div className="font-bold text-[48px] text-[#363841]">
                Or
            </div>
            <ConnectWithGoogle />
        </div>
    )
}

export { RedirectText, InputContainer }
export default TextContainer
