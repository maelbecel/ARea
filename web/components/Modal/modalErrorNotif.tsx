import React from "react";
import Modal from 'react-modal';

interface ModalErrorProps {
    closeModal : () => void;
    openModal  : () => void;
    modalIsOpen: boolean;
    text       : string;
}

const ModalError = ({closeModal, openModal, modalIsOpen, text} : ModalErrorProps ) => {

    return (
        <div className="w-[100%] flex justify-center">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className={"flex flex-col items-center justify-around w-[50%] md:w-[25%] h-[15%] bg-white shadow-md rounded-md p-6 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ease-in-out absolute top-1/2 left-1/2"}
            >
                <div className="flex flex-col justify-center w-[100%] text-[24px] font-bold text-[#363841] text-center">
                    {text}
                </div>
            </Modal>
        </div>        
    )
}

export default ModalError;