import React, { useEffect, useState } from "react";
import { View, Switch as RNSwitch } from "react-native";
import { UpdateAppletNotifWithID } from "../../api/UpdateApplet";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* The `interface SwitchProps` is defining the type of props that the `SwitchNotifyMe` component
expects to receive. It specifies that the component expects two props: `isChecked` and `isDisabled`,
both of which are boolean values. These props are used to determine the initial state of the switch
toggle and whether the switch should be disabled or not. */
interface SwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
}

/**
 * The SwitchNotifyMe component is a switch toggle that allows the user to enable or disable
 * notifications for a specific applet.
 * @param {SwitchProps}  - - `isChecked`: a boolean value indicating whether the switch is initially
 * checked or not.
 * @returns The SwitchNotifyMe component is returning a View component containing an RNSwitch
 * component.
 */
const SwitchNotifyMe = ({ isChecked, isDisabled }: SwitchProps) => {
    const [isChekedState, setIsChecked] = useState<boolean>(isChecked);
    const [appletID, setAppletID] = useState<string>("");

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is being used to fetch data from the AsyncStorage, which is an asynchronous
    storage system in React Native. */
    useEffect(() => {
        const getData = async () => {
            const id = await AsyncStorage.getItem("appletID");
            setAppletID(id);
        };
        getData();
    }, []);

    /**
     * The function `handleSwitchChange` toggles the value of `isChecked` state and updates an applet
     * notification with the new value.
     */
    const handleSwitchChange = async () => {
        setIsChecked(!isChekedState);
        await UpdateAppletNotifWithID(appletID, !isChekedState);
    };

    return (
        <View style={{ marginTop: 5 }}>
            <RNSwitch
                value={isChekedState}
                onValueChange={handleSwitchChange}
                disabled={isDisabled}
            />
        </View>
    );
};

/* The line `export default SwitchNotifyMe;` is exporting the `SwitchNotifyMe` component as the default
export of the module. This means that when another file imports this module, it can import the
`SwitchNotifyMe` component directly without having to specify its name in curly braces. For example,
in another file, you can import the `SwitchNotifyMe` component like this: `import SwitchNotifyMe
from "./SwitchNotifyMe";`. */
export default SwitchNotifyMe;
