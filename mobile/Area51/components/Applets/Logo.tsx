import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import AppletDetails from "../../api/AppletDetails";

interface LogoProps {
    slug: string;
    width?: number;
    height?: number;
    toggleBackground: boolean;
}

interface Logo {
    logoUrl: string;
    backgroundColor?: string;
}

const LogoApplet = ({ slug, width = 40, height = 40, toggleBackground = true }: LogoProps) => {
    const [logo, setLogo] = useState<Logo | null>(null);

    useEffect(() => {
        const dataFetch = async (slug: string) => {
            try {
                const data = await AppletDetails(slug);
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
        <View style={{ borderRadius: toggleBackground ? width / 2 : 0, overflow: 'hidden' }}>
            {logo && logo.logoUrl && (
                <Image
                    source={{ uri: logo.logoUrl }}
                    style={{ width: width, height: height, backgroundColor: toggleBackground ? logo.backgroundColor : 'transparent' }}
                />
            )}
        </View>
    );
};

export default LogoApplet;
