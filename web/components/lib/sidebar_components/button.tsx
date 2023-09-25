import Link from 'next/link'
import { ReactNode } from 'react'

type GenericPageProps = {
  children: ReactNode
  title: string
  state: Boolean
  link: string
}

const ButtonSideBar = (props: GenericPageProps) => {
    return (
    <div>
        <Link href={props.link}>
            <div>
                <button className={props.state ? "hidden" : "w-[200px] h-[52px] bg-mainbg border-r-[1px] border-navbarborder font-roboto font-medium text-sm text-purple stroke-purple flex items-center hover:bg-navbarborder hover:border-purple focus:bg-navbarborder focus:border-yellow focus:text-warning focus:stroke-yellow"}>
                    {props.children}
                    <div className="ml-[20px]">
                        {props.title}
                    </div>
                </button>
                <button className={props.state ? "w-[64px] h-[52px] bg-mainbg border-r-[1px] border-navbarborder font-roboto font-medium text-sm text-purple stroke-purple flex items-center hover:bg-navbarborder hover:border-purple focus:bg-navbarborder focus:border-yellow focus:text-warning focus:stroke-yellow" : "hidden"}>
                    {props.children}
                </button>
            </div>
        </Link>
    </div>
    )
}

export default ButtonSideBar
