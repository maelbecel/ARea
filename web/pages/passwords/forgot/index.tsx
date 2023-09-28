// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

// --- Components import --- //
import NavBar, { Icon, LeftSection, NavBarNavigateButton, RightSection, SimpleLink } from "../../../components/navbar";
import TextContainer from "../../../components/auth/TextContainer";
import Footer from "../../../components/footer";

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
                    <NavBarNavigateButton href="/login" text="Log in" />
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
