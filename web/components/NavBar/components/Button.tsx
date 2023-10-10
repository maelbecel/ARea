import Link from "next/link";
import { useState } from "react";

/**
 * Button that can be used in the navbar and react to a function
 * In mobile view the button is always a Arrow
 * In desktop view the button is a rectangle with a text
 * @param func Function to call when the button is clicked
 * @param text Text to display in the button (only in desktop view)
 * @param color Color of the button (only in desktop view)
 * @param theme Theme of the navbar
 */
const CallBackButton = ({ func, text, color = "ffffff", theme = 'light' }: { func: () => void, text: string, color?: string, theme?: string }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <>
            {/* Desktop View */}
            <div className={`font-extrabold text-[24px] p-[10px] rounded-[25px] pl-[44px] pr-[44px] cursor-pointer hidden md:flex`}
                style={{
                    backgroundColor: active ? '#' + color : (theme === 'dark' ? '#ffffff' : '#363841'),
                    color          : active ? (theme === 'dark' ? '#ffffff' : '#363841') : '#' + color,
                }}
                onMouseDown={() => { setActive(true) }}
                onMouseLeave={() => { setActive(false) }}
                onClick={func}
            >
                {text}
            </div>

            {/* Mobile View */}
            <div className={`cursor-pointer flex md:hidden`} onClick={func}>
                <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 26.475L6.49258 15L17 3.525L13.7652 0L0 15L13.7652 30L17 26.475Z" fill={theme === 'light' ? "#363841" : "#ffffff"} />
                </svg>
            </div>
        </>
    )
}

/**
 * Button that can be used in the navbar and redirect to a page
 * @param href     Page to redirect to
 * @param children Children of the button
 */
const ButtonIconNavigate = ({ href, children }: { href: string, children?: React.ReactNode }) => {
    return (
        <Link href={href}>
            <div className='p-[10px]'>
                {children}
            </div>
        </Link>
    )
}

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
    )
}

export { CallBackButton, ButtonIconNavigate, NavigateButton };
