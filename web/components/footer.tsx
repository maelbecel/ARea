// --- Librairies --- //
import Link from "next/link"

const Footer = () => {
    return (
        <div className="w-full bg-white flex justify-around items-center flex-row font-bold text-[#363841] text-[24px]">
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
