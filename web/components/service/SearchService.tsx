// --- Librairies import --- //
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

// --- Interface --- //
interface ServiceProps {
    name: string;
    logo: string;
    color: string;
}

// --- Component --- //
const ServiceComponent = ({ name, logo, color }: ServiceProps) => {
    const hexColor = color.substring(5, color.length - 1);
    
    return (
        <Link href={`/serviceTemplate?color=${hexColor}&name=${name}`}>
            <div className={`${color} flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]`}>
                <Image src={logo} width={120} height={120} alt={"Service Logo"} />
                <span>{name}</span>
            </div>
        </Link>
    )
}

const ServiceListComponents = ({ serviceList } : { serviceList : ServiceProps[] }) => {
    return (
        <div className="font-bold text-[20px] text-white grid grid-cols-4 gap-5 h-auto mb-[5rem]">
            {serviceList.map((service, index) => (
                <ServiceComponent key={index} name={service.name} logo={service.logo} color={service.color} />
            ))}
        </div>
    );
}

const SearchService = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [service    , setService] = useState<ServiceProps[]>([]);

    useEffect(() => {
        // TODO: remove placeholder, setup search bar

        // placeholder
        setService([
            { name: "YouTube", logo: "/Logo/WhiteLogo.svg", color: "bg-[#FF0000]" },
            { name: "Github" , logo: "/Logo/WhiteLogo.svg", color: "bg-[#333]"    },
            { name: "Discord", logo: "/Logo/WhiteLogo.svg", color: "bg-[#7289da]" },
            { name: "YouTube", logo: "/Logo/WhiteLogo.svg", color: "bg-[#FF0000]" },
            { name: "Twitch" , logo: "/Logo/WhiteLogo.svg", color: "bg-[#6441a5]" },
            { name: "Github" , logo: "/Logo/WhiteLogo.svg", color: "bg-[#333]"    },
            { name: "Twitch" , logo: "/Logo/WhiteLogo.svg", color: "bg-[#6441a5]" },
            { name: "Twitter", logo: "/Logo/WhiteLogo.svg", color: "bg-[#1DA1F2]" },
            { name: "YouTube", logo: "/Logo/WhiteLogo.svg", color: "bg-[#FF0000]" },
            { name: "Discord", logo: "/Logo/WhiteLogo.svg", color: "bg-[#7289da]" },
            { name: "Github" , logo: "/Logo/WhiteLogo.svg", color: "bg-[#333]"    },
            { name: "Facebook",logo: "/Logo/WhiteLogo.svg", color: "bg-[#4267b2]" },
        ]);

    }, [searchValue])

    return (
        <>
            {/* Search bar */}
            <div className="w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] flex mb-[5rem]">
                <div className="m-[10px]">
                    <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
                </div>
                <input value={searchValue}
                        placeholder="Search services"
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[10px]"
                />
            </div>

            <ServiceListComponents serviceList={service} />
        </>
    )
}

export default SearchService
