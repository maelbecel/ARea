import Link from "next/link"
import { ReactNode } from "react"

type SocialProps = {
    link: string
    children: ReactNode
}

const SocialMedia = (props: SocialProps) => {
    return (    
        <Link href={props.link}
              passHref={true}
        >
            <div className="w-[40px] h-[40px] bg-purple-500 rounded-[3px] flex justify-center items-center mx-[10px]">
                {props.children}
            </div>
        </Link>
    )
}

export default SocialMedia
