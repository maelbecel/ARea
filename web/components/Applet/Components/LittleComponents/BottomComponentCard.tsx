// --- Imports --- //
import Image from "next/image";

const BottomComponentCard = ({ type, name, logo } : { type: string, name: string, logo: string }) => {
    return (
        <div className="flex flex-row justify-start gap-6 px-[5px] md:px-[40px] pb-[5px] md:pb-[30px] items-center">
            <div className="font-extrabold text-[24px] sm:text-[48px] lg:text-[62px]">
                {type}
            </div>
            {logo !== '' && <Image src={logo} width={100} height={100} alt='' />}
            <div className="font-bold text-[18px] sm:text-[24px] lg:text-[32px]">
                {name}
            </div>
        </div>
    );
};

export default BottomComponentCard;
