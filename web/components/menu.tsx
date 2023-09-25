import Logo from './lib/logo'
import NavBar from './lib/navbar'
import SideBar from './lib/sidebar'
import { ReactNode } from 'react'

type MenuProps = {
  children: ReactNode
  menuState: Boolean
  setmenuState: Function
}

const Menu = (props: MenuProps) => {
  return (
    <div className="flex flex-row">
      <div className="h-screen flex flex-col bg-mainbg border-r-[1px] border-navbarborder justify-between fixed">
        <SideBar state={props.menuState} var={props.setmenuState} />
      </div>
      <div className="flex flex-row fixed w-screen">
        <Logo state={props.menuState} />
        <NavBar />
      </div>
      <div className="w-full h-full">
        {props.children}
      </div>
    </div>
  )
}

export default Menu
