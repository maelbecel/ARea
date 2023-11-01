import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import NavBar, { LeftSection, RightSection } from "../../../../components/NavBar/navbar";
import Icon from "../../../../components/NavBar/components/Icon";
import SimpleLink from "../../../../components/NavBar/components/SimpleLink";
import Input from "../../../../components/formProfile/input";
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { UpdateAppletTitleWithID } from "../../../../utils/api/applet/applet";
import ModalError from "../../../../components/modalErrorNotif";

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
            <div className="flex items-center flex-col w-[100%] space-y-[5%] pb-[5%]">
                <div className="w-full flex flex-row justify-between font-bold text-white text-[24px]">
                    <Link href={`/myApplets/applet/${id}`}>
                            {/* Add a child element inside the Lipxnk */}
                            <a className="rounded-[25px] bg-[#363841] py-[1%] px-[4%] ml-[50px] mt-[50px]">Back</a>
                    </Link>
                </div>
                <div className="flex flex-col items-center w-full space-y-[8%] lg:space-y-[4%]">
                    <div className="w-[75%] lg:w-[45%] text-center">
                        <label className="text-[#363841] font-bold text-[42px] p-[1%] text-left lg:text-center">Change Title</label>
                    </div>
                    <div className="w-[75%] lg:w-[45%]">
                        <Input placeholder="Title" label="Title" value={newTitle} onChangeFunction={setNewTitle}/>
                    </div>
                    <div className="flex justify-center font-bold text-white text-[24px]">
                        <button className="rounded-[25px] bg-[#363841] py-[15%] px-[50%]" onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
                <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
            </div>
        </>
    );
};

export default IndexPage;