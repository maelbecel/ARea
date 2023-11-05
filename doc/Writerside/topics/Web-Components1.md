# Web-Components

# [NavBar](https://github.com/maelbecel/ARea/blob/master/web/components/NavBar)

The Navbar component is fully modular. It is used to create headers for each page of the site.

Here is an example with the result:
```typescript
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
```
![NavBar.png](NavBar1.png)

## [navbar.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/navbar.tsx)

This file contains the main component. But also each section that makes up the navbar.

Here's is the navbar component:
```typescript
const NavBar = ({ children, color = "ffffff" }: NavBarProps) => {
    return (
        <>
            <div className={`px-[10px] md:p-[1.25rem] h-[75px] md:h-[100px] w-full items-center justify-between flex-row sticky top-0 border-b-[1px] border-b-black border-opacity-[10%] z-50 flex`}
                 style={{ backgroundColor: `#${color}` }}
            >
                {children}
            </div>
        </>
    )
}
```
**Note**: The `children` are the sections of the navbar.

Here's is the section component:
* Put the children on the left of the navbar
```typescript
const LeftSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
};
```

* Put the children on the middle of the navbar. When the navbar is in mobile mode, the children will be hidden.
```typescript
const MiddleSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-row items-center gap-7 hidden md:flex w-auto">
            {children}
        </div>
    );
};
```

* Put the children on the right of the navbar. When the navbar is in mobile mode, the children will be put in a dropdown menu.
```typescript
const RightSection = ({ children, color = "ffffff", theme = 'light', width = false }: { children: React.ReactNode, color?: string, theme?: string, width?: boolean }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <>
            {/* Desktop View */}
            <div className={`flex-row hidden md:flex ${width ? '' : 'min-w-[50%]'} items-center justify-end gap-7`}>
                {children}
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="32px" height="32px" onClick={() => setActive(!active)}>
                    <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" fill={theme === 'light' ? '#363841' : '#ffffff'} />
                </svg>
                {active ? (
                    <div style={{
                        height: 'calc(100vh - 75px)',
                        backgroundColor: `#${color}`,
                    }}
                        className='w-full z-50 absolute left-0 top-[75px] p-[10px]'
                    >
                        {children}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
```
**Note**: The `children` of the section, is different from the main `children`, here this children contains the elements that will be draw on the navbar.

## Here is the elements

## [Button.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/NavBar/components/Button.tsx)

Here is the icon navigate button component:
```typescript
const ButtonIconNavigate = ({ href, children }: { href: string, children?: React.ReactNode }) => {
    return (
        <Link href={href}>
            <div className='p-[10px]'>
                {children}
            </div>
        </Link>
    )
}
```
**Note**: The `children` are the elements that will be draw on the button.

Example:
```typescript
<ButtonIconNavigate href="/help">
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 50C18.3696 50 12.0107 47.3661 7.32233 42.6777C2.63392 37.9893 0 31.6304 0 25C0 18.3696 2.63392 12.0107 7.32233 7.32233C12.0107 2.63392 18 3696 0 25 0C31.6304 0 37.9893 2.63392 42.6777 7.32233C47.3661 12.0107 50 18.3696 50 25C50 31.6304 47.3661 37.9893 42.6777 42.6777C37.9893 47.3661 31.6304 50 25 50ZM30 17.5C30 18.2 29.475 19.5 28.95 20L25 23.95C23.575 25.4 22.5 27.95 22.5 30V32.5H27.5V30C27.5 29.275 28.025 28 28.55 27.5L32.5 23.55C33.925 22.1 35 19.55 35 17.5C35 14.8478 33.9464 12.3043 32.0711 10.4289C30.1957 8.55357 27.6522 7.5 25 7.5C22.3478 7.5 19.8043 8.55357 17.9289 10.4289C16.0536 12.3043 15 14.8478 15 17.5H20C20 16.1739 20.5268 14.9021 21.4645 13.9645C22.4021 13.0268 23.6739 12.5 25 12.5C26.3261 12.5 27.5979 13.0268 28.5355 13.9645C29.4732 14.9021 30 16.1739 30 17.5ZM22.5 37.5V42.5H27.5V37.5H22.5Z" fill={theme === 'dark' ? '#ffffff' : '#363841'} />
    </svg>
</ButtonIconNavigate>
```

The result:

![ButtonIconNavigate.png](ButtonIconNavigate1.png)

Here is the navigate button component:
```typescript
const NavigateButton = ({ href, text, theme = 'light' }: { href: string, text: string, theme?: string }) => {
    const bgColor        = theme === 'light' ? `bg-[#363841]`          : `bg-white`;
    const bgHoverColor   = theme === 'light' ? 'active:bg-white'       : `active:bg-[#363841]`;
    const textColor      = theme === 'light' ? 'text-white'            : `text-[#363841]`;
    const textHoverColor = theme === 'light' ? `active:text-[#363841]` : 'active:text-white';

    return (
        <Link href={href}>
            <div className={`flex justify-center items-center`}>
                <div className={`${bgColor} ${textColor} font-extrabold text-[24px] p-[10px] rounded-[25px] cursor-pointer flex justify-center items-center w-[90%] md:w-auto md:px-[40px]
                             ${bgHoverColor} ${textHoverColor}`}
                >
                    {text}
                </div>
            </div>
        </Link>
    );
};
```

Example:
```typescript
<NavigateButton href="/login" text="Login" />
```

The result:

![ButtonNavigate.png](ButtonNavigate1.png)

## [Icon.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/NavBar/components/Icon.tsx)

Here is the icon component:
```typescript
const Icon = ({ theme = 'light' } : { theme ?: string }) => {
    return (
        <Link href="/">
            <div className={'w-[150px] h-[45px] md:w-[240px] md:h-[60px]'}>
                {theme === 'light' ? (
                    <Image className="select-none cursor-pointer object-cover" src="/Logo/Logo.svg" width={240} height={60} alt="Logo Area 51" />
                ) : (
                    <Image className="select-none cursor-pointer object-cover" src="/Logo/WhiteLogo.svg" width={240} height={60} alt="Logo Area 51" />
                )}
            </div>
        </Link>
    );
};
```

![Icon.png](Icon1.png)

## [Profile.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/NavBar/components/Profile.tsx)

Here is the profile component:
```typescript
const Profile = ({ url, theme = "light", email }: { url ?: string, theme ?: string, email: string }) => {
    return (
        <>
            <div className='hidden md:flex w-[20%] h-[70px] justify-end'>
                <Link href={`/profile/`}>
                    <div className="flex-row items-center">
                        <Image src={url ? url : "/Icons/profile.svg"} width={70} height={70} alt="Profile" className="object-cover" />
                    </div>
                </Link>
            </div>

            <div className='flex md:hidden p-[10px] items-center gap-[10px]'>
                <Link href={`/profile/`}>
                    <div className="flex-row items-center">
                        <Image src={url ? url : "/Icons/profile.svg"} width={35} height={35} alt="Profile" className="object-cover" />
                    </div>
                </Link>
                <div className="flex-row items-center text-[16px] font-bold"
                    style={{ color: (theme === "light" ? "#363841" : "#ffffff") }}
                >
                    {email}
                </div>
            </div>
        </>
    );
};
```
**Note**: The component have two different view, one for the mobile and one for the desktop.

Desktop view:

![Profile.png](ProfileDesk1.png)

Mobile view:

![Profile.png](ProfileMob1.png)

## [SimpleLink.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/NavBar/components/SimpleLink.tsx)

Here is the profile component:
```typescript
const SimpleLink = ({ href, text, theme = 'light' }: { href: string, text: string, theme?: string }) => {
    return (
        <Link href={href}>
            <div className={`${theme === 'light' ? 'text-[#363841]' : 'text-white'} font-bold text-[30px] cursor-pointer md:p-0 hover:brightness-115 w-full flex justify-start md:justify-end`}>
                {text}
            </div>
        </Link>
    );
};
```

![SimpleLink.png](SimpleLink1.png)

## [Title.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/NavBar/components/Title.tsx)

Here is the profile component:
```typescript
const Title = ({ text, theme = 'light' }: { text: string, theme?: string }) => {
    return (
        <div className={`${theme === 'light' ? 'text-[#363841]' : 'text-white'} font-bold text-[32px] xl:text-[48px] hidden md:flex`}>
            {text}
        </div>
    );
};
```

![Title.png](Title1.png)

# [Footer.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Footer/Footer.tsx)

The footer is a component that is used to create the footer of each page of the site.

Here is the function of the component:
```typescript
const Footer = ({ color = "ffffff", theme = 'light' }: { color ?: string, theme ?: string }) => {
    return (
        <div className={`w-full justify-center items-center hidden md:flex`}
            style={{
                backgroundColor: `#${color}`,
                color: theme === 'light' ? '#363841' : '#ffffff'
            }}
        >
            <div className={`md:w-[70%] lg:w-[50%] justify-between flex items-center flex-row font-bold text-[24px]`}>
                <Link href="/about">
                    About
                </Link>
                <Link href="/help">
                    Help
                </Link>
                <Link href="/contact">
                    Contact
                </Link>
                <Link href="/privacy">
                    Privacy
                </Link>
            </div>
        </div>
    );
};
```

For use the footer, you just need to put the component at the end of the page:
```typescript
<Footer />
```

![Footer.png](Footer1.png)

# [TextContainer.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Auth/TextContainer.tsx)

The component `TextContainer` is used to create a container for the text in the authentication pages, like the login or signup page.
Like the navbar, the component is fully modular.

Here is an example with the result:
```typescript
<TextContainer title="Sign up" handleClick={handleClick}>
    <InputContainer placeholder='Username' value={username} setValue={setUsername} icon="/Icons/person.svg" />
    <InputContainer placeholder='Email'    value={email}    setValue={setEmail}    icon="/Icons/mail.svg"   />
    <InputContainer placeholder='Password' value={password} setValue={setPassword} icon="/Icons/lock.svg" secureMode={true} />
</TextContainer>
```
Here is the result:

![TextContainer.png](TextContainer1.png)

Here is the main component:
```typescript
const TextContainer = ({ title, submit, children, handleClick, noAccount = false }: ContainerProps) => {
    return (
        <div className="min-h-[75%] w-full md:w-[50%] flex justify-around items-center flex-col">
            <Title title={title} />
            <div className="flex justify-between items-center flex-col">
                {children}
            </div>
            <RequestButton text={submit ? submit : title} handleClick={handleClick} />
            {noAccount &&
                <RedirectText text="No account ? Sign up here" redirectUri="/sign-up" />
            }
            <div className="font-bold text-[48px] text-[#363841]">
                Or
            </div>
            <ConnectWithGoogle />
        </div>
    );
};
```
**Note**: The `children` are the elements that will be draw on the container.

Here is the elements:

* The `Title` component:
```typescript
const Title = ({ title }: { title: string }) => {
    return (
        <div className="font-extrabold text-[2.6rem] text-[#363841]">
            {title}
        </div>
    );
};
```
![Title.png](TitleText1.png)

* The `RedirectText` component:
```typescript
const RedirectText = ({ text, redirectUri }: { text: string, redirectUri: string }) => {
    return (
        <Link href={redirectUri}>
            <div className="text-[#363841] text-[1rem] font-bold underline cursor-pointer">
                {text}
            </div>
        </Link>
    );
};
```
![RedirectText.png](RedirectText1.png)

* The `RequestButton` component:
```typescript
const RequestButton = ({ text, handleClick }: ButtonProps) => {
    return (
        <button className="bg-[#363841] text-white font-extrabold text-[1.8rem] cursor-pointer rounded-[50px] p-[1.6rem] pl-[4.4rem] pr-[4.4rem] select-none
                            active:bg-white active:text-[#363841]"
                onClick={handleClick}
        >
            {text}
        </button>
    );
};
```
![RequestButton.png](RequestButton1.png)

* The `InputContainer` component:
```typescript
const InputContainer = ({ placeholder, secureMode = false, value, setValue, icon }: InputProps) => {
    const [mode, setMode] = useState<boolean>(secureMode);

    return (
        <div className="w-full flex justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] p-[5px] m-[10px]">
            {icon &&
                <Image className="p-[5px]" src={icon} width={45} height={45} alt={"Icon"} />
            }

            <input type={mode ? "password" : "text"}
                   value={value}
                   placeholder={placeholder}
                   onChange={(e) => setValue(e.target.value)}
                   className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[5px]"
            />

            {secureMode &&
                <button onClick={() => setMode(!mode)} className="flex justify-center items-center">
                    <Image src={mode ? "/Icons/eye.svg" : "/Icons/eye-slash.svg"} width={36} height={36} alt={"Secure mode icon"} />
                </button>
            }
        </div>
    );
};
```
![InputContainer.png](InputContainer1.png)

* The `ConnectWithGoogle` component:
```typescript
const ConnectWithGoogle = () => {
    const handleClick = async () => {
        window.location.href = `${localStorage.getItem('address') as string}/user/login/google?redirecturi=http://localhost:8081/`;
    };

    return (
        <div className="w-[90%] sm:w-[50%] xl:w-[50%] h-auto md:w-[80%] bg-[#363841] rounded-[50px] p-5 flex items-center justify-between cursor-pointer"
             onClick={() => handleClick()}
        >
            <div className="text-[20px] xl:text-[22px] 2xl:text-[28px] text-white font-bold">
                Log in with Google
            </div>
            <Image src="/Icons/Google.png" width={36} height={36} alt="Google" />
        </div>
    );
};
```
![ConnectWithGoogle.png](ConnectWithGoogle1.png)

## [ChangeAddress.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Modal/ChangeAddress.tsx)

This component is used to change the address of the server. Because in the area, you need to choose the server that you want to use.

In the component we start by importing the modules that we need:
```typescript
// --- Import --- //
import { useState } from "react";
import Modal from 'react-modal';

// --- Components --- //
import ModalError from "./modalErrorNotif";
import Button from "../Button/Button";
```

Then we create the state of the modal:
```typescript
const [show            , setShow]        = useState<boolean>(true);
const [address         , setAddress]     = useState<string>("");
const [modalErrorIsOpen, setIsErrorOpen] = useState<boolean>(false);
```

Then we create the function that will be called when we click on the button, and send the address to the server:
```typescript
const validateAddress = async () => {
    if (address === "" || address.includes("http") === false) {
        openModalError();
        setShow(false);
        return;
    }

    try {
        const response = await fetch(address + "/about.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        localStorage.setItem("address", address);

        setShow(false);
    } catch (e) {
        console.log("Invalid Address : ", address);

        openModalError();
        setShow(false);
    }
}
```
**Note**: For check the address, we try a request to the server, for get the `about.json` file. If the request fail, we open the modal error.

Then we return the renderer of the component:
```typescript
return (
    <>
        {/* --- Button for open the change address modal --- */}
        <div className="flex-row flex gap-[5px] w-full items-center md:px-[50px] cursor-pointer" onClick={() => { setShow(true); setAddress("") }}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.2708 45.8332L18.4375 39.1665C17.9861 38.9929 17.5604 38.7846 17.1604 38.5415C16.7604 38.2985 16.3701 38.038 15.9896 37.7603L9.79167 40.3644L4.0625 30.4686L9.42708 26.4061C9.39236 26.163 9.375 25.9283 9.375 25.7019V24.2978C9.375 24.0714 9.39236 23.8366 9.42708 23.5936L4.0625 19.5311L9.79167 9.63525L15.9896 12.2394C16.3715 11.9616 16.7708 11.7012 17.1875 11.4582C17.6042 11.2151 18.0208 11.0068 18.4375 10.8332L19.2708 4.1665H30.7292L31.5625 10.8332C32.0139 11.0068 32.4396 11.2151 32.8396 11.4582C33.2396 11.7012 33.6299 11.9616 34.0104 12.2394L40.2083 9.63525L45.9375 19.5311L40.5729 23.5936C40.6076 23.8366 40.625 24.0714 40.625 24.2978V25.7019C40.625 25.9283 40.5903 26.163 40.5208 26.4061L45.8854 30.4686L40.1562 40.3644L34.0104 37.7603C33.6285 38.038 33.2292 38.2985 32.8125 38.5415C32.3958 38.7846 31.9792 38.9929 31.5625 39.1665L30.7292 45.8332H19.2708ZM25.1042 32.2915C27.1181 32.2915 28.8368 31.5797 30.2604 30.1561C31.684 28.7325 32.3958 27.0137 32.3958 24.9998C32.3958 22.9859 31.684 21.2672 30.2604 19.8436C28.8368 18.42 27.1181 17.7082 25.1042 17.7082C23.0556 17.7082 21.3278 18.42 19.9208 19.8436C18.5139 21.2672 17.8111 22.9859 17.8125 24.9998C17.8125 27.0137 18.5153 28.7325 19.9208 30.1561C21.3264 31.5797 23.0542 32.2915 25.1042 32.2915Z" fill="#363841"/>
            </svg>
            <div className="font-bold text-[18px] md:text-[24px]">
                Change server address
            </div>
        </div>    
        {/* --- Error Modal --- */}
        <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
        {/* --- Change Address Modal --- */}
        <Modal isOpen={show}
                onRequestClose={() => { setShow(false) }}
                style={{
                    overlay: {
                        zIndex: 1000
                    },
                    content: {
                        width: "75%",
                        height: "50%",
                        left: '15%',
                        top: '25%',
                        borderRadius: "50px",
                    }
                }}
        >
            <div className="flex flex-col items-center justify-around font-bold h-full w-full text-[#363841]">
                <div className="text-[16px] sm:text-[24px] md:text-[34px] lg:text-[42px]">
                    Change server address
                </div>
                <input
                    className="w-[75%] h-[40px] md:h-[60px] rounded-[15px] outline-none text-[14px] md:text-[24px] px-[15px] bg-[#d9d9d9]"
                    placeholder="Ex: https://server.fr"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                />
                <Button callBack={() => { validateAddress() }} text="Validate" backgroundColor="#363841" textColor="#ffffff" half={3} size={true} />
            </div>
        </Modal>
    </>
);
```

Here is the result:

![ChangeAddress.png](ChangeAddressOff1.png)


![ChangeAddress.png](ChangeAddressOn1.png)

For more information about the modal, you can go to the [react-modal](https://www.npmjs.com/package/react-modal) documentation.

## [modalErrorNotif.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Modal/modalErrorNotif.tsx)

This component is used to notif the user when an error occur.

In the component we start by importing the modules that we need:
```typescript
// --- Import --- //
import Modal from 'react-modal';
import React from "react";
```

Then we create a `ModalErorrProps` interface:
```typescript
interface ModalErrorProps {
    closeModal : () => void; // Function for close the modal
    openModal  : () => void; // Function for open the modal
    modalIsOpen: boolean;    // Boolean for know if the modal is open
    text       : string;     // Text that will be display in the modal
}
```

Then we return the renderer of the component:
```typescript
const ModalError = ({ closeModal, openModal, modalIsOpen, text } : ModalErrorProps) => {
    return (
        <div className="w-[100%] flex justify-center">
            <Modal isOpen={modalIsOpen}
                   onRequestClose={closeModal}
                   contentLabel="Example Modal"
                   className={"flex flex-col items-center justify-around w-[50%] md:w-[25%] h-[15%] bg-white shadow-md rounded-md p-6 transform -translate-x-1/2 -translate-y-1/2 transition duration-200 ease-in-out absolute top-1/2 left-1/2"}
            >
                <div className="flex flex-col justify-center w-[100%] text-[24px] font-bold text-[#363841] text-center">
                    {text}
                </div>
            </Modal>
        </div>        
    );
};
```

Here is the result:

![ModalErrorNotif.png](ModalErrorNotif1.png)

For more information about the modal, you can go to the [react-modal](https://www.npmjs.com/package/react-modal) documentation.

# [Applet](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components)

The applet folder contains all the components that are used to create, edit, and display an applet.

## [SearchApplet.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components/SearchApplet.tsx)

This component is a huge component, that get the applets from the server, and display them.

In the component we start by importing the modules that we need:
```typescript
// --- Import --- //
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// --- API --- //
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../../utils/api/service/Providers/ServiceProvider";
import { GetServices } from "../../../utils/api/service/service";
import { GetMyApplets } from "../../../utils/api/applet/me";
import { getTheme } from "../../../utils/getTheme";

// --- Interface --- //
import { Service } from "../../../utils/api/service/interface/interface";

// --- Components --- //
import Switch from "../../Switch/Switch2";
import LogoApplet from "./Logo";
```

Then we create the interface for the applet props
```typescript
interface AppletProps {
    id: number;
    name: string;
    actionSlug: string;
    actionTrigger: string;
    lastTriggerUpdate: string; // date
    createdAt: number; // date
    enabled: boolean;
    reactions: ReactionProps[];
};
```

Then we create an applet component:
```typescript
const AppletComponent = ({id, name, actionSlug, reactions , actionTrigger, lastTriggerUpdate, createdAt, enabled }: AppletProps) => {
    // --- Variables --- //
    const [bgColor, setBgColor] = useState<string>("");
    const [newName, setNewName] = useState<string>(name);
    const [theme  , setTheme]   = useState<string>("light");

    // --- Providers --- //
    const { services, setServices } = useServices();
    const { token   , setToken    } = useToken();

    // --- Router --- //
    const router = useRouter();

    // --- Functions --- //

    const getServices = async (token: string) => {
        setServices(await GetServices(token));
    }

    // --- UseEffect --- //

    useEffect(() => {
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

        const Service: Service | undefined = services.find((Service: Service) => Service.slug === actionSlug);

        setBgColor(Service?.decoration?.backgroundColor ?? '#ffffff');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bgColor]);

    useEffect(() => {
        setTheme(getTheme(bgColor));
    }, [bgColor]);

    useEffect(() => {
        if (name.length > 50)
            setNewName(name.slice(0, 50) + "...");
    }, [name]);

    return (
        <div style={{
                backgroundColor: bgColor,
                color: theme === "light" ? "#363841" : "#ffffff",
            }}
            className="rounded-[9px] p-[20px] h-[100%] flex flex-col justify-between"
        >
            <Link href={`/myApplets/applet/${id}`} style={{ cursor: 'pointer', backgroundColor: bgColor }}>
                <div className="cursor-pointer">
                    <div className="flex flex-wrap space-x-[3%]">
                        {actionSlug   && <LogoApplet slug={actionSlug}   width={56} height={56} toogleBackground={false}/>}
                        {reactions && Array.isArray(reactions) && reactions.map((reaction, index: number) => {
                            return (<LogoApplet key={index} slug={reaction.reactionSlug.split('.')[0]} width={56} height={56} toogleBackground={false} />);
                        })}
                    </div>
                    <div className="font-bold text-[28px] pb-[40%] w-full overflow-hidden break-words">
                        <div>
                           {newName}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex justify-end font-bold text-[18px]">
                <Switch isCheked={enabled} isDisable={true}/>
            </div>
        </div>
    );
};
```

This applet component look like this:

![Applet.png](Applet1.png)

Then in the main component, we create the state of the component:
```typescript
const [applets      , setApplets]       = useState<AppletProps[]>([]);
const [searchApplets, setSearchApplets] = useState<AppletProps[]>([]);
const [searchValue  , setSearchValue]   = useState<string>("");
```

Then we fetch all the applets that the user own:
```typescript
useEffect(() => {
    if (applets.length > 0)
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
        setApplets((await GetMyApplets(token)).reverse());
        setSearchApplets((await GetMyApplets(token)).reverse());
    };

    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);
```

Then we create the function that will filter the applet by his search value `string`, enter in the search bar:
```typescript
const findObjectsBySlug = (array: any[], name: string) => {
    return array.filter(item => item?.name.toLowerCase().includes(name.toLowerCase()));
};

const handleChange = (event: any) => {
    const newValue = event.target.value;

    setSearchValue(newValue);
    setSearchApplets(findObjectsBySlug(applets, newValue));
};
```

Then we return the renderer of the component:
```typescript
return (
    <div className="flex flex-col justify-center items-center">

        {/* Search bar */}
        <div className="w-[75%] lg:w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] flex mb-[5rem]">
            <div className="m-[10px]">
                <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
            </div>
            <input value={searchValue}
                    placeholder="Search services"
                    onChange={(e) => handleChange(e)}
                    className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[10px]"
            />
        </div>

        {/* Applets */}
        <div className="w-[75%] grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto">
            {searchApplets && searchApplets.map((applet) => {
                return (
                    <div key={applet.id}>
                        <AppletComponent
                            id={applet.id}
                            name={applet.name}
                            reactions={applet.reactions}
                            actionSlug={applet.actionSlug.split('.')[0]}
                            actionTrigger={applet.actionTrigger}
                            lastTriggerUpdate={applet.lastTriggerUpdate}
                            createdAt={applet.createdAt}
                            enabled={applet.enabled}
                        /> 
                    </div>
                )
            })}
        </div>
    </div>
);
```

Here is the result:

![SearchApplet.png](SearchApplets1.png)

For more information about this component you can go to the [SearchApplet.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components/SearchApplet.tsx)

## [Logo.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components/Logo.tsx)

In the last screenshot, you can see that on applet you have the logo of the service, for do that we use the `LogoApplet` component.
This `LogoApplet` component is used to display the logo of the service. When the service have a white background the logo is displayed with his own service color, and when the service have a dark background the logo is displayed with a white color.

Here is the renderer of the component, the toggleBackground is used to know if the background of the service is dark or not:
```typescript
return (
    (!toogleBackground ? (
        <div>
            {logo && logo.logoUrl && <Image src={logo.logoUrl} width={width} height={height} alt={"Service Logo"} /> }
        </div>
    ) : (
        <div style={{
                backgroundColor : logo?.backgroundColor,
                width: width,
                height: height
            }}
            className="rounded-lg p-[10px]"
        >
            {logo && logo.logoUrl && <Image src={logo.logoUrl} width={width} height={height} alt={"Service Logo"} /> }
        </div>
    ))
);
```

Here is the result:

![Logo.png](Logo1.png)

## [ReactionButton.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components/ReactionButton.tsx)

The reaction button component, have two different display mode depending if the user choose a service or not.

Here it's how the component look like:

![ReactionButton.png](ReactionButtonEmpty1.png)


![ReactionButton.png](ReactionButton1.png)

Here is the Empty component:
```typescript
const EmptyComponent = ({ type, onClick, bg, color } : { type: string, onClick : () => void, bg: string, color: string }) => {
    return (
        <div className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none hover:brightness-110 bg-[#363841] text-[#ffffff]`} onClick={() => { onClick() }}
             style={{
                backgroundColor: bg,
                color: color
             }}
        >
            {type}
        </div>
    );
};
```

Here is the component:
```typescript
const ReactionCardComponent = ({ reaction, setReactions, onEdit } : { reaction : ReactionApplet, setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, onEdit : () => void }) => {
    // --- Variables --- //
    const [background, setBackground] = useState<string>("#ffffff");
    const [logo      , setLogo]       = useState<string>("");
    const [name      , setName]       = useState<string>("");
    const [theme     , setTheme]      = useState<string>("light");

    /**
     * First frame and when the reaction changes,
     * get the background color, the color, the logo and the name of the reaction
     */
    useEffect(() => {
        if (reaction.reactionSlug === null)
            return;

        const getBackground = async () => {
            const service = reaction.reactionSlug.split(".")[0];
            const token   = localStorage.getItem("token") as string;

            const serviceInfo = await GetService(token, service);
            const reactionInfo  = await GetReactionInfo(token, reaction.reactionSlug);

            if (serviceInfo === null || reactionInfo === null)
                return;
            setBackground(serviceInfo.decoration.backgroundColor);
            setLogo(serviceInfo.decoration.logoUrl);
            setTheme(getTheme(serviceInfo.decoration.backgroundColor));
            setName(reactionInfo.description);
        };

        getBackground();
    }, [reaction]);

    return (
        <div style={{
                backgroundColor: background,
                color          : (theme === "light" ? '#363841' : '#ffffff')
             }}
             className={`w-full flex rounded-[15px] flex-col hover:brightness-110 cursor-pointer`}
        >
            <div className='w-[95%] flex flex-row gap-[20px] justify-end pt-[5px] sm:pt-[8px]'>
                <ClickableText text={"Edit"} onClick={() => { onEdit() }} />
                <ClickableText text={"Delete"}
                               onClick={() => { setReactions((prevState: ReactionApplet[]) => {
                                    const newState = [...prevState];

                                    newState.splice(newState.indexOf(reaction), 1);
                                    return newState;
                                })}}
                />
            </div>
            <BottomComponentCard type={"REAction"} name={name} logo={logo} />
        </div>
    );
};
```

## [ActionButton.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components/ActionButton.tsx)

The action button component, have two different display mode depending if the user choose a service or not.

Here it's how the component look like:

![ActionButton.png](ActionButtonEmpty1.png)


![ActionButton.png](ActionButton1.png)

Here is the Empty component:
```typescript
const EmptyComponent = ({ type, onClick, bg, color } : { type: string, onClick : () => void, bg: string, color: string }) => {
    return (
        <div className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none hover:brightness-110 bg-[#363841] text-[#ffffff]`} onClick={() => { onClick() }}
             style={{
                backgroundColor: bg,
                color: color
             }}
        >
            {type}
        </div>
    );
};
```

Here is the component:
```typescript
const ActionCardComponent = ({ action, setAction, onEdit } : ActionCardComponentProps) => {
    // --- Variables --- //
    const [background, setBackground] = useState<string>("#ffffff");
    const [logo      , setLogo]       = useState<string>("");
    const [name      , setName]       = useState<string>("");
    const [theme     , setTheme]      = useState<string>("light");

    /**
     * First frame and when action is updated,
     * Initialize the background, logo, theme and name of the action
     */
    useEffect(() => {
        if (action === null || action.actionSlug === null || action.actionSlug === "" || action.actionSlug === undefined)
            return;

        const getBackground = async () => {
            const service = action.actionSlug.split(".")[0];
            const token   = localStorage.getItem("token") as string;

            const serviceInfo = await GetService(token, service);
            const actionInfo  = await GetActionInfo(token, action.actionSlug);

            if (serviceInfo === null || actionInfo === null)
                return;
            setBackground(serviceInfo.decoration.backgroundColor);
            setLogo(serviceInfo.decoration.logoUrl);
            setTheme(getTheme(serviceInfo.decoration.backgroundColor));
            setName(actionInfo.description);
        };

        getBackground();
    }, [action]);

    return (
        <div style={{
                backgroundColor: background,
                color          : (theme === "light" ? '#363841' : '#ffffff')
             }}
             className={`w-full flex rounded-[15px] flex-col hover:brightness-110 cursor-pointer`}
        >
            <div className='w-[95%] flex flex-row gap-[20px] justify-end pt-[5px] sm:pt-[8px]'>
                <ClickableText text={"Edit"}   onClick={() => { onEdit() }} />
                <ClickableText text={"Delete"} onClick={() => { setAction(defaultActionApplet) }} />
            </div>
            <BottomComponentCard type={"Action"} name={name} logo={logo} />
        </div>
    );
};
```

Here is the result when you have an action, and multiple reactions:

![MultipleAction.png](MultipleAction1.png)

## [AddReaction.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components/AddReactions.tsx)

For the multiple action we need to add a reaction, so we create a component for that.
This component is a plus icon, that will add to the reaction array a default reaction.

Here is the component:
```typescript
const AddReactions = ({ setReactions, index } : { setReactions: Dispatch<SetStateAction<ReactionApplet[]>>, index: number }) => {
    const addNewServiceAtIndex = (index: number) => {
        setReactions((prevReactions) => {
            const newArray = [...prevReactions];
    
            if (index >= 0 && index < prevReactions.length)
                newArray.splice(index, 0, defaultReactionApplet);
            else
                newArray.push(defaultReactionApplet);
            return newArray;
        });
    }

    return (
        <div className="w-[40px] h-[40px]" onClick={() => { addNewServiceAtIndex(index); }}>
            <Image src={"/Icons/PlusButton.svg" } width={40} height={40} alt={""} />
        </div>
    );
};
```

Here is the result (it's the little plus between the two reactions or actions):

![MultipleAction.png](MultipleAction1.png)

## [FieldsInput.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Applet/Components/LittleComponents/FieldsInput.tsx)

The fields input is an important component that is used to create or edit an applet.
He have a currently three different mode, depending of the type of the field, but can be easily extended.
Here is the different mode:
* `TEXT`: ![FieldsInput.png](FieldsInput1.png)
* `NUMBER`: ![FieldsInputNumber.png](FieldsInput1.png)
* `URL`: ![FieldsInputUrl.png](FieldsInput1.png)
* `SELECT`: ![FieldsInputSelect.png](FieldsInputSelect1.png)

Each component is composed of a `LabelComponent` and a `InputComponent` or a `SelectComponent`:
```typescript
const InputsArea = ({ label, type, value, inputs, id, theme, setInputs } : { label: string, type: string, value: string, inputs: Input[], id: number, theme: string, setInputs: Dispatch<SetStateAction<Input[]>> }) => {
    return (
        <div className='flex flex-col w-[90%] lg:w-[50%]'>
            <LabelComponent label={label} theme={theme} />
            <input
                type={type}
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px] border-[#363841] border-2`}
                value={value}
                onChange={(e) => {
                    setInputs(inputs.map((input: Input, index: number) => {
                        if (index === id)
                            input.value = e.target.value;
                        return input;
                    }));
                }}
            />
        </div>
    );
};

const SelectField = ({ input, theme, inputsValue, id, setInputsValue } : FieldProps) => {
    /**
     * If the value of the input is undefined or empty, we set the value to the first option
     */
    if (inputsValue[id].value === undefined || inputsValue[id].value === "") {
        setInputsValue(inputsValue.map((input: Input) => {
            if (input.type === "SELECT" && (input.value === undefined || input.value === ""))
                input.value = input.options[0];
            return input;
        }));
    }

    return (
        <div className='flex flex-col w-[90%] lg:w-[50%]'>
            <LabelComponent label={input.label} theme={theme} />
            <select
                className={`rounded-[10px] p-2 text-[#363841] font-bold text-[20px]`}
                value={inputsValue[id].value}
                onChange={(e) => {
                    setInputsValue(inputsValue.map((input: Input, index: number) => {
                        if (index === id)
                            input.value = e.target.value;
                        return input;
                    }));
                }}
            >
                {input.options?.map((option: string, id: number) => {
                    return (
                        <option key={id} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
```

Here is the `LabelComponent`:
```typescript
const LabelComponent = ({ label, theme }: { label: string, theme: string }) => {
    return (
        <span className={`text-[24px] font-bold`} style={{ color: (theme === 'light' ? '#363841' : '#ffffff') }}>
            {label}
        </span>
    );
};
```

# [ToggleSwitch.tsx](https://github.com/maelbecel/ARea/blob/master/web/components/Switch/ToggleSwitch.tsx)

This button have two state, when is enable and when is disable.

Here is the component enable:

![ToggleSwitch.png](ToggleButtonEnable1.png)

Here is the component disable:

![ToggleSwitch.png](ToggleButtonDisabled1.png)

Here is the renderer of the component:
```typescript
return (
    <div className="w-[100%] h-[100%]">
        <div className="flex justify-center w-[100%] h-[100%] duration-500">
            <div className="flex justify-center duration-500 w-[100%] h-[100%]">
                <button
                    onClick={handleSwitchChange}
                    className="sm:w-[40%] lg:w-[25%] w-[80%] h-[75px] relative"
                    disabled={isDisable}
                >
                    <div style={{ backgroundColor: color }} className={`h-[100%] w-[100%] rounded-[50px] duration-500 p-[4px] flex items-center`}>
                        <div className="flex-grow text-white font-bold text-center text-[36px]">
                            {isChekedState ? yesLabel : noLabel}
                        </div>
                        <div
                            className={`h-[64px] w-[64px] bg-gray-400 rounded-full absolute top-[50%] left-0 transform -translate-y-1/2 duration-500`}
                            style={{ left: isChekedState ? 'calc(100% - 68px)' : '4px' }}
                        />
                    </div>
                </button>
            </div>
        </div>
        <ModalError closeModal={closeModalError} openModal={openModalError} text="Something went wrong !" modalIsOpen={modalErrorIsOpen}></ModalError>
    </div>
);
```