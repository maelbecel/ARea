/* The code is importing various modules and components from different libraries. */
import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface TopBarProps extends TouchableOpacityProps {
    title         : string;
    iconLeft      : string;
    onPressLeft   : () => void;
    color         : string;
    iconRight     ?: string;
    onPressRight  ?: () => void;

}

const showIconRight = (iconRight, onPressRight, color) => {
  return (iconRight !== null && onPressRight !== null) ? (
    <TouchableOpacity onPress={onPressRight}>
      <Icon name={iconRight} size={30}  color={color}/>
    </TouchableOpacity>
  ) : (
    <View></View>
  )
}

const TopBar: React.FC<TopBarProps> = ({ title, iconLeft, onPressLeft, iconRight=null, onPressRight=null, color }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressLeft}>
        <Icon name={iconLeft} size={30} color={color} />
      </TouchableOpacity>
      <Text style={[styles.text, {color: color}]}>{title}</Text>
      {showIconRight(iconRight, onPressRight, color)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default TopBar;
