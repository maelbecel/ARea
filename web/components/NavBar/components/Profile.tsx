// --- Next --- //
import Link from "next/link";
import Image from "next/image";

/**
 * @param url   Image url of the user profile
 * @param theme theme is used only on the mobile version
 * @param email Email of the user
 */
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
    )
}

export default Profile;
