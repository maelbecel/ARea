// --- Imports --- //
import Image from 'next/image';
import Link from 'next/link';

/**
 * Display the logo of the website.
 * When the user click on the logo, he will be redirected to the home page.
 * @param theme  Theme of the navbar
 * If the theme is light, the logo will be black.
 * If the theme is dark, the logo will be white.
 */
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
    )
}

export default Icon;
