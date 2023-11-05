# Web-Pages

## [Home.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/index.tsx)

The Home pages is a pages where the user start when he come on the site. It's a page that can display two different screen depending on the user state.
* If the user is not connected, he will see a help page, for him to understand what the site is about and how to use it.
* If the user is connected, he will see a page with all the different service available for him to use.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies --- //
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'

// --- API --- //
import { useToken } from '../utils/api/user/Providers/TokenProvider';
import { useUser } from '../utils/api/user/Providers/UserProvider';
import { GetProfile } from '../utils/api/user/me';

// --- Interface --- //
import { UserProfile } from '../utils/api/user/interface/interface';

// --- Components --- //
import PageHeaders from '../components/HomePage/Headers';
import HomeDownloadAPKContainer from '../components/HomePage/Container/HomeDownloadAPKContainer';
import HomeExploreContainer from '../components/HomePage/Container/HomeExploreContainer';
import HomeDetailsContainer from '../components/HomePage/Container/HomeDetailsContainer';
import HomeStartContainer from '../components/HomePage/Container/HomeStartContainer';
import Footer from '../components/Footer/Footer';
```

Then we create a state for the user, for know if he is connected or not. And a state for the user profile, to store the user information.
```typescript
const [connected, setConnected] = useState<boolean>(false);
```

Then we create initialize the different hooks we will need.
```typescript
const { user , setUser  } = useUser();
const { token, setToken } = useToken();
```

Then at the first frame, we will check if the user got redirect from a Google login.
If he did, we will get the token from the URL and store it in the local storage.
Then we will set the user state to loginWithService to true, so the user can see the different service available to him.
```typescript
useEffect(() => {
    const queryToken = router.query.token as string;

    if (queryToken === undefined)
        return;
    setToken(queryToken);

    localStorage.setItem("token", queryToken);

    setConnected(true);
}, [router, setToken]);
```

Then we check if the site have a user token already stored in the local storage.
If it does, the user will be connected.
```typescript
useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
      setConnected(true);
    else
      setConnected(false);
}, [setToken, token]);
```

Then we check if the user is connected, we will get his profile information.
```typescript
useEffect(() => {
    if (connected === false)
        return;

    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
  }, [token, user, setUser, connected]);
```

Then we return the different component depending on the user state.
```typescript
return (
    <>
        {/* --- Headers --- */}
        <PageHeaders connected={connected} email={user?.email} />

        {/* --- Body --- */}
        <div className="w-full min-h-screen">
            {connected ? (
                <>
                    {/* --- Connected --- */}
                    <HomeExploreContainer />
                </>
            ) : (
                <>
                    {/* --- Not Connected --- */}
                    <HomeStartContainer />
                    <HomeDownloadAPKContainer />
                    <HomeDetailsContainer />
                </>
            )}
        </div>
    
        {/* --- Footer --- */}
        <Footer />
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Home.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/index.tsx)

## [Sign-up.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/sign-up/index.tsx)

The Sign up pages is a pages where the user can create an account on the site.
In this pages, the user can create an account with his email, username and password, or with his Google account.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import type { NextPage } from "next";

// --- Components import --- //
import HeaderPage from "../../components/SignUpPage/Headers";
import MainContainer from "../../components/SignUpPage/MainContainer";
import Footer from "../../components/Footer/Footer";
```

In the function, we only return the renderer of the different component.
```typescript
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
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Sign-up.tsx](https://github.com/maelbecel/ARea/blobl/master/web/pages/sign-up/index.tsx)

## [Login.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/login/index.tsx)

The Log in pages is a pages where the user can connect to his account on the site.
In this pages, the user can connect with his email and password, or with his Google account.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import type { NextPage } from "next";

// --- Components import --- //
import HeaderPage from "../../components/SignInPage/Headers";
import MainContainer from "../../components/SignInPage/MainContainer";
import Footer from "../../components/Footer/Footer";
```

In the function, we only return the renderer of the different component.
```typescript
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
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Login.tsx](https://github.com/maelbecel/ARea/blobl/master/web/pages/login/index.ts)

## [Profile.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/profile/index.tsx)

The Profile pages is a pages where the user can see his profile information and change them.
In this pages, the user can change his username, email and password.
He can link and unlink his account from different service like Google, GitHub and so on...

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Body --- //
import ProfilePicture from "../../components/ProfilePage/ProfilePicture";
import FormProfile from "../../components/Form/Profile/FormProfile";
import UpdateButton from "../../components/Button/UpdateButton";
import LinkedAccounts from "../../components/ProfilePage/LinkedAccounts";
import LogoutButton from "../../components/Button/LogoutButton";
import DeleteButton from "../../components/Button/DeleteButton";
```

Then we create different state for username and email.
```typescript
const [username, setUsername] = useState<string>("");
const [email   , setEmail]    = useState<string>("");
```

Then we initialize the different hooks we will need.
```typescript
const { user , setUser  } = useUser();
const { token, setToken } = useToken();
```

Then we get the user profile information.
```typescript
useEffect(() => {
    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile)
    }

    if (user?.email === undefined || user?.email === "" || user?.email === null)
        getProfile(token);
}, [setUser, token, user]);
```

When the user is updated, we update the username and email state.
```typescript
useEffect(() => {
    setUsername(user?.username as string);
    setEmail(user?.email as string);
}, [user]);
```

Then we return the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink   href="/myApplets" text="My applets" />
                <NavigateButton href="/create"             text="Create" />
                <Profile email={user?.email} />
            </RightSection>
        </NavBar>

        {/* --- Body --- */}
        <div className="min-h-screen flex flex-col items-center">
            {/* --- Profile --- */}
            <div className="w-[75%] lg:w-[30%]">
                {/* --- Profile Picture --- */}
                <div className="my-[32px]">
                    <ProfilePicture/>
                </div>
                    
                {/* --- Form --- */}
                {user &&
                    <FormProfile
                        username={username}
                        mail={email}
                        password={"a".repeat(user?.passwordLength)}
                        loginWithService={user?.loginWithService}
                        setUsernameFunction={setUsername}
                        setMailFunction={setEmail}
                    />
                }
                <UpdateButton username={username} email={email} token={token} setToken={setToken}/>

                {/* --- Linked Accounts --- */}
                <LinkedAccounts />
            </div>

            {/* --- Logout & Delete --- */}
            <LogoutButton/>
            <DeleteButton token={token}/>
        </div>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Profile.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/profile/index.tsx)

## [Profile/ChangePassword.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/profile/changePassword/index.tsx)

The Change Password pages is a pages where the user can change his password. For that he will need to fill three input :
* His old password
* His new password
* His new password confirmation

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Imports --- //
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

// --- API --- //
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../../utils/api/user/Providers/UserProvider";
import { GetProfile, PatchProfilePassword } from "../../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../../components/NavBar/navbar";
import { NavigateButton } from "../../../components/NavBar/components/Button";
import SimpleLink from "../../../components/NavBar/components/SimpleLink";
import Profile from "../../../components/NavBar/components/Profile";
import Icon from "../../../components/NavBar/components/Icon";
    // --- Body --- //
import Input from "../../../components/Form/Profile/Input";
    // --- Error --- //
import ModalError from "../../../components/Modal/modalErrorNotif";
```

