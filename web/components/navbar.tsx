// --- Librairies --- //
import Link from 'next/link'
import Image from 'next/image'

const NavBar = () => {

    // TODO: check if the user is connected for change the navbar style

    return (
        <div className="p-[1.25rem] w-full flex items-center justify-between flex-row bg-white sticky top-0 border-b-[1px] border-b-black border-opacity-[10%]">
            {/* Left section */}
            <Link href="/">
                <Image className="select-none cursor-pointer" src="/Logo/Logo.svg" width={240} height={60} alt="Logo Area 51" />
            </Link>

            {/* Right section */}
            <div className="flex flex-row items-center gap-7">
                <Link href="/sign-up">
                    <div className="text-[#363841] font-bold text-[32px] cursor-pointer">
                        Sign up
                    </div>
                </Link>
                <Link href="/login">
                    <div className="bg-[#363841] text-white font-extrabold text-[24px] p-[10px] rounded-[25px] pl-[44px] pr-[44px] cursor-pointer">
                        Login
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default NavBar
