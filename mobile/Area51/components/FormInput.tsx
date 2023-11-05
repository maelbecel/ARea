/* The `import` statement is used to import specific modules or components from external libraries or
files. In this case, it is importing various components and types from the `react-native` and
`react-native-gesture-handler` libraries. */
import { View, TouchableOpacityProps, StyleSheet, InputModeOptions, DimensionValue } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';


/* The `interface InputProps` is defining the props that can be passed to the `FormInput` component.
It extends the `TouchableOpacityProps` interface, which means it inherits all the props from that
interface. */
interface InputProps extends TouchableOpacityProps {
    title        : string;
    secure      ?: boolean;
    inputMode   ?: InputModeOptions;
    icon         : { name: string, width: number, height: number };
    onChangeText : (text: string) => void;
    children    ?: React.ReactNode;
    size        ?: DimensionValue;
}

/**
 * The FormInput component is a reusable input field with an optional icon, title, secure text entry,
 * input mode, and custom styling.
 * 
 * @param  - `title`: The placeholder text for the input field.
 * 
 * @return The `FormInput` component is returning a `View` component that contains an `Icon` component,
 * a `TextInput` component, and any children components passed to it.
 */
const FormInput: React.FC<InputProps> = ({ title, secure = false, inputMode, icon, onChangeText, children, size = '70%' }) => {
 /* The `return` statement is returning a JSX element that represents the structure and content of the
 `FormInput` component. */
  return (
    <View style={[{width: size}, styles.container]}>
      <Icon name={icon.name} size={24} color="#00000080" />
      <TextInput
        style={styles.input}
        placeholder={title}
        placeholderTextColor={'#00000040'}
        maxLength={30}
        secureTextEntry={secure}
        inputMode={inputMode}
        onChangeText={onChangeText}
      />
      {children}
    </View>
  );
}


/* The `const styles = StyleSheet.create({})` block is creating a stylesheet object using the
`StyleSheet.create()` method provided by React Native. This allows you to define styles for your
components in a structured and optimized way. */
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 26,
    paddingLeft: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  input: {
    width: '80%',
    paddingLeft: 10,
    color: '#00000080',

    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

/* The `export default FormInput;` statement is exporting the `FormInput` component as the default
export of this module. This means that when another file imports this module, it can import the
`FormInput` component directly without having to specify its name. For example, in another file, you
can import the `FormInput` component like this: `import FormInput from './FormInput';`. */
export default FormInput;