Then we create a state for the old password, the new password and the new password confirmation.
```typescript
const [currentPassword, setCurrentPassword] = useState<string>("");
const [newPassword    , setNewPassword]     = useState<string>("");
const [confirmPassword, setConfirmPassword] = useState<string>("");
```

Then we initialize the different hooks we will need.
```typescript
const { user , setUser  } = useUser();
const { token, setToken } = useToken();
```

Then we get the user profile information.
```typescript
useEffect(() => {
    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [setUser, token, user])
```

Then we create a function that will send the data to the API. And check the response.
If the response is null, we will open the error modal.
Else we will redirect the user to the profile page.
```typescript
const handleConfirm = async () => {
    const data = await PatchProfilePassword(token, currentPassword, newPassword, confirmPassword);
    
    (data === null) ? openModalError() : router.push("/profile");
};
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink     href="/myApplets" text="My applets" />
                <NavigateButton href="/create"    text="Create"     />
                <Profile email={user?.email} />
            </RightSection>
        </NavBar>

        {/* --- Body --- */}
        <div className="flex items-center flex-col w-[100%] space-y-[5%] pb-[5%]">
            {/* --- Back Button --- */}
            <div className="w-full flex flex-row justify-between font-bold text-white text-[24px]" onClick={() => { router.back() }}>
                <a className="rounded-[25px] bg-[#363841] py-[1%] px-[4%] ml-[50px] mt-[50px]">
                    Back
                </a>
            </div>
    
            {/* --- Form --- */}
            <div className="flex flex-col items-center w-full space-y-[8%] lg:space-y-[4%]">
                <div className="w-[90%] md:w-[75%] lg:w-[45%] text-center">
                    <label className="text-[#363841] font-bold text-[34px] md:text-[42px] p-[1%] text-left lg:text-center">
                        Change password
                    </label>
                </div>
                <InputBox placeholder="Current Password" label="Current Password" value={currentPassword} onChangeFunction={handleCurrentPasswordChange} secureMode={true} />
                <InputBox placeholder="New Password"     label="New Password"     value={newPassword}     onChangeFunction={handleNewPasswordChange}     secureMode={true} />
                <InputBox placeholder="Confirm Password" label="Confirm Password" value={confirmPassword} onChangeFunction={handleConfirmPasswordChange} secureMode={true} />
                <div className="flex justify-center font-bold text-white text-[24px]">
                    <button className="rounded-[25px] bg-[#363841] py-[15%] px-[50%]" onClick={handleConfirm}>Confirm</button>
                </div>
            </div>

            {/* --- Error --- */}
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </div>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Profile/ChangePassword.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/profile/changePassword/index.tsx)

## [Privacy.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/privacy/index.tsx)

The Privacy pages is a pages where the user can see the privacy policy of the site.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Footer --- //
import Footer from "../../components/Footer/Footer";
```

Then we create the user connected state. For change the navbar status.
```typescript
const [connected, setConnected] = useState<boolean>(false);
```

Then we initialize the different hooks we will need.
```typescript
const { token, setToken } = useToken();
const { user , setUser  } = useUser();
```

Then we check if the user is connected or not.
```typescript
useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
        setConnected(true);
    else
        setConnected(false);
}, [setToken, token]);
```

