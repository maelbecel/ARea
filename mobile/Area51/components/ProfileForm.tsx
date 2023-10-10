import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import OutlinedTextBox from '../components/OutlinedTextBox';

/* The `interface ProfileFormProps` is defining the type of props that the `ProfileForm` component
expects to receive. In this case, it expects a single prop called `data` of type `any`. The `data`
prop can be used within the component to access any additional data that needs to be passed down
from its parent component. */
interface ProfileFormProps {
    data: any;
}

/**
 * The secureText function replaces each character in a string with an asterisk (*) to hide sensitive
 * information like passwords.
 * @param {number} passwordLength - The `passwordLength` parameter is a number that represents the
 * length of the password.
 * @returns a string of asterisks ('*') with a length equal to the input passwordLength.
 */
const secureText = (passwordLength: number) => {
    return '•'.repeat(passwordLength); // Remplace chaque caractère par un astérisque (*)
};

/**
 * The SecureText component displays a secure text value based on the provided password length.
 * @param  - The `SecureText` component takes in a `passwordLength` parameter, which is used as an
 * argument for the `secureText` function. The `secureText` function is not defined in the code snippet
 * provided, so it is unclear what it does. However, the result of the `secure
 * @returns The SecureText component is returning a Text component with the value of secureTextValue.
 */
const SecureText = ({ passwordLength }) => {
    const secureTextValue = secureText(passwordLength);

    return (
      <Text style={styles.secureText}>{secureTextValue}</Text>
    );
};

/* The `ProfileForm` component is a functional component that displays a form for editing user profile
information. */
const ProfileForm: React.FC<ProfileFormProps> = ({data}) => {
    const navigation = useNavigation();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('password');
    const [email, setEmail] = useState<string>('');

    /* The `useEffect` hook in the `ProfileForm` component is used to fetch data from AsyncStorage and
    update the component's state with the retrieved data. */
    useEffect(() => {
        const dataFetch = async () => {
            const username = await AsyncStorage.getItem('username');
            const email = await AsyncStorage.getItem('email');
            setUsername(username);
            setEmail(email);
        };
        dataFetch();
    }, []);

    /**
     * The function `handleUsernameChange` updates the username state and saves it to AsyncStorage.
     * @param {string} text - The `text` parameter is a string that represents the new username value
     * that needs to be saved.
     */
    const handleUsernameChange = async (text: string) => {
        setUsername(text);
        await AsyncStorage.setItem('username', text);
    };

    /**
     * The function `handlePasswordChange` is used to update the password state in a React component.
     * @param {string} text - The `text` parameter is a string that represents the new password value.
     */
    const handlePasswordChange = async (text: string) => {
        setPassword(text);
    };

    /**
     * The function `handleEmailChange` updates the email state and saves it to AsyncStorage.
     * @param {string} text - The `text` parameter is a string that represents the new email address
     * that needs to be updated.
     */
    const handleEmailChange = async (text: string) => {
        setEmail(text);
        await AsyncStorage.setItem('email', text);
    };

    /* The `return` statement in the `ProfileForm` component is rendering the JSX code that represents
    the form for editing user profile information. */
    return (
        <View style={styles.userInfo}>
            <View style={{marginBottom: 10}}>
                <Text style={styles.title}>Compte</Text>
            </View>
            <View style={{marginTop: 10}}>
                <Text style={styles.subtitle}>Nom d'utilisateur</Text>
                {/* <OutlinedTextBox
                onChangeText={handleUsernameChange}
                value={username}
                /> */}
            </View>
            <View style={{marginTop: 10}}>
                <Text style={styles.subtitle}>Mot de passe</Text>
                <View style={styles.rectangle}>
                    <SecureText passwordLength={data.passwordLength} />
                </View>
                {/* <TouchableOpacity
                    onPress={() => {
                        // Navigate to the 'ChangePassword' screen when the user clicks on 'Modifier le mot de passe'
                        // navigation.navigate('ChangePassword');
                        console.log('Change password');
                    }}
                >
                    <Text style={styles.link}>Modifier le mot de passe</Text>
                </TouchableOpacity> */}
            </View>
            <View style={{marginTop: 10}}>
                <Text style={styles.subtitle}>Adresse e-mail</Text>
                {/* <OutlinedTextBox
                    onChangeText={handleEmailChange}
                    value={email}
                /> */}
            </View>
        </View>
    );
};

/* The `const styles` object is defining a set of styles using the `StyleSheet.create` method from
React Native. Each key-value pair in the `styles` object represents a specific style that can be
applied to a component in the `ProfileForm` component. */
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