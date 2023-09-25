import Image from 'next/image'

const GameButton = () => {
    return (
        <div className="w-[215px] h-full bg-darkpurple text-white border-b-[1px] border-r-[1px] border-navbarborder flex items-center
                        hover:text-yellow-gold hover:bg-kinky-shark">
            <div className="ml-[20px]">
                <Image src="/icon/tof-icon.png" height={24} width={24} alt="Tower of Fantasy Icon" />
            </div>
            <div className="font-[roboto] text-xs font-medium leading-6 ml-[20px] mb-[2px]">
                Tower of Fantasy
            </div>
        </div>
    )
  }
  
  export default GameButton
  