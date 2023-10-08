// --- Librairies import --- //
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";

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
const ServiceButtonComponent = ({ name, slug, logo, color, callback }: { name: string, slug: string, logo: string, color: string, callback: (slug: string) => void}) => {
    return (
        <div className={`flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]`}
            style={{ backgroundColor: (color.length === 0) ? "#363841" : color}}
            onClick={() => {
                callback(slug);
            }}
        >
            <Image src={logo} width={120} height={120} alt={"Service Logo"} />
            <span>{name}</span>
        </div>
    )
}

const ServiceLinkComponent = ({ name, slug, logo, color }: { name: string, slug: string, logo: string, color: string}) => {
    return (
        <Link href={`/create?page=2&service=${slug}`}>
            <div className={`flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col p-[25px] pl-[43px] pr-[43px]`}
                 style={{ backgroundColor: (color.length === 0) ? "#363841" : color}}
            >
                <Image src={logo} width={120} height={120} alt={"Service Logo"} />
                <span>{name}</span>
            </div>
        </Link>
    )
}

const ServiceListComponents = ({ serviceList, type, callback } : { serviceList?: ServiceProps[], type: string, callback: (slug: string) => void }) => {
    return (
        <div className="font-bold text-[20px] text-white grid grid-cols-4 gap-5 h-auto mb-[5rem]">
            {serviceList && serviceList.map((service, index) => (
                type === 'button' ? (
                    <ServiceButtonComponent key={index} name={service.name} slug={service.slug} logo={service.decoration.logoUrl} color={service.decoration.backgroundColor} callback={callback} />
                ) : (
                    <ServiceLinkComponent key={index} name={service.name} slug={service.slug} logo={service.decoration.logoUrl} color={service.decoration.backgroundColor} />
                )
            ))}
        </div>
    );
}

const SearchService = ({ type = 'link', callback = (slug: string) => {} } : { type?: string, callback?: (slug: string) => void }) => {
    const [searchValue  , setSearchValue] = useState<string>("");
    const [service      , setService] = useState<ServiceProps[]>([]);
    const [serviceSearch, setServiceSearch] = useState<ServiceProps[]>([]);

    useEffect(() => {
        const fetchService = async () => {
            try {
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
                setServiceSearch(data?.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchService();
    }, []);

    const findObjectsBySlug = (array: any[], slug: string) => {
        return array.filter(item => item?.slug.includes(slug) || item?.name.includes(slug));
    };

    const handleChange = (event: any) => {
        const newValue = event.target.value;

        setSearchValue(newValue);
        setServiceSearch(findObjectsBySlug(service, newValue));
    };

    return (
        <>
            {/* Search bar */}
            <div className="w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] flex mb-[5rem]">
                <div className="m-[10px]">
                    <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
                </div>
                <input value={searchValue}
                        placeholder="Search services"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent w-full text-[24px] font-bold text-[#363841] outline-none p-[10px]"
                />
            </div>

            <ServiceListComponents serviceList={serviceSearch} type={type} callback={callback} />
        </>
    )
}

export default SearchService
