import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// --- Component --- //
import OutlinedTextBox from '../components/OutlinedTextBox';

// --- Interface --- //
interface ProfileFormProps {
    data: any;
}

const secureText = (passwordLength: number) => {
    return '•'.repeat(passwordLength); // Remplace chaque caractère par un astérisque (*)
};

const SecureText = ({ passwordLength }) => {
    const secureTextValue = secureText(passwordLength);

    return (
      <Text style={styles.secureText}>{secureTextValue}</Text>
    );
};

const ProfileForm: React.FC<ProfileFormProps> = ({data}) => {
    const navigation = useNavigation();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('password');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const dataFetch = async () => {
            const username = await AsyncStorage.getItem('username');
            const email = await AsyncStorage.getItem('email');
            setUsername(username);
            setEmail(email);
        };
        dataFetch();
    }, []);

    const handleUsernameChange = async (text: string) => {
        setUsername(text);
        await AsyncStorage.setItem('username', text);
    };

    const handlePasswordChange = async (text: string) => {
        setPassword(text);
    };

    const handleEmailChange = async (text: string) => {
        setEmail(text);
        await AsyncStorage.setItem('email', text);
    };

    return (
        <View style={styles.userInfo}>
            <View style={{marginBottom: 10}}>
                <Text style={styles.title}>Compte</Text>
            </View>
            <View style={{marginTop: 10}}>
                <Text style={styles.subtitle}>Nom d'utilisateur</Text>
                <OutlinedTextBox
                onChangeText={handleUsernameChange}
                value={username}
                />
            </View>
            <View style={{marginTop: 10}}>
                <Text style={styles.subtitle}>Mot de passe</Text>
                <View style={styles.rectangle}>
                    <SecureText passwordLength={data.passwordLength} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        // Navigate to the 'ChangePassword' screen when the user clicks on 'Modifier le mot de passe'
                        // navigation.navigate('ChangePassword');
                        console.log('Change password');
                    }}
                >
                    <Text style={styles.link}>Modifier le mot de passe</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
                <Text style={styles.subtitle}>Adresse e-mail</Text>
                <OutlinedTextBox
                    onChangeText={handleEmailChange}
                    value={email}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userInfo: {
        marginHorizontal: 10, // Marge à gauche de l'avatar pour l'espace entre l'image et le texte
    },
    title: {
        fontSize: 20, // Taille de la police pour le titre
        fontWeight: 'bold', // Texte en gras pour le titre
        color: '#363841',
    },
    subtitle: {
        fontSize: 16, // Taille de la police pour le nom d'utilisateur
        fontWeight: 'bold', // Texte en gras pour le nom d'utilisateur
        color: '#363841',
    },
    link: {
        color: '#00C2FF',
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    secureText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#363841',
        opacity: 0.5,
    },
    rectangle: {
        backgroundColor: '#D9D9D9', // Couleur de la boîte
        borderRadius: 5, // Rayon des coins de la boîte
        paddingVertical: 10, // Rembourrage vertical pour l'espace interne
        paddingHorizontal: 10, // Rembourrage horizontal pour l'espace interne
        marginVertical: 10, // Marge verticale pour l'espace externe
    },
});

export default ProfileForm;