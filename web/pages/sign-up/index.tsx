// --- Librairies import --- //
import type { NextPage } from "next";

// --- Components import --- //
import Footer from "../../components/footer";
import HeaderPage from "../../components/SignUpPage/Headers";
import MainContainer from "../../components/SignUpPage/MainContainer";

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
