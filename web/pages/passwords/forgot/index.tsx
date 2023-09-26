// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

// --- Provider import --- //
import { useAuth } from "../../../components/providers/AuthProvider";

// --- Components import --- //
import NavBar, { NavBarButton, SimpleLink } from "../../../components/navbar";
import TextContainer from "../../../components/auth/TextContainer";

const IndexPage: NextPage = () => {

    const { token } = useAuth();

    const route = useRouter();

    useEffect(() => {
        const checkAlreadyLogged = async () => {
            if (token)
                route.push("/");
        }

        checkAlreadyLogged();
    }, [route, token]);

    const handleClick = async () => {
    }

    return (
        <>
            <NavBar>
                <SimpleLink   href="/sign-up" text="Sign up" />
                <NavBarButton href="/login" text="Log in" />
            </NavBar>

            <div className="h-screen flex justify-center items-start">
                <TextContainer title="Forgot your password ?" submit="Reset password" handleClick={handleClick}>
                    {/*TODO: implement forgot your password */}
                </TextContainer>
            </div>
        </>
    )
}

export default IndexPage;
