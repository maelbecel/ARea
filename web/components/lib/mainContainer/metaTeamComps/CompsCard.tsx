import { ReactNode, useState } from 'react';
import Simulacra from '../../../../public/SimulacraFile/Simulacra.json'

type CardProps = {
    first: any
    second: any
    third: any
    simulacra: String
    name: String
    children: ReactNode
}

var background = "";

const CompsCard = (props: CardProps) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (open)
            setOpen(false);
        else
            setOpen(true);
    }

    return (
    <div className={open ? "w-full h-full overflow-hidden": "w-full h-[108px] overflow-hidden"}>
      <button className="w-full h-[108px] bg-purple-600 flex rounded-[6px] justify-between border-[1px] border-purple-700 hover:border-brown"
              onClick={handleClick}
      >
        <div>{/*Background Img*/}</div>
        <div className="h-full w-full flex flex-col justify-between text-start font-sans font-bold text-white text-2xl tracking-[1px]">
            <div className="ml-[4px]">{props.name}</div>
            <div className=" ml-[10px] w-[50px] py-[1px] px-[2px] h-[20px] rounded-[3px] bg-background flex justify-center items-center">
                <div className="font-sans text-gray-100 text-lg font-medium">1.5.2</div>
            </div>
            <div className="text-gray-100 text-lg font-semibold">edited 2h ago</div>
        </div>
        <div>{/*Three Characters*/}</div>
        <div className="w-[100px] h-[108px] bg-purple-400 translate-x-[50px] rounded-[50px] flex items-center">
            <svg className={open ? "translate-x-[30px] rotate-180" : "translate-x-[30px]"} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7599 6.2954C13.417 5.92661 12.8332 5.89943 12.456 6.2347L8 10.1951L3.54401 6.2347C3.16679 5.89943 2.58299 5.92661 2.24006 6.2954C1.89713 6.6642 1.92493 7.23495 2.30215 7.57022L6.75814 11.5306C7.46231 12.1565 8.5377 12.1565 9.24186 11.5306L13.6978 7.57022C14.0751 7.23495 14.1029 6.6642 13.7599 6.2954Z" fill="white"/>
            </svg>
        </div>
      </button>
      {/* Invisible Part Acitve when click on Arrow Button*/}
    </div>
    )
  }

export default CompsCard
