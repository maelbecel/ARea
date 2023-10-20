import { View, TouchableOpacityProps, TouchableOpacity, StyleSheet,Text, InputModeOptions, Image, DimensionValue } from 'react-native';
import React from 'react';
import ServiceInfo from '../api/ServiceInfo';

interface CardProps extends TouchableOpacityProps {
    slug    : string;
    onPress : () => void;
}




const ServiceLogo: React.FC<CardProps> = ({ slug , onPress}) => {

    const [color, setColor] = React.useState<string>("EEEEEE");
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

    if (!loading) {
        return (
            <TouchableOpacity onPress={onPress} style={[{backgroundColor: color}, styles.container]}>
                <View>
                    <Image source={{ uri: logo }} style={styles.logo}/>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      height: 80,
      width: 80,
      marginVertical: 15,
      marginRight: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logo: {
        height: 50,
        width: 50,
        marginVertical: 15,
        alignSelf: 'center',
    }
  });

export default ServiceLogo;