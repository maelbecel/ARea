import React, { Children, Dispatch, ReactFragment, SetStateAction, useEffect, useState } from "react";
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
    username    : string
    password    : string
    setUsernameFunction : Dispatch<SetStateAction<string>>;
    setMailFunction : Dispatch<SetStateAction<string>>;
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

const FormProfile = ({username, mail, password, setUsernameFunction, setMailFunction} : FormProfileProps) => {

    return (
        <div className="flex justify-center flex-col items-center gap-y-10 w-[100%]">
            <label className="text-[#363841] font-bold text-[42px] text-center">Account</label>
            <div className="w-[100%]">
                <Input placeholder="Username" value={username} setValue={setUsernameFunction} label="Username"/>
            </div>
            <div className="w-[100%]">
                <Input placeholder="Password" secureMode={true} value={password} setValue={setUsernameFunction} label="Password"/>
            </div>
            <div className="w-[100%]">
                <Input placeholder="Mail" value={mail} setValue={setMailFunction} label="Mail"/>
            </div>
        </div>
    );
}

export default FormProfile;