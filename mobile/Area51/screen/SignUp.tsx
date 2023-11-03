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
import RegisterAPI from '../api/Register';
import ServerModal from '../components/ServerModal';
import LoginService from '../api/LoginService';

/* The code is defining a functional component called `Signup` that takes a parameter `navigation`. The
`navigation` parameter is likely being passed from a parent component and is used for navigating
between screens in a React Native application. */
const Signup = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');

    /**
     * The function "connect" is an asynchronous function that makes a registration API call and
     * handles the response accordingly.
     */
    const connect = async () => {
      const response = await RegisterAPI(email, password, username);
      if (response == null) {
        alert("An Error occcur");
      } else if (response.status == 200) {
        navigation.navigate('Area 51');
      } else {
        alert(response.message);
      }
  }


  /* The code is rendering a view with various components inside it. */
  return (
        <View style={styles.container}>
          <ServerModal />
          <Text style={styles.login}>Sign up</Text>
          <FormInput title="Email" icon={{ name: "mail", width: 27, height: 27 }} onChangeText={setEmail} />
          <FormInput title="Username" icon={{ name: "person", width: 27, height: 27 }} onChangeText={setUsername} />
          <FormInput title="Password" secure={true} icon={{ name: "lock", width: 27, height: 27 }} onChangeText={setPassword} />
          <SubmitButton title="Sign up" onPress={connect} />
          <Text style={styles.forgot} onPress={() => navigation.navigate('Login')} >Already an account ? Log in here</Text>
          <Text style={styles.or}>or</Text>
          <SubmitButton title="Sign up with Google" icon={{ uri: require('../assets/icon/google.png'), width: 27, height: 27}} onPress={async () => (await LoginService("google")) ? navigation.navigate("Area 51") : null }/>
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
    marginTop: 50,
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

export default Signup;