Then we get the user profile information. Only, if the user is connected.
```typescript
useEffect(() => {
    if (connected === false)
        return;

    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [connected, setUser, token, user]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        {connected ? (
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink     href="/myApplets" text="My applets" />
                    <NavigateButton href="/create"    text="Create"     />
                    <Profile email={user?.email} />
                </RightSection>
            </NavBar>
        ) : (
            <NavBar>
                <LeftSection>
                    <Icon />
                </LeftSection>
                <RightSection>
                    <SimpleLink     href="/sign-up" text="Sign up" />
                    <NavigateButton href="/login"   text="Login"   />
                </RightSection>
            </NavBar>
        )}

        {/* --- Body --- */}
        <div className="h-screen">
            <div className="flex flex-col w-3/5 mx-auto justify-center text-[24px] sm:text-[48px] text-[#363841] font-bold h-[100%]">
                <div className="text-center">Hope you are enjoying this website, this is an Epitech student project</div>
                <div className="text-center">Thanks to Zertus we can host our Api to make the website working as expected</div>
            </div>
        </div>
        <Footer/>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Privacy.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/privacy/index.tsx)

## [MyApplets.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/myApplets/index.tsx)

The My Applets pages is a pages where the user can see all the applets he created.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import type { NextPage } from "next";
import { useEffect } from "react";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, {RightSection, LeftSection} from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Body --- //
import SearchApplet from "../../components/Applet/Components/SearchApplet";
    // --- Footer --- //
import Footer from '../../components/Footer/Footer'
```

Then we initialize the different hooks we will need.
```typescript
const { user , setUser } = useUser();
const { token } = useToken();
```

Then we get the user profile information.
```typescript
useEffect(() => {
    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [setUser, token, user]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <NavigateButton href="/create" text="Create" />
                <Profile email={user?.email} />
            </RightSection>
        </NavBar>

        {/* --- Body --- */}
        <div className="w-full min-h-screen bg-background">
            {/* --- Title --- */}
            <div className="flex items-center mt-[2em]">
                <div className="w-full flex justify-center items-center">
                    <h1 className="text-center font-extrabold text-[#363841] text-[2.6rem] mb-[1em] w-full">
                        Explore your applets
                    </h1>
                </div>
            </div>

            {/* --- Search --- */}
            <SearchApplet />
        </div>

        {/* --- Footer --- */}
        <Footer/>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [MyApplets.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/myApplets/index.tsx)

## [Applet.tsx]([id].tsx)

The Applet pages is a modulable pages that will display the applet the user want to see. In this pages the user will have all the information about the applet, and will be able to change the applet information.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

// --- API --- //
import { useServices } from "../../../utils/api/service/Providers/ServiceProvider";
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../../utils/api/user/Providers/UserProvider";
import { GetAppletWithID } from "../../../utils/api/applet/applet";
import { GetServices } from "../../../utils/api/service/service";
import { GetProfile } from "../../../utils/api/user/me";
import { getTheme } from "../../../utils/getTheme";

// --- Interface --- //
import { UserProfile } from "../../../utils/api/user/interface/interface";
import { Service } from "../../../utils/api/service/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../../components/NavBar/navbar";
import { NavigateButton } from "../../../components/NavBar/components/Button";
import SimpleLink from "../../../components/NavBar/components/SimpleLink";
import Icon from "../../../components/NavBar/components/Icon";
    // --- Body --- //
import AppletInfoContainer from "../../../components/Applet/Components/AppletInfoContainer";
import Profile from "../../../components/NavBar/components/Profile";
    // --- Footer --- //
import Footer from "../../../components/Footer/Footer";
```

Then we create a state for the applet information.
Also create a state for the background color and the theme for the modulable pages.
```typescript
const [dataApplet, setDataApplet] = useState<AppletProps | undefined>();
const [bgColor   , setBgColor]    = useState<string>('');
const [theme     , setTheme]      = useState<string>('');
```

Then we get the applet id from the URL.
```typescript
const router = useRouter();

const { id } = router.query;
```

Then we initialize the different hooks we will need.
```typescript
const { services, setServices } = useServices();
const { token   , setToken    } = useToken();
const { user    , setUser     } = useUser();
```

Then we get the user profile information.
```typescript
useEffect(() => {
    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [setUser, token, user]);
```

Then when we got the id of the applet, get the applet information.
```typescript
useEffect(() => {
    if (id == undefined)
        return;

    if (token === "") {
        const tokenStore = localStorage.getItem("token");

        if (tokenStore === null) {
            router.push("/");
            return;
        }
        setToken(tokenStore);
    }

    const dataFetch = async () => {
        setDataApplet(await GetAppletWithID(token, id as string));
    };

    dataFetch();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id, token]);
```

Then we get the different service available. And set the background color and the theme of the current one.
```typescript
 useEffect(() => {
    if (dataApplet === undefined || dataApplet === null || bgColor !== '')
        return;

    if (services.length === 0) {
        if (token === "") {
            const tokenStore = localStorage.getItem("token");

            if (tokenStore === null) {
                router.push("/");
                return;
            }
            setToken(tokenStore);
        }
        getServices(token);
    }

    const Service: Service | undefined = services.find((Service: Service) => Service?.slug === dataApplet?.actionSlug.split('.')[0]);

    setBgColor(Service?.decoration?.backgroundColor ?? '#ffffff');

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dataApplet]);
```

Then we get the theme (dark or light) of the current background color.
```typescript
useEffect(() => {
    if (bgColor === '')
        return;
    setTheme(getTheme(bgColor));
}, [bgColor]);
```

