/* The code is importing various modules and components from different libraries. */
import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* The `interface TopBarProps` is defining the props (properties) that can be passed to the `TopBar`
component. It extends the `TouchableOpacityProps` interface, which provides props related to the
`TouchableOpacity` component. */
interface TopBarProps extends TouchableOpacityProps {
    title         : string;
    iconLeft      : string;
    onPressLeft   : () => void;
    color         : string;
    iconRight     ?: string;
    onPressRight  ?: () => void;

}

/**
 * The function "showIconRight" returns a TouchableOpacity component with an Icon component inside, if
 * both "iconRight" and "onPressRight" are not null; otherwise, it returns an empty View component.
 * @param iconRight - The `iconRight` parameter is the name of the icon that you want to display on the
 * right side. It is a string value.
 * @param onPressRight - The `onPressRight` parameter is a function that will be called when the user
 * presses the icon on the right.
 * @param color - The "color" parameter is the color of the icon. It is used to set the color of the
 * icon in the Icon component.
 */
const showIconRight = (iconRight, onPressRight, color) => {
  return (iconRight !== null && onPressRight !== null) ? (
    <TouchableOpacity onPress={onPressRight}>
      <Icon name={iconRight} size={30}  color={color}/>
    </TouchableOpacity>
  ) : (
    <View></View>
  )
}

/**
 * The TopBar component is a functional component in TypeScript React that displays a title, left and
 * right icons, and handles onPress events for the icons.
 * @param  - - `title`: The title to be displayed in the top bar.
 * @returns The TopBar component is returning a View component that contains a TouchableOpacity
 * component with an Icon component inside it, a Text component, and the result of the showIconRight
 * function.
 */
const TopBar: React.FC<TopBarProps> = ({ title, iconLeft, onPressLeft, iconRight=null, onPressRight=null, color }) => {

  return (
    <View style={styles.container}>
      <View style={{ width: '10%', alignItems: 'flex-start'}}>
        <TouchableOpacity onPress={onPressLeft}>
          <Icon name={iconLeft} size={30} color={color} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '80%', alignItems: 'center'}}>
        <Text style={[styles.text, {color: color}]}>{title}</Text>
      </View>
      <View style={{ width: '10%', alignItems: 'flex-end'}}>
        {showIconRight(iconRight, onPressRight, color)}
      </View>
    </View>
  );
}

/* The `const styles` variable is an object that contains style definitions for the `TopBar` component.
It uses the `StyleSheet.create` method from the `react-native` library to create a stylesheet with
the specified styles. */
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

/* `export default TopBar;` is exporting the `TopBar` component as the default export of the module.
This means that when another file imports this module, it can import the `TopBar` component directly
without having to specify its name. For example, in another file, you can import the `TopBar`
component like this: */
export default TopBar;
