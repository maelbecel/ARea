// --- Librairies import --- //
import Link from "next/link"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"

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

const Forgot = ({ text, redirectUri }: { text: string, redirectUri: string }) => {
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

const TextContainer = ({ title, submit, children, handleClick }: ContainerProps) => {
    return (
        <div className="h-[75%] max-w-[36em] flex justify-around items-center flex-col">
            <Title title={title} />
            <div className="h-auto flex justify-between items-center flex-col">
                {children}
            </div>
            <RequestButton text={submit ? submit : title} handleClick={handleClick} />
        </div>
    )
}

export { Forgot, InputContainer }
export default TextContainer