Then we return the renderer of the different component.
```typescript
return (
    <div>
        {/* --- NavBar --- */}
        {dataApplet &&
            <NavBar color={bgColor.substring(1)}>
                <LeftSection>
                    <Icon theme={theme} />
                </LeftSection>
                <RightSection color={bgColor.substring(1)} theme={theme}>
                    <SimpleLink     href="/myApplets" text="My applets" theme={theme} />
                    <NavigateButton href="/create"    text="Create"     theme={theme} />
                    <Profile email={user?.email} theme={theme} />
                </RightSection>
            </NavBar>
        }

        {/* --- Body --- */}
        <div className={`min-h-screen`}>
            {dataApplet && 
                <AppletInfoContainer
                    id={dataApplet?.id}
                    name={dataApplet?.name}
                    color={bgColor}
                    theme={theme}
                    actionSlug={dataApplet?.actionSlug}
                    reactions={dataApplet?.reactions}
                    user={dataApplet?.user?.username}
                    enabled={dataApplet?.enabled}
                    createdAt={dataApplet?.createdAt}
                    notifUser={dataApplet?.notifUser}
                />
            }
        </div>

        {/* --- Footer --- */}
        <Footer />
    </div>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Applet.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/myApplets/applet/[id].tsx)

## [Applet/ModifyTitle.tsx](modifyTitle_[id].tsx)

The Modify Title of Applet pages is a pages where the user can change the title of his applet.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import React, { useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

// --- API --- //
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";
import { UpdateAppletTitleWithID } from "../../../../utils/api/applet/applet";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../../../components/NavBar/navbar";
import SimpleLink from "../../../../components/NavBar/components/SimpleLink";
import Icon from "../../../../components/NavBar/components/Icon";
    // --- Body --- //
import Input from "../../../../components/Form/Profile/Input";
import Button from "../../../../components/Button/Button";
    // --- Error --- //
import ModalError from "../../../../components/Modal/modalErrorNotif";
```

Then we create a state for the new title and the error modal.
```typescript
const [newTitle        , setNewTitle]    = useState<string>("");
const [modalErrorIsOpen, setIsErrorOpen] = useState<boolean>(false);
```

Then we get the applet id from the URL.
```typescript
const router = useRouter();

const { id } = router.query;
```

Then we initialize the different hooks we will need.
```typescript
const { token } = useToken();
```

Then we create a function that will send the data to the API. And check the response.
If the response is null, we will open the error modal.
Else we will redirect the user to the applet page.
```typescript
const handleConfirm = async () => {
    const data = await UpdateAppletTitleWithID(token as string, id as string, newTitle as string);

    if (data === false) {
        openModalError();
        return;
    }

    router.push(`/myApplets/applet/${id}`);
};
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink href="/myApplets" text="My applets" />
            </RightSection>
        </NavBar>

        {/* --- Body --- */}
        <div className="flex items-center flex-col w-[100%] space-y-[5%] pb-[5%] p-[5%]">
            {/* --- Back Button --- */}
            <div className="w-full flex flex-row justify-between font-bold text-white text-[24px]">
                <Button text={"Back"}
                        callBack={() => { router.back() }}
                        backgroundColor={"#363841"}
                        textColor={"#ffffff"}
                        size={false}
                        half={1}
                />
            </div>

            {/* --- Form --- */}
            <div className="flex flex-col items-center w-full space-y-[8%] lg:space-y-[4%]">
                <div className="w-[75%] lg:w-[45%] text-center">
                    <label className="text-[#363841] font-bold md:text-[42px] text-[32px] p-[1%] text-left lg:text-center">Change Title</label>
                </div>
                <div className="w-[75%] lg:w-[45%]">
                    <Input placeholder="Title" label="Title" value={newTitle} onChangeFunction={setNewTitle}/>
                </div>
                <Button text={"Confirm"}
                        callBack={() => { handleConfirm() }}
                        backgroundColor={"#363841"}
                        textColor={"#ffffff"}
                        size={true}
                        half={(typeof window !== 'undefined' && window.innerWidth < 768) ? 3 : 1}
                />
            </div>

            {/* --- Error --- */}
            <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        </div>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Applet/ModifyTitle.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/myApplets/applet/modifyTitle/[id].tsx)

## [Applet/ModifyApplet.tsx](modifyApplet_[id].tsx)

The Modify Applet pages is a pages where the user can change the information of his applet. Like the name, the action, the reaction and so on...
He can delete reactions, change them or add new ones.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Libraries --- //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

// --- API --- //
import { useToken } from "../../../../utils/api/user/Providers/TokenProvider";

// --- Interface --- //
import { ActionApplet, ReactionApplet, defaultReactionsApplet } from "../../../../components/Applet/Interface/interface";
import { GetAppletWithID } from "../../../../utils/api/applet/applet";
import EditPages from "../../../../components/Applet/Edit/Pages/EditPages";

// --- Components --- //
import AllActionFromServicePages from "../../../../components/Applet/Create/Pages/AllActionFromServicePages";
import FillActionInputsPages from "../../../../components/Applet/Create/Pages/FillActionInputsPages";
import ServiceConnexionPages from "../../../../components/Applet/Create/Pages/ServiceConnexionPages";
import SearchServicePages from "../../../../components/Applet/Create/Pages/SearchServicePages";
import Footer from "../../../../components/Footer/Footer";
```

Then we create a state for the pagination of the edit state, the edit mode (for if we add a reaction or edit ones), and the applet data.
```typescript
const [pages     , setPages]      = useState<number>(-1);
const [editMode  , setEditMode]   = useState<boolean>(false);
const [dataApplet, setDataApplet] = useState<any>(undefined);
const [action    , setAction]     = useState<ActionApplet>({} as ActionApplet);
const [reactions , setReactions]  = useState<ReactionApplet[]>([] as ReactionApplet[]);
```

