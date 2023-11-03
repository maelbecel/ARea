import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import NavBar, { LeftSection, RightSection } from "../../../../components/NavBar/navbar";
import Icon from "../../../../components/NavBar/components/Icon";
import SimpleLink from "../../../../components/NavBar/components/SimpleLink";
import Input from "../../../../components/Form/Profile/Input";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { UpdateAppletTitleWithID } from "../../../../utils/api/applet/applet";
import ModalError from "../../../../components/Modal/modalErrorNotif";
import Button from "../../../../components/Button/Button";

const IndexPage: NextPage = () => {

    const router = useRouter();
    const { id } = router.query;
    const { token, setToken } = useToken();
    const [newTitle, setNewTitle] = React.useState<string>("");

    const handleConfirm = async () => {
        const data = await UpdateAppletTitleWithID(token as string, id as string, newTitle as string);

        if (data === false) {
            openModalError();
            return;
        }

        router.push(`/myApplets/applet/${id}`);
    }

    const [modalErrorIsOpen, setIsErrorOpen] = useState(false);

    const openModalError = () => {
        setIsErrorOpen(true);
    };

    const closeModalError = () => {
        setIsErrorOpen(false);
    };
        
    return (
        <>
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink   href="/myApplets" text="My applets" />
                </RightSection>
            </NavBar>
            <div className="flex items-center flex-col w-[100%] space-y-[5%] pb-[5%] p-[5%]">
                <div className="w-full flex flex-row justify-between font-bold text-white text-[24px]">
                    <Button text={"Back"}
                            callBack={() => { router.back() }}
                            backgroundColor={"#363841"}
                            textColor={"#ffffff"}
                            size={false}
                            half={1}
                    />
                </div>
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
                <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
            </div>
        </>
    );
};

export default IndexPage;