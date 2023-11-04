// --- Imports --- //
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

interface InputProps {
    placeholder : string
    value       : string
    label       : string
    secureMode ?: boolean
    setValue    : Dispatch<SetStateAction<string>>
}

const Input = ({placeholder, secureMode = false, value, setValue, label } : InputProps) => {
    // --- Router --- //
    const router = useRouter();

    return (
        <div className="flex flex-col">
            <label className="text-[#363841] font-bold text-[28px]">{label}</label>            
                <input className="bg-gray-100 text-[#363841] font-bold text-[18px] rounded-md py-[12px] pl-[10px]"
                    type={secureMode ? "password" : "text"}
                    name="name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    disabled={secureMode}
                />
                {secureMode && 
                    <div className="font-bold text-[18px] text-[#00C2FF] pl-[10px]">
                        <button onClick={() => router.push("/profile/changePassword")}>
                            Change password ?
                        </button>
                    </div>
                }
        </div>
    )
}

interface FormProfileProps {
    mail                : string
    username            : string
    password            : string
    loginWithService   ?: boolean
    setUsernameFunction : Dispatch<SetStateAction<string>>;
    setMailFunction     : Dispatch<SetStateAction<string>>;
}

const InputDiv = ({ placeholder, value, secureMode = false, setValue, label } : { placeholder: string, value: string, secureMode?: boolean, setValue: Dispatch<SetStateAction<string>>, label: string }) => {
    return (
        <div className="w-[100%]">
            <Input placeholder={placeholder} secureMode={secureMode} value={value} setValue={setValue} label={label} />
        </div>
    )
};

const FormProfile = ({username, mail, password, setUsernameFunction, setMailFunction, loginWithService = false} : FormProfileProps) => {
    return (
        <div className="flex justify-center flex-col items-center gap-y-10 w-[100%]">
            <label className="text-[#363841] font-bold text-[42px] text-center">Account</label>
            <InputDiv placeholder="Username" value={username} setValue={setUsernameFunction} label="Username"/>
            {loginWithService === false &&
                <InputDiv placeholder="Password" secureMode={true} value={password} setValue={setUsernameFunction} label="Password"/>
            }
            <InputDiv placeholder="Mail" value={mail} setValue={setMailFunction} label="Mail"/>
        </div>
    );
}

export default FormProfile;
