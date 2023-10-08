import React, { useEffect } from "react";
import Image from "next/image";

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        const dataFetch = async (slug : string) => {
            try {
                const data = await (
                    await fetch(`http://zertus.fr:8001/service/${slug}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                ).json();
                setLogo({
                    logoUrl: data?.data?.decoration?.logoUrl,
                    backgroundColor: data?.data?.decoration?.backgroundColor,
                });
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch(slug);
    }, []);

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