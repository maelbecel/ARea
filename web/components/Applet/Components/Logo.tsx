// --- Imports --- //
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// --- API --- //
import { useToken } from "../../../utils/api/user/Providers/TokenProvider";
import { useServices } from "../../../utils/api/service/Providers/ServiceProvider";
import { GetServices } from "../../../utils/api/service/service";

// --- Interface ---//
import { Service } from "../../../utils/api/service/interface/interface";

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
    // --- Variables --- //
    const [logo, setLogo] = React.useState<logo>();

    // --- Providers --- //
    const { token, setToken } = useToken();
    const { services, setServices } = useServices();

    // --- Router --- //
    const router = useRouter();

    // --- Functions --- //
    const getServices = async (token: string) => {
        setServices(await GetServices(token));
    }

    // --- UseEffect --- //

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
        (!toogleBackground ? (
            <div>
                {logo && logo.logoUrl && <Image src={logo.logoUrl} width={width} height={height} alt={"Service Logo"} /> }
            </div>
        ) : (
            <div style={{
                    backgroundColor : logo?.backgroundColor,
                    width: width,
                    height: height
                }}
                className="rounded-lg p-[10px]"
            >
                {logo && logo.logoUrl && <Image src={logo.logoUrl} width={width} height={height} alt={"Service Logo"} /> }
            </div>
        ))
    );
}

export default LogoApplet;
