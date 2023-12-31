//  Dear programmer:
//  When I wrote this code, only God and I knew how it worked.
//  Now, only God knows it!
//  So if you are done trying to 'optimize' this routine (and failed),
//  please increment the following counter as a warning
//  to the next guy:
//  total_hours_wasted_here = 52

/* The code is importing the necessary components from the React and React Native libraries. */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import ServerModal from '../components/ServerModal';
import LoginAPI from '../api/Login';
import AutoLoginAPI from '../api/AutoLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginService from '../api/LoginService';

/* The code is defining a functional component called `Login` that takes a parameter `navigation`. The
`navigation` parameter is likely being passed from a parent component and is used for navigating
between screens in a React Native application. */
const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* The `useEffect` hook in React is used to perform side effects in functional components. In this
    code, the `useEffect` hook is used to automatically log in a user if they have already been
    authenticated. */
    useEffect(() => {

        const clearStorage = async () => {
          await AsyncStorage.setItem('action', "default");
          await AsyncStorage.setItem('reaction', "[]");
        }

        clearStorage();
        /**
         * The function `autoLogin` checks if the response from the `AutoLoginAPI` is true and
         * navigates to the 'Area 51' page if it is.
         */
        const autoLogin = async () => {
            const response = await AutoLoginAPI();
            if (response == true) {
                navigation.navigate('Area 51');
            }
          }
          autoLogin();
    }, [])

    /**
     * The function `connect` logs in a user using the LoginAPI, displays an alert if there is an
     * error, navigates to the 'Area 51' page if the login is successful, and displays an alert with
     * the response message if the login is unsuccessful.
     */
    const connect = async () => {
        const response = await LoginAPI(email, password);
        if (response == null) {
            Alert.alert("An Error occcur", "Please check your internet connection");
        } else if (response.status == 200) {
            navigation.navigate('Area 51');
        } else {
            Alert.alert("Bad credentials", response.message);
        }
    }

    /* The `return` statement in the code is returning a JSX element that represents the UI of the
    `Login` component. It is a composition of various React Native components such as `View`,
    `Text`, `FormInput`, and `SubmitButton`. */
    return (
        /* The code is returning a JSX element that contains other JSX elements. */
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <ServerModal />
          </View>
          <View style={{marginVertical: 20}}/>
          <View style={styles.form}>
            <Text style={styles.login}>Log in</Text>
            <FormInput title="Email" icon={{ name: "mail", width: 27, height: 27 }} onChangeText={setEmail} />
            <FormInput title="Password" secure={true} icon={{ name: "lock", width: 27, height: 27 }} onChangeText={setPassword} />
            <SubmitButton title="Log in" onPress={connect} />
            <View style={{marginVertical: 5, flexDirection: 'row'}}>
              <Text style={styles.sub} onPress={() => navigation.navigate('SignUp')} >No account ? </Text>
              <Text style={[styles.sub, { textDecorationLine: 'underline' }]} onPress={() => navigation.navigate('SignUp')} >Sign up here</Text>
            </View>
            <Text style={styles.or}>or</Text>
            <SubmitButton title="Log in with Google" icon={{ uri: require('../assets/icon/google.png'), width: 27, height: 27 }} onPress={async () => (await LoginService("google")) ? navigation.navigate("Area 51") : null}/>
          </View>
        </View>
    )
}

/* The code is defining a JavaScript object called `styles` using the `StyleSheet.create()` method from
the React Native library. This object contains two properties: `container` and `login`. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  form : {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  forgot : {
    color: '#363841',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: "700",
  },
  or : {
    color: '#363841',
    fontSize: 30,
    fontStyle: 'normal',
    marginVertical: 30,
    fontWeight: "700",
  },
  login : {
    color: '#363841',
    marginTop: 50,
    marginBottom: 30,
    fontSize: 54,
    fontStyle: 'normal',
    fontWeight: "700",
  },
  sub : {
    color: '#363841',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: "700",
  },
});

/* The `export default Login;` statement is exporting the `Login` component as the default export of
the module. This allows other modules to import and use the `Login` component in their code. */
export default Login;
