import { useState } from "react";
import Button from "../Button/Button";
import Modal from 'react-modal';
import ModalError from "./modalErrorNotif";

const ChangeAddressComponent = () => {
    const [show, setShow] = useState<boolean>(false);
    const [address, setAddress] = useState<string>("");
    const [modalErrorIsOpen, setIsErrorOpen] = useState(false);

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    const validateAddress = async () => {
        try {
            const response = await fetch(address + "/about.json", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            localStorage.setItem("address", address);

            setShow(false);
        } catch (e) {
            console.log("Invalid Address : ", address);
            openModalError();
            setShow(false);
        }
    }

    return (
        <>
            <div className="flex-row flex gap-[5px] w-full items-center md:px-[50px] cursor-pointer" onClick={() => { setShow(true); setAddress("") }}>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.2708 45.8332L18.4375 39.1665C17.9861 38.9929 17.5604 38.7846 17.1604 38.5415C16.7604 38.2985 16.3701 38.038 15.9896 37.7603L9.79167 40.3644L4.0625 30.4686L9.42708 26.4061C9.39236 26.163 9.375 25.9283 9.375 25.7019V24.2978C9.375 24.0714 9.39236 23.8366 9.42708 23.5936L4.0625 19.5311L9.79167 9.63525L15.9896 12.2394C16.3715 11.9616 16.7708 11.7012 17.1875 11.4582C17.6042 11.2151 18.0208 11.0068 18.4375 10.8332L19.2708 4.1665H30.7292L31.5625 10.8332C32.0139 11.0068 32.4396 11.2151 32.8396 11.4582C33.2396 11.7012 33.6299 11.9616 34.0104 12.2394L40.2083 9.63525L45.9375 19.5311L40.5729 23.5936C40.6076 23.8366 40.625 24.0714 40.625 24.2978V25.7019C40.625 25.9283 40.5903 26.163 40.5208 26.4061L45.8854 30.4686L40.1562 40.3644L34.0104 37.7603C33.6285 38.038 33.2292 38.2985 32.8125 38.5415C32.3958 38.7846 31.9792 38.9929 31.5625 39.1665L30.7292 45.8332H19.2708ZM25.1042 32.2915C27.1181 32.2915 28.8368 31.5797 30.2604 30.1561C31.684 28.7325 32.3958 27.0137 32.3958 24.9998C32.3958 22.9859 31.684 21.2672 30.2604 19.8436C28.8368 18.42 27.1181 17.7082 25.1042 17.7082C23.0556 17.7082 21.3278 18.42 19.9208 19.8436C18.5139 21.2672 17.8111 22.9859 17.8125 24.9998C17.8125 27.0137 18.5153 28.7325 19.9208 30.1561C21.3264 31.5797 23.0542 32.2915 25.1042 32.2915Z" fill="#363841"/>
                </svg>
                <div className="font-bold text-[18px] md:text-[24px]">
                    Change server address
                </div>
            </div>
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
            <Modal isOpen={show}
                    onRequestClose={() => { setShow(false) }}
                    style={{
                        overlay: {
                            zIndex: 1000
                        },
                        content: {
                            width: "75%",
                            height: "50%",
                            left: '15%',
                            top: '25%',
                            borderRadius: "50px",
                        }
                    }}
            >
                <div className="flex flex-col items-center justify-around font-bold h-full w-full text-[#363841]">
                    <div className="text-[16px] sm:text-[24px] md:text-[34px] lg:text-[42px]">
                        Change server address
                    </div>
                    <input
                        className="w-[75%] h-[40px] md:h-[60px] rounded-[15px] outline-none text-[14px] md:text-[24px] px-[15px] bg-[#d9d9d9]"
                        placeholder="Ex: https://server.fr"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value) }}
                    />
                    <Button callBack={() => { validateAddress() }} text="Validate" backgroundColor="#363841" textColor="#ffffff" half={3} size={true} />
                </div>
            </Modal>
        </>
    )
}

export default ChangeAddressComponent;
