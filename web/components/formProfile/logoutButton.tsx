import React, { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { UserProfile } from "../../utils/api/user/interface/interface";

import Modal from 'react-modal';
import Button from "../Button/Button";

const LogoutButton = () => {

    const router = useRouter();
    const { user, setUser } = useUser();
    const { token, setToken } = useToken();

    const [modalIsOpen, setIsOpen] = useState(false);

    const customStyles = {
        overlay: {
            zIndex: 1000,
        },
        content: {
            width: '50%', // Adjust the width as needed
            height: 'auto', // Adjust the height as needed
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add box shadow
            borderRadius: '10px', // Add border radius
            border: 'none', // Remove border
            transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out', // Add transition
        },
    };
            
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken("" as string);
        setUser({} as UserProfile);
        router.push("/");
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
          <button className="text-[#363841] font-bold text-[24px] p-[1%]" onClick={openModal}>
            Logout
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
                    Are you sure you want to logout ?
            </div>
            <div className="flex flex-col justify-center items-center w-[100%] sm:w-[45%] md:w-[35%] p-[5%]">
                <Button callBack={handleLogout} text="Logout" backgroundColor="#ff0000" textColor="#ffffff" size={false}/>
            </div>
          </Modal>
        </div>
      )
}

export default LogoutButton;