import React, { useEffect } from "react";

import { DeleteProfile } from "../../utils/api/user/me";
import { useRouter } from "next/router";

interface DeleteButtonProps {
    token: string;
}

const DeleteButton = ({token} : DeleteButtonProps ) => {

    const router = useRouter();

    const handleDelete = () => {
        DeleteProfile(token, router);
    }

    return (
        <button className="text-[#ff0000] font-bold text-[24px] p-[1%]" onClick={handleDelete}>
            Delete account
        </button>
    )
}

export default DeleteButton;