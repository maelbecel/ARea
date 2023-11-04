// --- Librairies import --- //
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";

// --- API --- //
import { getTheme } from "../../utils/getTheme";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../utils/api/service/Providers/ServiceProvider";
import { GetServices } from "../../utils/api/service/service";

// --- Interfaces --- //
import { Service } from "../../utils/api/service/interface/interface";

// --- Component --- //
const ServiceButtonComponent = ({ name, slug, logo, color, callback }: { name: string, slug: string, logo: string, color: string, callback: (slug: string) => void}) => {
    const theme = getTheme(color);

    return (
        <div className={`flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col py-[25px]`}
            style={{
                backgroundColor: (color.length === 0) ? "#363841" : color,
                color: (theme === "dark") ? "#ffffff" : "#363841"
            }}
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
    const theme = getTheme(color);

    return (
        <Link href={`/create?page=2&service=${slug}&back=1`}>
            <div className={`flex justify-center items-center rounded-[20px] shadow-xl hover:brightness-125 flex-col py-[25px]`}
                 style={{
                    backgroundColor: (color.length === 0) ? "#363841" : color,
                    color: (theme === "dark") ? "#ffffff" : "#363841"
                }}
            >
                <Image src={logo} width={120} height={120} alt={"Service Logo"} />
                <span>{name}</span>
            </div>
        </Link>
    )
}

const ServiceListComponents = ({ serviceList, type, callback } : { serviceList?: Service[], type: string, callback: (slug: string) => void }) => {
    return (
        <div className="font-bold text-[20px] text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 h-auto mb-[5rem] w-[90%]">
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

const SearchService = ({ type = 'link', callback = (slug: string) => {}, filterType = "action" } : { type?: string, callback?: (slug: string) => void, filterType?: string }) => {
    // --- Variables --- //
    const [searchValue  , setSearchValue]   = useState<string>("");
    const [service      , setService]       = useState<Service[]>([]);
    const [serviceSearch, setServiceSearch] = useState<Service[]>([]);

    // --- Providers --- //
    const { token   , setToken    } = useToken();
    const { services, setServices } = useServices();

    // --- Router --- //
    const route = useRouter();

    // --- UseEffect --- //

    useEffect(() => {
        if (type === "link" || filterType === "action") {
            setService(services.filter((item: any) => item?.actions.length > 0));
            setServiceSearch(services.filter((item: any) => item?.actions.length > 0));
        } else {
            setService(services.filter((item: any) => item?.actions.length > 0));
            setServiceSearch(services.filter((item: any) => item?.reactions.length > 0));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [services, filterType]);

    useEffect(() => {
        if (services.length !== 0)
            return;

        if (token === '') {
            const tokenStore = localStorage.getItem("token");

            if (tokenStore === null) {
                route.push("/");
                return;
            }
            setToken(tokenStore);
        }

        const getServices = async (token: string) => {
            setServices(await GetServices(token));

            if (type === "link" || filterType === "action") {
                setService(services.filter((item: any) => item?.actions.length > 0));
                setServiceSearch(services.filter((item: any) => item?.actions.length > 0));
            } else {
                setService(services.filter((item: any) => item?.actions.length > 0));
                setServiceSearch(services.filter((item: any) => item?.reactions.length > 0));
            }
        };

        getServices(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route, services, token]);

    // --- Functions --- //

    const handleChange = (event: any) => {
        const findObjectsBySlug = (array: any[], slug: string) => {
            return array.filter(item => item?.slug.includes(slug) || item?.name.includes(slug));
        };

        const newValue = event.target.value;

        setSearchValue(newValue);
        setServiceSearch(findObjectsBySlug(service, newValue));
    };

    return (
        <>
            {/* Search bar */}
            <div className="w-[80%] md:w-[60%] lg:w-[40%] justify-between items-center flex-row bg-[#D9D9D9] rounded-[15px] flex mb-[50px] lg:mb-[5rem]">
                <div className="m-[5px] md:m-[10px]">
                    <Image src="/Icons/search.svg" width={45} height={45} alt={"Icon"} />
                </div>
                <input value={searchValue}
                        placeholder="Search services"
                        onChange={(e) => handleChange(e)}
                        className="bg-transparent w-full text-[18px] md:text-[24px] font-bold text-[#363841] outline-none p-[5px] md:p-[10px]"
                />
            </div>

            {/* Service list */}
            <ServiceListComponents serviceList={serviceSearch} type={type} callback={callback} />
        </>
    )
}

export default SearchService
