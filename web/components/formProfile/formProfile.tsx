import React, { Children, Dispatch, ReactFragment, SetStateAction, useState } from "react";
import { useRouter } from "next/router";

interface InputProps {
    placeholder : string
    secureMode ?: boolean
    value       : string
    setValue    : Dispatch<SetStateAction<string>>
    label       : string
}

interface FormProfileProps {
    mail        : string
    password    : string
    username    : string
}

const Input = ({placeholder, secureMode = false, value, setValue, label } : InputProps) => {
    const router = useRouter();

    const navigateToChangePassword = () => {
        router.push("/profile/changePassword");
    }
    
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
                { secureMode && 
                    <div className="font-bold text-[18px] text-[#00C2FF] pl-[10px]">
                        <button onClick={navigateToChangePassword}>
                            Change password ?
                        </button>
                    </div>
                }
        </div>
    )
}

const FormProfile = ({username, mail, password} : FormProfileProps) => {
    const [UserName, setUsername] = useState<string>(username ?? '')
    const [UserMail, setUserMail] = useState<string>(mail ?? '')
    const [UserPassword, setUserPassword] = useState<string>(password ?? '')

    return (
        <div className="flex justify-center flex-col gap-y-10">
            <label className="text-[#363841] font-bold text-[42px]">Account</label>
            <Input placeholder="Username" value={UserName} setValue={setUsername} label="Username"/>
            <Input placeholder="Password" secureMode={true} value={UserPassword} setValue={setUserPassword} label="Password"/>
            <Input placeholder="Mail" value={UserMail} setValue={setUserMail} label="Mail"/>
        </div>
    );
}

export default FormProfile;