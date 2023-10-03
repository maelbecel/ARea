// --- Librairies import --- //
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

// --- Interface --- //
interface ServiceProps {
    name: string;
    slug: string;
    decoration: {
        logoUrl: string,
        backgroundColor: string
    };
    actions: []
    reactions: []
}

// --- Component --- //
const ServiceComponent = ({ name, slug, logo, color }: { name: string, slug: string, logo: string, color: string}) => {
    color = (color.length === 0) ? "#363841" : color;

    return (
        <Link href={`/serviceTemplate?name=${slug}`}>
            <div className={`flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]`}
                 style={{ backgroundColor: color}}
            >
                <Image
                    src={logo}
                    width={120}
                    height={120}
                    alt={"Service Logo"}
                />
                <span>{name}</span>
            </div>
        </Link>
    )
}

const ServiceListComponents = ({ serviceList } : { serviceList ?: ServiceProps[] }) => {
    return (
        <div className="font-bold text-[20px] text-white grid grid-cols-4 gap-5 h-auto mb-[5rem]">
            {serviceList && serviceList.map((service, index) => (
                <ServiceComponent key={index} name={service.name} slug={service.slug} logo={service.decoration.logoUrl} color={service.decoration.backgroundColor} />
            ))}
        </div>
    );
}

const SearchService = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [service    , setService] = useState<ServiceProps[]>([]);

    useEffect(() => {
        const fetchService = async () => {
            const token = localStorage.getItem("token");

            const response = await fetch("http://zertus.fr:8001/service", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                },
            });

            const data = await response.json();

            setService(data?.data);
        };

        fetchService();
    }, []);

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
