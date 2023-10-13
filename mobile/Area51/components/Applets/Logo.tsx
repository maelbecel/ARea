import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                const token = await SecureStore.getItemAsync("token_api");
                const serverAddress = await AsyncStorage.getItem("serverAddress");
                const response = await fetch(`${serverAddress}/service/${slug}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setLogo({
                    logoUrl: data?.data?.decoration?.logoUrl,
                    backgroundColor: data?.data?.decoration?.backgroundColor,
                });
            } catch (error) {
                console.log(error);
            }
        };

        dataFetch(slug);
    }, []); // Assurez-vous de gérer correctement les dépendances du useEffect dans React Native

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
