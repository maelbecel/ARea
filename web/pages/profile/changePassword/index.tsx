// --- Imports --- //
import React, { useState } from "react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

// --- Components import --- //
import Input from "../../../components/Form/Profile/Input";
import { GetProfile, PatchProfilePassword } from "../../../utils/api/user/me";
import Icon from "../../../components/NavBar/components/Icon";
import Profile from "../../../components/NavBar/components/Profile";
import SimpleLink from "../../../components/NavBar/components/SimpleLink";
import { NavigateButton } from "../../../components/NavBar/components/Button";
import NavBar, { LeftSection, RightSection } from "../../../components/NavBar/navbar";
import ModalError from "../../../components/Modal/modalErrorNotif";

// --- API --- //
import { useUser } from "../../../utils/api/user/Providers/UserProvider";
import { UserProfile } from "../../../utils/api/user/interface/interface";
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";

const InputBox = ({ placeholder, label, secureMode = false, value, onChangeFunction }: { placeholder: string, label: string, secureMode?: boolean, value: string, onChangeFunction: (value: string) => void }) => {
    return (
        <div className="w-[90%] md:w-[75%] lg:w-[45%]">
            <Input placeholder={placeholder} secureMode={secureMode} label={label} value={value} onChangeFunction={onChangeFunction}/>
        </div>
    );
};

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [modalErrorIsOpen, setIsErrorOpen] = useState<boolean>(false);

        // --- Sending data --- //
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword    , setNewPassword]     = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    // --- Providers --- //
    const { user, setUser } = useUser();
    const { token } = useToken();

    // --- Router --- //
    const router = useRouter();

    // --- Functions --- //
    const handleCurrentPasswordChange = (value: string) => {
        setCurrentPassword(value);
    };

    const handleNewPasswordChange = (value: string) => {
        setNewPassword(value);
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
    };

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const handleConfirm = async () => {
        const data = await PatchProfilePassword(token, currentPassword, newPassword, confirmPassword);
        
        (data === null) ? openModalError() : closeModalError();
    };

    // --- UseEffect --- //

    /**
     * Get the user profile
     */
    useEffect(() => {
        const getProfile = async (token: string) => {
            setUser(await GetProfile(token) as UserProfile);
        }

        if (user?.email === "" || user?.email === null)
            getProfile(token);
    }, [setUser, token, user])

    useEffect(() => {
        if (token === null || token === undefined || token === "")
            router.push("/");
    }, [token, router]);

    return (
        <>
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink   href="/myApplets" text="My applets" />
                    <NavigateButton href="/create"             text="Create" />
                    <Profile email={user?.email} />
                </RightSection>
            </NavBar>

            <div className="flex items-center flex-col w-[100%] space-y-[5%] pb-[5%]">
                <div className="w-full flex flex-row justify-between font-bold text-white text-[24px]" onClick={() => { router.back() }}>
                    <a className="rounded-[25px] bg-[#363841] py-[1%] px-[4%] ml-[50px] mt-[50px]">
                        Back
                    </a>
                </div>
                <div className="flex flex-col items-center w-full space-y-[8%] lg:space-y-[4%]">
                    <div className="w-[90%] md:w-[75%] lg:w-[45%] text-center">
                        <label className="text-[#363841] font-bold text-[34px] md:text-[42px] p-[1%] text-left lg:text-center">
                            Change password
                        </label>
                    </div>
                    <InputBox placeholder="Current Password" label="Current Password" value={currentPassword} onChangeFunction={handleCurrentPasswordChange} secureMode={true} />
                    <InputBox placeholder="New Password"     label="New Password"     value={newPassword}     onChangeFunction={handleNewPasswordChange}     secureMode={true} />
                    <InputBox placeholder="Confirm Password" label="Confirm Password" value={confirmPassword} onChangeFunction={handleConfirmPasswordChange} secureMode={true} />
                    <div className="flex justify-center font-bold text-white text-[24px]">
                        <button className="rounded-[25px] bg-[#363841] py-[15%] px-[50%]" onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
                <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
            </div>
        </>
    )
}

export default IndexPage;