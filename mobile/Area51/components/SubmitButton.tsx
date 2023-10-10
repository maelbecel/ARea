/* The `import` statement is used to import specific modules or components from external libraries or
files. In this case, it is importing various components and types from the `react-native` and
`react-native-gesture-handler` libraries. */
import { View, Text, TouchableOpacityProps, TouchableOpacity, StyleSheet, InputModeOptions, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';


/* The `interface InputProps` is defining the props that can be passed to the `FormInput` component.
It extends the `TouchableOpacityProps` interface, which means it inherits all the props from that
interface. */
interface SubmitButtonProps extends TouchableOpacityProps {
    title        : string;
    icon        ?: { uri: any, width: number, height: number };
    textcolor   ?: string;
    onPress     ?: () => void;
}

/* The code block `const SubmitButton: React.FC<SubmitButtonProps> = ({ title, onPress, icon,
textcolor='#FFFFFFBF', }) => { ... }` is defining a functional component called `SubmitButton`. */
const SubmitButton: React.FC<SubmitButtonProps> = ({ title, onPress, icon, textcolor='#FFFFFFBF', }) => {
    return (
        icon ? (
            <TouchableOpacity style={styles.containerimg} onPress={onPress}>
                <Text style={[{color: textcolor}, styles.title]}>{title}</Text>
                <Image source={icon.uri} style={{ width: icon.width, height: icon.height, marginLeft: 10 }} />
            </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={[{color: textcolor}, styles.title]}>{title}</Text>
            </TouchableOpacity>
        )
    );
}

/* The `const styles = StyleSheet.create({ ... })` block is creating a JavaScript object that contains
styles for different components in the `SubmitButton` component. Each key-value pair in the object
represents a style property and its corresponding value. */
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'center',
        width: '40%',
        padding: 10,
        backgroundColor: '#363841',
        borderRadius: 90,
        marginTop: 20,
    },
    containerimg: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        width: '65%',
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: '#363841',
        borderRadius: 90,
    },
    title: {
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: "700",
    }
});

export default SubmitButton;