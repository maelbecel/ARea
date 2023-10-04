import Image from "next/image";
import { getTheme } from "../../utils/getTheme";
import { useState } from "react";
import { useRouter } from "next/router";

const PlusIcon = () => {
    return (
        <Image src={"/Icons/PlusButton.svg" } width={40} height={40} alt={""} />
    )
};

const CreateButton = ({ name, color, callbackUrl } : { name: string, color: string, callbackUrl: string }) => {
    const theme = getTheme(color)

    const router = useRouter();

    const [isActive, setIsActive] = useState<boolean>(false);

    const divStyle = {
        backgroundColor: color,
        color: theme === 'light' ? '#363841' : '#ffffff',
    };

    const activeDivStyle = {
        backgroundColor: '#ffffff',
        color: '#363841',
    };

    return (
        <>
            <div style={isActive ? activeDivStyle : divStyle}
                className={`w-full flex justify-center items-center rounded-[15px] text-[62px] font-extrabold py-[36px] select-none`}
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
                onClick={() => router.push(callbackUrl)}
            >
                {name}
            </div>
        </>
    );
};

const Button = ({ name } : { name: string}) => {
    return (
        <>
            <div className={`w-[50%] flex justify-center items-center rounded-[50px] text-[36px] font-bold py-[27px] select-none active:bg-white bg-[#363841] text-white active:text-[#363841]`}
            >
                {name}
            </div>
        </>
    );
};


export { CreateButton, PlusIcon, Button }
