import * as React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('Area 51');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>S'inscrire</Text>
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
      <Button title="S'inscrire" onPress={handleSignUp} />
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}