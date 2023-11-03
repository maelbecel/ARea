import { View, TouchableOpacityProps, TouchableOpacity, StyleSheet,Text, InputModeOptions, Image, DimensionValue } from 'react-native';
import React from 'react';
import ServiceInfo from '../../api/ServiceInfo';

interface CardProps extends TouchableOpacityProps {
    slug    : string;
    onPress ?: () => void;
    color   ?: string;
}

const LogoApplet: React.FC<CardProps> = ({ slug , onPress, color = "#ffffff"}) => {

    const [bgColor, setColor] = React.useState<string>("EEEEEE");
    const [logo, setLogo] = React.useState<string>("https://via.placeholder.com/50");
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const fetchInfos = async () => {
            const res = await ServiceInfo(slug);
            setColor(res.decoration.backgroundColor);
            setLogo(res.decoration.logoUrl);
            setLoading(false);
        }
        fetchInfos();
    }, []);

    const isLight = (color: string) => {
        if (color.charAt(0) === '#') {
            color = color.substr(1);
        }
        if (color.length === 3) {
            color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
        }
        if (color.toLocaleLowerCase() === 'ffffff') {
            return false;
        }
        return true;
    }

    if (!loading) {
        return (
            onPress ? ( // Vérifiez si onPress est défini
                <TouchableOpacity onPress={onPress} style={[{ backgroundColor: isLight(color) ? null : bgColor }, styles.container]}>
                    <Image source={{ uri: logo, cache: 'force-cache'}} style={[styles.logopti]} />
                </TouchableOpacity>
            ) : (
                <View style={[{ backgroundColor: isLight(color) ? null : bgColor }, styles.container]}>
                    <Image source={{ uri: logo, cache: 'force-cache' }} style={[styles.logopti]} />
                </View>
            )
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 10,
    },
    logopti: {
        height: 40,
        width: 40,
        alignSelf: 'center',
    }
  });

export default LogoApplet;