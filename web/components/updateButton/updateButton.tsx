import React from "react";
import { PatchProfile } from "../../utils/api/user/me";

interface UpdateButtonProps {
    token: string;
    email: string;
    username: string;
}

const UpdateButton = ({token, email, username} : UpdateButtonProps) => {

    const handleUpdate = () => {
        // patchProfile(token, email, username);
    }

    return (
        <div className="flex justify-center mt-[20%] mb-[40%] lg:mt-[5%] lg:mb-[20%]">
            <div className="font-bold text-[36px] py-[1%] px-[20%] rounded-[50px] cursor-pointer bg-[#363841] text-white my-[10%]"
                onClick={handleUpdate}
            >
                Update
            </div>
        </div>
    );
}

export default UpdateButton;