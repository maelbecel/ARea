import * as React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('Area 51');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <TextInput
        placeholder="E-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
      />
      <TextInput
        placeholder="Mot de passe"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate('SignUp')}
      />
      <Button
        title="Menu Principal"
        onPress={() => navigation.navigate('Area 51')}
      />
    </View>
  );
}
