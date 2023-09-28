// --- Librairies --- //
import Link from "next/link"

const Footer = ({ color = "bg-white", theme = 'light' }: { color ?: string, theme ?: string }) => {
    return (
        <div className={`w-full ${color} flex justify-around items-center flex-row font-bold ${theme === 'light' ? 'text-[#363841]' : 'text-white'} text-[24px]`}>
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
    )
}

export default Footer
