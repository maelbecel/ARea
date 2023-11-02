// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

// --- Components import --- //
import NavBar, { LeftSection, RightSection } from "../../../components/NavBar/navbar";
import Icon from "../../../components/NavBar/components/Icon";
import TextContainer from "../../../components/Auth/TextContainer";
import Footer from "../../../components/footer";
import SimpleLink from "../../../components/NavBar/components/SimpleLink";
import { NavigateButton } from "../../../components/NavBar/components/Button";

const IndexPage: NextPage = () => {
    const route = useRouter();

    useEffect(() => {
        const checkAlreadyLogged = async () => {
            if (localStorage.getItem("token") !== null)
                route.push("/");
        }

        checkAlreadyLogged();
    }, [route]);

    const handleClick = async () => {
    }

    return (
        <>
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink   href="/sign-up" text="Sign up" />
                    <NavigateButton href="/login" text="Log in" />
                </RightSection>
            </NavBar>

            <div className="h-screen flex justify-center items-start">
                <TextContainer title="Forgot your password ?" submit="Reset password" handleClick={handleClick}>
                    {/*TODO: implement forgot your password */}
                </TextContainer>
            </div>

            <Footer />
        </>
    )
}

export default IndexPage;
