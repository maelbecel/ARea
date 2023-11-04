// --- Librairies import --- //
import type { NextPage } from "next";

// --- Components import --- //
import HeaderPage from "../../components/SignInPage/Headers";
import MainContainer from "../../components/SignInPage/MainContainer";
import Footer from "../../components/Footer/Footer";

const IndexPage: NextPage = () => {
    return (
        <>
            {/* --- Headers --- */}
            <HeaderPage />

            {/* --- Body --- */}
            <MainContainer />

            {/* --- Footer --- */}
            <Footer />
        </>
    );
}

export default IndexPage;
