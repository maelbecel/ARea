import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TopBar({ title }) {

    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="arrow-back" size={30} />
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
}
