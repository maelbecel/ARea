/* The `import` statement is used to import specific modules or components from external libraries or
files. In this case, it is importing various components and types from the `react-native` and
`react-native-gesture-handler` libraries. */
import { View, TouchableOpacityProps, StyleSheet, InputModeOptions, Image, DimensionValue } from 'react-native';
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

/* The code `const FormInput: React.FC<InputProps> = ({ title, secure = false, inputMode, icon,
onChangeText, children }) => { ... }` is defining a functional component called `FormInput`. */
const FormInput: React.FC<InputProps> = ({ title, secure = false, inputMode, icon, onChangeText, children, size = '70%' }) => {
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

export default FormInput;