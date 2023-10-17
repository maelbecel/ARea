import React, { useEffect } from "react";
import Image from "next/image";
import { useToken } from "../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../utils/api/service/Providers/ServiceProvider";
import { useRouter } from "next/router";
import { GetServices } from "../../utils/api/service/service";
import { Service } from "../../utils/api/service/interface/interface";

interface LogoProps {
    slug: string;
    width?: number;
    height?: number;
    toogleBackground: boolean;
}

interface logo {
    logoUrl: string;
    backgroundColor?: string;
}

const LogoApplet = ({slug, width = 40, height = 40, toogleBackground = true} : LogoProps) => {
    const [logo, setLogo] = React.useState<logo>();

    const { token, setToken } = useToken();
    const { services, setServices } = useServices();

    const router = useRouter();

    const getServices = async (token: string) => {
        setServices(await GetServices(token));
    }

    useEffect(() => {
        if (logo?.backgroundColor && logo?.logoUrl !== "")
            return;

        if (services.length === 0) {
            if (token === "") {
                const tokenStore = localStorage.getItem("token");
    
                if (tokenStore === null) {
                    router.push("/");
                    return;
                }
                setToken(tokenStore);
            }
            getServices(token);
        }

        const Service: Service | undefined = services.find((Service: Service) => Service.slug === slug);

        setLogo({ logoUrl: Service?.decoration?.logoUrl ?? '', backgroundColor: Service?.decoration?.backgroundColor });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logo]);

    return (
       
        toogleBackground ? (
            <div style={{ backgroundColor : logo?.backgroundColor}} className="rounded-full p-[10px] w-[100%] h-[100%]" >
                {logo && logo.logoUrl && <Image src={logo.logoUrl} width={width} height={height} alt={"Service Logo"} /> }
            </div>
        ) : (
            <div>
                {logo && logo.logoUrl && <Image src={logo.logoUrl} width={width} height={height} alt={"Service Logo"} /> }
            </div>
        )
    )
}

export default LogoApplet;