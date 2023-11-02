// --- Imports --- //
import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from 'react-modal';

// --- API --- //
import { DeleteProfile } from "../../utils/api/user/me";

// --- Components --- //
import Button from "./Button";
import ModalError from "../Modal/modalErrorNotif";

const DeleteButton = ({ token } : { token: string } ) => {
    // --- Variables --- //
    const [modalIsOpen     , setIsOpen]      = useState<boolean>(false);
    const [modalErrorIsOpen, setIsErrorOpen] = useState<boolean>(false);

    // --- Router --- //
    const router = useRouter();

    // --- Functions --- //

    const handleDelete = async () => {
        const data = await DeleteProfile(token, router);

        (data === false) ? openModalError() : closeModalError();
    }

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    return (

        <div className="w-[100%] flex flex-col justify-center">
            <button className="text-[#ff0000] font-bold text-[24px] p-[1%]" onClick={openModal}>
                Delete account
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className={"flex flex-col items-center justify-around w-[50%] h-[50%] bg-white shadow-md rounded-md p-6 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ease-in-out absolute top-1/2 left-1/2"}
            >
                <div className="flex justify-end w-[100%] sm:w-[45%] md:w-[35%] p-[5%]">
                    <Button callBack={closeModal} text="Close" backgroundColor="#363841" textColor="#ffffff" size={false}/>
                </div>
                <div className="flex flex-col justify-center w-[100%] text-[24px] font-bold text-[#363841] text-center">
                        Are you sure you want to delete your account ?
                </div>
                <div className="flex flex-col justify-center items-center w-[100%] sm:w-[45%] md:w-[35%] p-[5%]">
                    <Button callBack={handleDelete} text="Delete" backgroundColor="#ff0000" textColor="#ffffff" size={false}/>
                </div>
            </Modal>
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </div>
    )
}

export default DeleteButton;