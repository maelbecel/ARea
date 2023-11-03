// --- Imports --- //
import { useState } from "react"
import Image from "next/image"

// --- Interface --- //
interface InputProps {
    placeholder      : string
    label            : string
    value            : string
    secureMode      ?: boolean
    onChangeFunction : (value: string) => void
}

const Input = ({placeholder, secureMode = false, label, value, onChangeFunction} : InputProps) => {
    // --- Variables --- //
    const [mode, setMode] = useState<boolean>(secureMode);

    return (
        <div className="flex flex-col">
            <label className="text-[#363841] font-bold text-[18px] md:text-[28px]">
                {label}
            </label>
            <div className="flex flex-row border-[#363841] rounded-md outline px-[5px]">
                <input className="text-[#363841] font-bold text-[18px] py-[12px] outline-none"
                    type={mode ? "password" : "text"}
                    name="name"
                    value={value}
                    onChange={(e) => onChangeFunction(e.target.value)}
                    placeholder={placeholder}
                />
                {secureMode &&
                    <button onClick={() => setMode(!mode)} className="flex justify-center items-center">
                        <Image src={mode ? "/Icons/eye.svg" : "/Icons/eye-slash.svg"} width={36} height={36} alt={"Secure mode icon"} />
                    </button>
                }
            </div>
        </div>
    )
}

export default Input;
