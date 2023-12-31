// --- Imports --- //
import React, { useEffect, useState } from "react";

// --- API --- //
import { PatchProfile } from "../../utils/api/user/me";

// --- Components --- //
import ModalError from "../Modal/modalErrorNotif";
import { useUser } from "../../utils/api/user/Providers/UserProvider";

// --- Interfaces --- //
interface UpdateButtonProps {
    token   : string;
    email   : string;
    username: string;
    setToken: (token: string) => void;
}

const UpdateButton = ({token, email, username, setToken} : UpdateButtonProps) => {
    // --- Variables --- //
    const [data, setData] = useState<any>();
    const [modalErrorIsOpen, setIsErrorOpen] = useState(false);

    // --- Providers --- //
    const { user, setUser } = useUser();

    // --- Functions --- //
    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const handleUpdate = async () => {
        const data = await PatchProfile(token, email, username);

        if (data == null)
            openModalError();
        else
            closeModalError();
        if (data != undefined)
            setData(data);
    }

    // --- UseEffect --- //
    useEffect(() => {
        if (data === undefined)
            return;
        localStorage.setItem("token", data);

        setToken(localStorage.getItem("token") as string);

        setUser({
            ...user,
            email   : email,
            username: username
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div>
            <div className="flex justify-center mt-[20%] mb-[40%] lg:mt-[5%] lg:mb-[20%]">
                <div className="font-bold text-[36px] py-[1%] px-[20%] rounded-[50px] cursor-pointer bg-[#363841] text-white my-[10%]"
                    onClick={handleUpdate}
                >
                    Update
                </div>
            </div>
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </div>

    );
}

export default UpdateButton;