Then we get the applet id from the URL.
```typescript
const router = useRouter();

const { id } = router.query;
```

Then we initialize the different hooks we will need.
```typescript
const { token } = useToken();
```

Then we get the applet information.
```typescript
useEffect(() => {
    if (id === undefined && pages === -1) {
        localStorage.removeItem("action");
        localStorage.removeItem("reactions");
        return;
    }

    if (pages === -1) {
        // Get the applet
        const dataFetch = async () => {
            setDataApplet(await GetAppletWithID(token, id as string));
        };

        dataFetch();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);
```

Then we parse the data that we got for the applet.
```typescript
const parseDataAppletToAREA = (data: any) => {
    let action: ActionApplet = {
        actionSlug: data.actionSlug,
        actionInputs: data.actionData
    };

    let reactions: ReactionApplet[] = [];

    for (let i = 0; i < data.reactions.length; i++) {
        reactions.push({
            reactionSlug: data.reactions[i].reactionSlug,
            reactionInputs: data.reactions[i].reactionData
        });
    }

    setAction(action);
    setReactions(reactions);
};

useEffect(() => {
    if (dataApplet === undefined)
        return;
    parseDataAppletToAREA(dataApplet);
}, [dataApplet]);
```

Then we check if the user is connected or not, if it's not we redirect him to the home pages.
```typescript
useEffect(() => {
    if (token === null)
        router.push("/")
}, [token, router]);
```

Then when the user change the edit step, we refresh the window and scroll to the top.
```typescript
useEffect(() => {
    if (pages === 0)
        setEditMode(false);
    window.scrollTo(0, 0);
}, [pages]);
```

Then we get the action and the reactions of the applet
```typescript
useEffect(() => {
    if (pages !== 0 && pages !== -1) {
        const actionStr = localStorage.getItem("action") as string;

        // --- If there is no action, return --- //
        if (actionStr === null) {
            setAction({} as ActionApplet);
            return;
        }

        setAction(JSON.parse(actionStr) as ActionApplet);
    }
}, [pages]);

useEffect(() => {
    if (pages !== 0 && pages !== -1) {
        const reactionsStr = localStorage.getItem("reactions") as string;

        if (reactionsStr === null) {
            setReactions(defaultReactionsApplet);
            return;
        }

        setReactions(JSON.parse(reactionsStr) as ReactionApplet[]);
    }
}, [pages]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {(pages === 0 || pages === -1) ? (<EditPages   setPages={setPages} setEditMode={setEditMode} action={action} setAction={setAction} reactions={reactions} setReactions={setReactions} applet={dataApplet} />) : null}
        {(pages === 1) ? (<SearchServicePages          setPages={setPages} pages={pages} />) : null}
        {(pages === 2) ? (<AllActionFromServicePages   setPages={setPages} back={false} />) : null}
        {(pages === 3) ? (<ServiceConnexionPages       setPages={setPages} />) : null}
        {(pages === 4) ? (<FillActionInputsPages       setPages={setPages} EditMode={editMode} setAction={setAction} setReactions={setReactions} setEditMode={setEditMode} />) : null}

        {pages !== 3 && pages !== 4 && <Footer />}
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Applet/ModifyApplet.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/myApplets/applet/modifyApplet/[id].tsx)

## [Install-step.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/install-step/index.tsx)

The Install Step pages is a pages where the user can see the different step to install the AREA applet on his phone with the APK.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies --- //
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'

// --- API --- //
import { useToken } from '../../utils/api/user/Providers/TokenProvider';
import { useUser } from '../../utils/api/user/Providers/UserProvider';
import { GetProfile } from '../../utils/api/user/me';

// --- Interface --- //
import { UserProfile } from '../../utils/api/user/interface/interface';

// --- Components --- //
import PageHeaders from '../../components/InstallStepPage/Headers';
import TitleContainer from '../../components/InstallStepPage/Container/TitleContainer';
import StepContainer from '../../components/InstallStepPage/Container/StepContainer';
import Footer from '../../components/Footer/Footer';
```

Then we create a state for the user connected.
```typescript
const [connected, setConnected] = useState<boolean>(false);
```

Then we initialize the different hooks we will need.
```typescript
const { token, setToken } = useToken();
const { user , setUser  } = useUser();
```

Then we check if the user is connected or not.
```typescript
useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
        setConnected(true);
    else
        setConnected(false);
}, [token, setToken]);
```

Then we get the user profile information.
```typescript
useEffect(() => {
    if (connected === false)
        return;

    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [token, user, setUser, connected]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        <PageHeaders connected={connected} email={user?.email} />

        {/* --- Body --- */}
        <div className="w-full min-h-screen text-[#363841]">
            <TitleContainer />
            <StepContainer />
        </div>

        {/* --- Footer --- */}
        <Footer />
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Install-step.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/install-step/index.tsx)

## [Help.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/help/index.tsx)

The help pages is a pages where all vocabulary of the website is explained.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from 'next/image';

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Footer --- //
import Footer from "../../components/Footer/Footer";
```

