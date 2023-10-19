import React, { useState } from "react";
import { NextPage } from "next";
import { useEffect } from "react";
import Link from "next/link";

// --- Components import --- //
import Input from "../../../components/formProfile/input";
import { GetProfile } from "../../../utils/api/user/me";
import Icon from "../../../components/NavBar/components/Icon";
import Profile from "../../../components/NavBar/components/Profile";
import { useUser } from "../../../utils/api/user/Providers/UserProvider";
import { UserProfile } from "../../../utils/api/user/interface/interface";
import SimpleLink from "../../../components/NavBar/components/SimpleLink";
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { NavigateButton } from "../../../components/NavBar/components/Button";
import NavBar, { LeftSection, RightSection } from "../../../components/NavBar/navbar";

const IndexPage: NextPage = () => {

    const { user, setUser } = useUser();
    const { token, setToken } = useToken();

    // State variables for input fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Update state when the input values change
    const handleCurrentPasswordChange = (value: string) => {
        setCurrentPassword(value);
    };

    const handleNewPasswordChange = (value: string) => {
        setNewPassword(value);
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
    };

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
          
    const handleConfirm = () => {

        // check if currentPassword is correct

        if (newPassword !== confirmPassword) {
            console.log("Passwords don't match");
            return;
        }
    }

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
                <div className="w-full flex flex-row justify-between font-bold text-white text-[24px]">
                    <Link href="/profile/">
                            {/* Add a child element inside the Lipxnk */}
                            <a className="rounded-[25px] bg-[#363841] py-[1%] px-[4%] ml-[50px] mt-[50px]">Back</a>
                    </Link>
                </div>
                <div className="flex flex-col items-center w-full space-y-[3%]">
                    <label className="text-[#363841] font-bold text-[42px] p-[1%]">Change your actual password</label>
                    <div className="w-[25%]">
                        <Input placeholder="Current Password" label="Current Password" value={currentPassword} onChangeFunction={handleCurrentPasswordChange}/>
                    </div>
                    <div className="w-[25%]">
                        <Input placeholder="New Password" secureMode={true} label="New Password" value={newPassword} onChangeFunction={handleNewPasswordChange}/>
                    </div>
                    <div className="w-[25%]">
                        <Input placeholder="Confirm Password" label="Confirm Password" value={confirmPassword} onChangeFunction={handleConfirmPasswordChange}/>
                    </div>
                    <div className="flex justify-center font-bold text-white text-[24px]">
                        <button className="rounded-[25px] bg-[#363841] py-[15%] px-[50%]" onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndexPage;