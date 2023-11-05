// --- Librairies import --- //
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

// --- API --- //
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { UpdateAppletTitleWithID } from "../../../../utils/api/applet/applet";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../../../components/NavBar/navbar";
import SimpleLink from "../../../../components/NavBar/components/SimpleLink";
import Icon from "../../../../components/NavBar/components/Icon";
    // --- Body --- //
import Input from "../../../../components/Form/Profile/Input";
import Button from "../../../../components/Button/Button";
    // --- Error --- //
import ModalError from "../../../../components/Modal/modalErrorNotif";

const IndexPage: NextPage = () => {
    // --- Variables --- //
    const [newTitle        , setNewTitle]    = useState<string>("");
    const [modalErrorIsOpen, setIsErrorOpen] = useState<boolean>(false);

    // --- Router --- //
    const router = useRouter();

    const { id } = router.query;

    // --- Providers --- //
    const [token, setToken] = useState<string | null | undefined>("");

    useEffect(() => {
        setToken(localStorage.getItem("token") as string); 
    }, []);

    const handleConfirm = async () => {
        const data = await UpdateAppletTitleWithID(token as string, id as string, newTitle as string);

        if (data === false) {
            openModalError();
            return;
        }

        router.push(`/myApplets/applet/${id}`);
    }

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };

    useEffect(() => {
        if (token === null || token === undefined)
            router.push("/")
    }, [token, router]);
        
    return (
        <>
            {/* --- NavBar --- */}
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink href="/myApplets" text="My applets" />
                </RightSection>
            </NavBar>
    
            {/* --- Body --- */}
            <div className="flex items-center flex-col w-[100%] space-y-[5%] pb-[5%] p-[5%]">
                {/* --- Back Button --- */}
                <div className="w-full flex flex-row justify-between font-bold text-white text-[24px]">
                    <Button text={"Back"}
                            callBack={() => { router.back() }}
                            backgroundColor={"#363841"}
                            textColor={"#ffffff"}
                            size={false}
                            half={1}
                    />
                </div>
    
                {/* --- Form --- */}
                <div className="flex flex-col items-center w-full space-y-[8%] lg:space-y-[4%]">
                    <div className="w-[75%] lg:w-[45%] text-center">
                        <label className="text-[#363841] font-bold md:text-[42px] text-[32px] p-[1%] text-left lg:text-center">Change Title</label>
                    </div>
                    <div className="w-[75%] lg:w-[45%]">
                        <Input placeholder="Title" label="Title" value={newTitle} onChangeFunction={setNewTitle}/>
                    </div>
                    <Button text={"Confirm"}
                            callBack={() => { handleConfirm() }}
                            backgroundColor={"#363841"}
                            textColor={"#ffffff"}
                            size={true}
                            half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 3 : 1}
                    />
                </div>
    
                {/* --- Error --- */}
                <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
            </div>
        </>
    );
};

export default IndexPage;