Then we create unique component for this page only.
```typescript
const Title = ({ title } : { title: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] sm:text-[40px] text-[30px] font-bold text-[#363841] flex flex-col items-center sm:items-start">
            {title}
        </div>
    );
};

const SubTitle = ({ title } : { title: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] sm:text-[32px] text-[24px] font-bold text-[#363841] flex flex-col items-center sm:items-start text-center sm:text-left">
            {title}
        </div>
    );
};

const Description = ({ description } : { description: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] text-[20px] sm:text-[30px] font-medium text-[#363841] flex flex-col items-center sm:items-start">
            {description}
        </div>
    );
};

const SpanDescription = ({ description } : { description: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] text-[20px] sm:text-[30px] font-bold text-[#363841] flex flex-col items-center sm:items-start text-center sm:text-left">
            {description}
        </div>
    );
};

const ImageContainer = ({ src } : { src: string }) => {
    return (
        <div className="flex justify-center p-[5%] w-auto h-[50%]">
            <Image src={src} alt="Service" width={500} height={500}/>
        </div>
    );
};
```

Then we create a state for the user connected.
```typescript
const [connected, setConnected] = useState<boolean>(false);
```

Then we initialize the different hooks we will need.
```typescript
const { token, setToken } = useToken();
const { user , setUser  } = useUser();
```

Then we check if the user is connected or not.
```typescript
useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
        setConnected(true);
    else
        setConnected(false);
}, [token, setToken]);
```

Then we get the user profile information.
```typescript
useEffect(() => {
    if (connected === false)
        return;

    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [token, user, setUser, connected]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        {connected ? (
            <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink     href="/myApplets" text="My applets" />
                <NavigateButton href="/create"    text="Create" />
                <Profile email={user?.email} />
            </RightSection>
            </NavBar>
        ) : (
            <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink     href="/sign-up" text="Sign up" />
                <NavigateButton href="/login"   text="Login" />
            </RightSection>
            </NavBar>
        )}

        {/* --- Body --- */}
        <div className="min-h-screen flex flex-col w-3/5 mx-auto justify-start py-[2%]">
            <Title title={"Words to know"} />
            <Description description={`We use some words that you may not be familiar with yet, so here’s a quick run down to get you started.`} />
            <SubTitle title={"Applets"} />
            <Description description={`Applets are automations that connect two or more services to create a new experience. For example, an Applet can turn up your heat if the weather drops below a certain temperature.`} />
            <SubTitle title={"Triggers, actions and queries"} />
            <Description description={`These are the building blocks of an Applet, each one plays an important role in the automation. Each service has unique triggers, queries, and actions that allow you to build different Applets`} />
            <SubTitle title={"Ingredients (placeholders)"} />
            <Description description={`Ingredients are part of the triggers and actions, little individual pieces of information. A user will take these ingredients and use them to fill in fields.`} />
            <Title title={"Creating an Applet"} />
            <SpanDescription description="Making your own Applet is simple. Start with the trigger, which is the If This part of the Applet." />
            <Description description={`“Action”… occurs your Applet will begin. You may need to connect your account from the chosen service to authenticate it, which means that Area51 will be able to know when the trigger occurs.`} />
            <ImageContainer src={"/Images/image7.svg"} />
            <SpanDescription description="Next, select your action, the “Then That” portion of your Applet, which will happen when the Applet is triggered." />
            <ImageContainer src={"/Images/image8.svg"} />
            <SpanDescription description={"To complete the Applet, select Continue, modify the name of the Applet (optional), and select Finish."} />
            <ImageContainer src={"/Images/image9.svg"} />
        </div>

        {/* --- Footer --- */}
        <Footer/>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Help.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/help/index.tsx)




## [Create.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/create/index.tsx)

The Create Applet pages is a pages where the user can create is own applet.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";

// --- Interface --- //
import { ActionApplet, ReactionApplet, defaultActionApplet, defaultReactionsApplet } from "../../components/Applet/Interface/interface";

// --- Components --- //
import CreatePages from "../../components/Applet/Create/Pages/CreatePages";
import SearchServicePages from "../../components/Applet/Create/Pages/SearchServicePages";
import AllActionFromServicePages from "../../components/Applet/Create/Pages/AllActionFromServicePages";
import ServiceConnexionPages from "../../components/Applet/Create/Pages/ServiceConnexionPages";
import FillActionInputsPages from "../../components/Applet/Create/Pages/FillActionInputsPages";
import ValidatePages from "../../components/Applet/Create/Pages/ValidatePages";
import Footer from "../../components/Footer/Footer";
```

Then we create a state for the pagination of the edit state, the edit mode (for if we add a reaction or edit ones), the action and reactions data and so on...
```typescript
const [pages    , setPages]     = useState<number>(-1);
const [editMode , setEditMode]  = useState<boolean>(false);
const [back     , setBack]      = useState<boolean>(false);
const [action   , setAction]    = useState<ActionApplet>({} as ActionApplet);
const [reactions, setReactions] = useState<ReactionApplet[]>([] as ReactionApplet[]);
```

Then we initialize the different hooks we will need.
```typescript
const { token } = useToken();
```

Then we get the query and check default value that been set.
```typescript
// --- Router --- //
const router = useRouter();

useEffect(() => {
    const pageStr = router.query.page as string;

    if (pageStr === undefined)
        return;
    else {
        setPages(parseInt(pageStr));
        setAction(defaultActionApplet);
        setReactions(defaultReactionsApplet);

        localStorage.setItem("action", JSON.stringify(defaultActionApplet));
        localStorage.setItem("reactions", JSON.stringify(defaultReactionsApplet));
    }

    const service = router.query.service as string;

    if (service !== undefined) {
        const actionStr = localStorage.getItem("action") as string;
        let newAction = JSON.parse(actionStr) as ActionApplet;

        newAction.actionSlug = service;

        setAction(newAction);

        localStorage.setItem("action", JSON.stringify(newAction));
    } else
        setPages(0);

    router.push("/create", undefined, { shallow: true });

    const back = router.query.back as string;

    if (back !== undefined)
        setBack(true);
    else
        setBack(false);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [router]);
```

