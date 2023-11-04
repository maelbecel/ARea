import Link from "next/link";

/**
 * String link with hover effect that redirects to the given href
 * @param href href to redirect to
 * @param text text to display
 * @param theme light or dark theme (default: light)
 */
const SimpleLink = ({ href, text, theme = 'light' }: { href: string, text: string, theme?: string }) => {
    return (
        <Link href={href}>
            <div className={`${theme === 'light' ? 'text-[#363841]' : 'text-white'} font-bold text-[30px] cursor-pointer md:p-0 hover:brightness-115 w-full flex justify-start md:justify-end`}>
                {text}
            </div>
        </Link>
    )
}

export default SimpleLink;
