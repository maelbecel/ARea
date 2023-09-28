// --- Librairies --- //
import Link from 'next/link'
import Image from 'next/image'
import { CSSProperties, useState } from 'react';
import { BlockList } from 'net';

// --- Interfaces --- //
interface NavBarProps {
    children ?: React.ReactNode;
    color    ?: string;
    theme    ?: string;
}

// --- Navbar Component --- //
const Icon = ({ theme = 'light' } : { theme ?: string }) => {
    return (
        <Link href="/">
            {theme === 'light' ? (
                <Image className="select-none cursor-pointer" src="/Logo/Logo.svg" width={240} height={60} alt="Logo Area 51" />
            ) : (
                <Image className="select-none cursor-pointer" src="/Logo/WhiteLogo.svg" width={240} height={60} alt="Logo Area 51" />
            )}
        </Link>
    )
}

const NavBarNavigateButton = ({ href, text, theme = 'light' }: { href: string, text: string, theme?: string }) => {
    const bgColor        = theme === 'light' ? `bg-[#363841]`          : `bg-white`;
    const bgHoverColor   = theme === 'light' ? 'active:bg-white'       : `active:bg-[#363841]`;
    const textColor      = theme === 'light' ? 'text-white'            : `text-[#363841]`;
    const textHoverColor = theme === 'light' ? `active:text-[#363841]` : 'active:text-white';

    return (
        <Link href={href}>
            <div className={`${bgColor} ${textColor} font-extrabold text-[24px] p-[10px] rounded-[25px] pl-[44px] pr-[44px] cursor-pointer
                             ${bgHoverColor} ${textHoverColor}`}
            >
                {text}
            </div>
        </Link>
    )
}

const NavBarFuncButton = ({ func, text, color = "363841", theme = 'light' }: { func: () => void, text: string, color?: string, theme?: string }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div className={`font-extrabold text-[24px] p-[10px] rounded-[25px] pl-[44px] pr-[44px] cursor-pointer`}
             style={{
                backgroundColor: active ? '#' + color : (theme === 'dark' ? 'white' : '#363841'),
                color          : active ? (theme === 'dark' ? 'white' : '#363841') : '#' + color,
             }}
             onMouseDown={() => { setActive(true) }}
             onMouseLeave={() => { setActive(false) }}
             onClick={func}
        >
            {text}
        </div>
    )
}

const NavBarNavigateButtonIcon = ({ href, children }: { href: string, children?: React.ReactNode }) => {
    return (
        <Link href={href}>
            {children}
        </Link>
    )
}

const SimpleLink = ({ href, text, theme = 'light' }: { href: string, text: string, theme?: string }) => {
    return (
        <Link href={href}>
            <div className={`${theme === 'light' ? 'text-[#363841]' : 'text-white'} font-bold text-[32px] cursor-pointer`}>
                {text}
            </div>
        </Link>
    )
}

/**
 * @param url  Image url of the profile
 * @param args Arguments of the profile page (username, mail, password, etc...)
 *             Example: TODO: example
 */
const Profile = ({ url, args }: { url ?: string, args ?: string }) => {
    return (
        <Link href={`/profile/`}>
            <div className="flex flex-row items-center">
                {url ? (
                    <Image src={url} width={70} height={70} alt="Profile" />
                ) : (
                    <Image src="/Icons/profile.svg" width={70} height={70} alt="Profile" />
                )}
            </div>
        </Link>
    )
}

const Title = ({ text, theme = 'light' }: { text: string, theme?: string }) => {
    return (
        <div className={`${theme === 'light' ? 'text-[#363841]' : 'text-white'} font-bold text-[48px]`}>
            {text}
        </div>
    )
}

const LeftSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}

const MiddleSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row items-center gap-7">
            {children}
        </div>
    )
}

const RightSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row items-center gap-7">
            {children}
        </div>
    )
}

const NavBar = ({ children, color = "bg-white", theme = "light" }: NavBarProps) => {
    console.log(theme);

    // TODO: check if the user is connected for change the navbar style

    return (
        <div className={`p-[1.25rem] w-full flex items-center justify-between flex-row ${color} sticky top-0 border-b-[1px] border-b-black border-opacity-[10%] z-50`}>
            {children}
        </div>
    )
}

export { Icon, NavBarNavigateButton, NavBarFuncButton, NavBarNavigateButtonIcon, SimpleLink, Profile, Title, LeftSection, MiddleSection, RightSection }
export default NavBar
