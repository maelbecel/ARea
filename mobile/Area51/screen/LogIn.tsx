//  Dear programmer:
//  When I wrote this code, only God and I knew how it worked.
//  Now, only God knows it!
//  So if you are done trying to 'optimize' this routine (and failed),
//  please increment the following counter as a warning
//  to the next guy:
//  total_hours_wasted_here = 50

/* The code is importing the necessary components from the React and React Native libraries. */
import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import LoginAPI from '../api/Login';
import AutoLoginAPI from '../api/AutoLogin';

/* The code is defining a functional component called `Login` that takes a parameter `navigation`. The
`navigation` parameter is likely being passed from a parent component and is used for navigating
between screens in a React Native application. */
const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        const autoLogin = async () => {
            const response = await AutoLoginAPI();
            console.log(response);
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
            alert("An Error occcur");
        } else if (response.status == 200) {
            console.log("Token :" + response.data);
            navigation.navigate('Area 51');
        } else {
            alert("Error " + response.status + "\n" + response.message);
        }
    }

    return (
        <View style={styles.container}>
          <Text style={styles.login}>Log in</Text>
          <FormInput title="Email" icon={{ name: "mail", width: 27, height: 27 }} onChangeText={setEmail} />
          <FormInput title="Password" secure={true} icon={{ name: "lock", width: 27, height: 27 }} onChangeText={setPassword} />
          <Text style={styles.forgot}>Forgot your password ?</Text>
          <SubmitButton title="Log in" onPress={connect} />
          <Text style={styles.forgot} onPress={() => navigation.navigate('SignUp')} >No account ? Sign up here</Text>
          <Text style={styles.or}>or</Text>
          <SubmitButton title="Log in with Google" icon={{ uri: require('../assets/icon/google.png'), width: 27, height: 27 }} />
          <SubmitButton title="Log in with Facebook" icon={{ uri: require('../assets/icon/facebook.png'), width: 27, height: 27 }} />
        </View>
    )
}

/* The code is defining a JavaScript object called `styles` using the `StyleSheet.create()` method from
the React Native library. This object contains two properties: `container` and `login`. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  forgot : {
    color: '#363841',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: "700",
    textDecorationLine: 'underline',
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
    marginTop: 150,
    marginBottom: 30,
    fontSize: 54,
    fontStyle: 'normal',
    fontWeight: "700",
  }
});

export default Login;
