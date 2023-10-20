import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NavBar, { LeftSection, RightSection } from "../../../../components/NavBar/navbar";
import SimpleLink from "../../../../components/NavBar/components/SimpleLink";
import Icon from "../../../../components/NavBar/components/Icon";

const IndexPage: NextPage = () => {

    const router = useRouter();
    const { id } = router.query;

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
        </>
    );
};

export default IndexPage;