// --- Librairies --- //
import Link from 'next/link'
import { useState } from 'react';

// --- Interfaces --- //
interface NavBarProps {
    children ?: React.ReactNode;
    color    ?: string;
    theme    ?: string;
}

/**
 * Put the children on the left of the navbar
 */
const LeftSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}

/**
 * Put the children on the middle of the navbar
 * When the navbar is in mobile mode, the children will be hidden
 */
const MiddleSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-row items-center gap-7 hidden md:flex w-auto">
            {children}
        </div>
    )
}

/**
 * Put the children on the right of the navbar
 * When the navbar is in mobile mode, the children will be put in a dropdown menu
 * @warning The color and the theme are only used for the mobile view
 * @param color  Background color of the dropdown menu
 * @param theme  Theme of the navbar
 */
const RightSection = ({ children, color = "ffffff", theme = 'light' }: { children: React.ReactNode, color?: string, theme?: string }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <>
            {/* Desktop View */}
            <div className="flex-row items-center gap-7 hidden md:flex">
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
                        className='w-full z-50 absolute left-0 top-[75px] pt-[10px]'
                    >
                        {children}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}

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

export { LeftSection, MiddleSection, RightSection }
export default NavBar
