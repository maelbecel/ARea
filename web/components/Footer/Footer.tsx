// --- Librairies --- //
import Link from "next/link"

/**
 * Footer Component of the website.
 * @warning This component is not display on mobile.
 */
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
    )
}

export default Footer
