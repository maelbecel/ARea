import { ReactNode } from 'react'

type GenericPageProps = {
  children: ReactNode
}

const NavBarBox = (props: GenericPageProps) => {
  return (
    <div className="h-full w-[48px] bg-mainbg flex justify-center items-center
                            hover:bg-dark-violet">
        {props.children}
    </div>
  )
}

export default NavBarBox
