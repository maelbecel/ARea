import { useRouter } from "next/router";
import NavBar, { LeftSection, RightSection } from "../NavBar/navbar";
import Button from "../Button/Button";
import SimpleLink from "../NavBar/components/SimpleLink";
import Icon from "../NavBar/components/Icon";
import Profile from "../NavBar/components/Profile";

const PageHeaders = ({ connected, email } : { connected: boolean, email: string }) => {
    const router = useRouter();

    return (
        <>
            {connected ? (
                <NavBar>
                    <LeftSection>
                        <Icon />
                    </LeftSection>
                    <RightSection>
                        <SimpleLink href="/myApplets" text="My applets" />
                        <Button callBack={() => { router.push("/create") }} text="Create" backgroundColor={"#363841"} textColor={"#ffffff"} />
                        <Profile email={email} />
                    </RightSection>
                </NavBar>
            ) : (
                <NavBar color={"222222"}>
                    <LeftSection>
                        <Icon theme={"dark"} />
                    </LeftSection>
                    <RightSection color={"222222"}>
                        <SimpleLink href="/sign-up" text="Sign up" theme={"dark"} />
                        <Button callBack={() => { router.push("/login") }} text="Sign in" backgroundColor={"#ffffff"} textColor={"#222222"} />
                    </RightSection>
                </NavBar>
            )}
        </>
    )
};

export default PageHeaders;