Then we check if the user is connected or not, if it's not we redirect him to the home pages.
```typescript
useEffect(() => {
    if (token === null)
        router.push("/")
}, [token, router]);
```

Then when the user change the edit step, we refresh the window and scroll to the top.
```typescript
useEffect(() => {
    if (pages === 0)
        setEditMode(false);
    window.scrollTo(0, 0);
}, [pages]);
```

Then we get the action and the reactions of the applet
```typescript
useEffect(() => {
    if (pages !== 0 && pages !== -1) {
        const actionStr = localStorage.getItem("action") as string;

        // --- If there is no action, return --- //
        if (actionStr === null) {
            setAction({} as ActionApplet);
            return;
        }

        setAction(JSON.parse(actionStr) as ActionApplet);
    }
}, [pages]);

useEffect(() => {
    if (pages !== 0 && pages !== -1) {
        const reactionsStr = localStorage.getItem("reactions") as string;

        if (reactionsStr === null) {
            setReactions(defaultReactionsApplet);
            return;
        }

        setReactions(JSON.parse(reactionsStr) as ReactionApplet[]);
    }
}, [pages]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {(pages === 0 || pages === -1) ? (<CreatePages setPages={setPages} setEditMode={setEditMode} action={action} setAction={setAction} reactions={reactions} setReactions={setReactions} />) : null}
        {(pages === 1) ? (<SearchServicePages          setPages={setPages} pages={pages} />) : null}
        {(pages === 2) ? (<AllActionFromServicePages   setPages={setPages} back={back} />) : null}
        {(pages === 3) ? (<ServiceConnexionPages       setPages={setPages} />) : null}
        {(pages === 4) ? (<FillActionInputsPages       setPages={setPages} EditMode={editMode} setAction={setAction} setReactions={setReactions} setEditMode={setEditMode} />) : null}
        {(pages === 5) ? (<ValidatePages               setPages={setPages} />) : null}

        {pages !== 3 && pages !== 4 && <Footer />}
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Create.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/create/index.tsx)

## [Contact.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/contact/index.tsx)

The Contact pages is a pages where the user can get the email address of all the team member of the AREA project.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";

// --- API --- //
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Footer --- //
import Footer from "../../components/Footer/Footer";
```

Then we create unique component for this page only.
```typescript
const Title = ({ title } : { title: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] text-[48px] font-bold text-[#363841] flex flex-col items-center sm:items-start">
            {title}
        </div>
    );
};

const Description = ({ title, description } : { title: string, description: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
            <div className="text-[#00B2FF] font-bold text-[28px] break-all">
                {title}
            </div>
            <div className="text-[#363841] font-medium text-[28px]">
                {description}
            </div>
        </div>
    );
};

const DescriptionWithNavigation = ({ title, description, hyperlink, textOfLink } : { title: string, description: string, hyperlink: string, textOfLink: string }) => {
    return (
        <div className="pb-[15%] sm:pb-[2%] flex flex-col items-center sm:items-start">
            <div className="text-[#00B2FF] font-bold text-[28px] break-all">
                {title}
            </div>
            <div className="text-[#363841] font-medium text-[28px]">
                {description}
                <Link href={hyperlink}>
                    <a className="text-[#00B2FF]">
                        {textOfLink}
                    </a>
                </Link>
            </div>
        </div>
    );
};
```

Then we create a state for the user connected.
```typescript
const [connected, setConnected] = useState<boolean>(false);
```

Then we initialize the different hooks we will need.
```typescript
const { token, setToken } = useToken();
const { user , setUser  } = useUser();
```

Then we check if the user is connected or not.
```typescript
useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
        setConnected(true);
    else
        setConnected(false);
}, [token, setToken]);
```

Then we get the user profile information.
```typescript
useEffect(() => {
    if (connected === false)
        return;

    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [token, user, setUser, connected]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        {connected ? (
            <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink   href="/myApplets" text="My applets" />
                <NavigateButton href="/create"             text="Create" />
                <Profile email={user?.email} />
            </RightSection>
            </NavBar>
        ) : (
            <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink   href="/sign-up" text="Sign up" />
                <NavigateButton href="/login"   text="Login" />
            </RightSection>
            </NavBar>
        )}

        {/* --- Body --- */}
        <div className="min-h-screen flex flex-col w-[90%] md:w-3/4 mx-auto justify-start py-[2%] overflow-x-hidden">
            <Title title={"Contact"} />
            <Description title={"lucas.dupont@epitech.eu"}  description={"Backend developer, server"} />
            <Description title={"mael.becel@epitech.eu"}    description={"SCRUM Master, mobile"} />
            <Description title={"enzo.garnier@epitech.eu"}  description={"Frontend developer, mobile"} />
            <Description title={"ethan1.hernou@epitech.eu"} description={"Frontend developer, web"} />
            <Description title={"jovan.hillion@epitech.eu"} description={"Frontend developer, web"} />

            <Title title={"Project"} />
            <DescriptionWithNavigation title={"Github of the project"}  description={"You can find the github of the project "} hyperlink={"https://github.com/maelbecel/ARea"} textOfLink={"here"} />
            <Description title={"Help"}  description={"Explore help articles about many AREA51 topics and file support tickets."} />
        </div>

        {/* --- Footer --- */}
        <Footer/>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [Contact.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/create/index.tsx)

## [About.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/about/index.tsx)

The About pages is a pages where the user can get information about the AREA project and download the APK.

We start by importing all the require modules and the different component we will need for the page.
```typescript
// --- Librairies import --- //
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Image from 'next/image';

