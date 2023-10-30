import { useRouter } from "next/router";
import Button from "../Button/Button";
import Icon from "../NavBar/components/Icon";
import NavBar, { LeftSection, RightSection } from "../NavBar/navbar";

const HeaderPage = () => {
    const router = useRouter();

    return (
        <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <Button callBack={() => { router.push("/login") }} text="Log in" backgroundColor="#363841" textColor="#ffffff" half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 0 : 1} />
            </RightSection>
        </NavBar>
    )
}

export default HeaderPage;
