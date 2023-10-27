// --- Librairies import --- //
import type { NextPage } from "next";

// --- Components import --- //
import Footer from "../../components/footer";
import HeaderPage from "../../components/SignInPage/Headers";
import MainContainer from "../../components/SignInPage/MainContainer";

const IndexPage: NextPage = () => {
    return (
        <>
            <HeaderPage />
            <MainContainer />
            <Footer />
        </>
    )
}

export default IndexPage;