// --- API --- //
import { useToken } from '../../utils/api/user/Providers/TokenProvider';
import { useUser } from "../../utils/api/user/Providers/UserProvider";
import { GetProfile } from "../../utils/api/user/me";

// --- Interface --- //
import { UserProfile } from "../../utils/api/user/interface/interface";

// --- Components import --- //
    // --- NavBar --- //
import NavBar, { LeftSection, RightSection } from "../../components/NavBar/navbar";
import { NavigateButton } from "../../components/NavBar/components/Button";
import SimpleLink from "../../components/NavBar/components/SimpleLink";
import Profile from "../../components/NavBar/components/Profile";
import Icon from "../../components/NavBar/components/Icon";
    // --- Body --- //
import Button from "../../components/Button/Button";
    // --- Footer --- //
import Footer from "../../components/Footer/Footer";
```

Then we create unique component for this page only.
```typescript
const Container = ({ title, subtitle, description, url, alt } : { title: string, subtitle: string, description: string, url: string, alt: string }) => {
    return (
        <>
            <div className="flex flex-col justify-start p-[5%] h-[50%]">
                <div className="flex flex-col">
                    <div className="text-[18px] font-bold text-[#363841] pb-[10%]">
                        {subtitle}
                    </div>
                    <div className="text-[28px] font-bold text-[#363841] pb-[10%]">
                        {title}
                    </div>
                    <div className="text-[24px] font-bold text-[#363841] pb-[10%]">
                        {description}
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-[5%] w-auto h-[50%]">
                <Image src={url} alt={alt} width={500} height={500}/>
            </div>
        </>
    );
};
```

Then we create a state for the user connected.
```typescript
const [connected, setConnected] = useState<boolean>(false);
```

Then we initialize the different hooks we will need.
```typescript
const { token, setToken } = useToken();
const { user , setUser  } = useUser();
```

Then we check if the user is connected or not.
```typescript
useEffect(() => {
    setToken(localStorage.getItem("token") as string);

    if (token)
        setConnected(true);
    else
        setConnected(false);
}, [token, setToken]);
```

Then we get the user profile information.
```typescript
useEffect(() => {
    if (connected === false)
        return;

    const getProfile = async (token: string) => {
        setUser(await GetProfile(token) as UserProfile);
    }

    if (user?.email === "" || user?.email === null)
        getProfile(token);
}, [token, user, setUser, connected]);
```

Then we return the renderer of the different component.
```typescript
return (
    <>
        {/* --- NavBar --- */}
        {connected ? (
            <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink   href="/myApplets" text="My applets" />
                <NavigateButton href="/create"             text="Create" />
                <Profile email={user?.email} />
            </RightSection>
            </NavBar>
        ) : (
            <NavBar>
            <LeftSection>
                <Icon />
            </LeftSection>
            <RightSection>
                <SimpleLink   href="/sign-up" text="Sign up" />
                <NavigateButton href="/login"   text="Login" />
            </RightSection>
            </NavBar>
        )}

        {/* --- Body --- */}
        <div className="min-h-screen flex flex-col w-3/5 mx-auto justify-start py-[2%]">
            {/* Title */}
            <div className="text-[28px] md:text-[48px] font-bold text-[#363841] flex justify-center text-center pb-[10%]">
                <div>Area51 helps all your apps and devices work better together</div>
            </div>

            {/* Container */}
            <div className="flex flex-col justify-center">
                <div className="flex flex-col md:grid md:grid-cols-4 w-[100%]">
                    <Container title={"Applets"} subtitle={'what are'} description={'Applets bring your services together to create remarkable, new experiences.'}
                                url={"/Images/applet.svg"} alt={"applet"} 
                    />
                    <Container title={"Services ?"} subtitle={'what are'} description={'Services are the apps and devices you use every day. There are countless useful ways to connect services with Applets.'}
                                url={"/Images/service.svg"} alt={"Services"}
                    />
                </div>
                <div className="flex flex-col items-center py-[10%]">
                    <div className="flex justify-center w-[80%] sm:w-[40%] md:w-[30%] lg:w-[25%]">
                        <Button callBack={handleClick} text="Learn more" backgroundColor="#363841" textColor="#ffffff" size={false}/>
                    </div>
                    <div className="flex flex-wrap gap-x-[1%] justify-center py-[10%] sm:py-[5%]">
                        <div className="text-[18px] font-bold text-[#363841] text-center">
                            You want to use mobile version ? You can download it
                        </div>
                        <a href='app.apk' download={'app.apk'} className="text-[18px] font-bold text-[#00B2FF]">here</a>
                    </div>
                </div>
            </div>
        </div>

        {/* --- Footer --- */}
        <Footer/>
    </>
);
```

We can conclude by exporting the component :
```typescript
export default IndexPage;
```

For more information about this file you can check his complete code here : [About.tsx](https://github.com/maelbecel/ARea/blob/master/web/pages/about/index.tsx)
