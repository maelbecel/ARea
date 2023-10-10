import React, { useState } from "react";
import { View, Switch as RNSwitch, StyleSheet, Text } from "react-native";

interface SwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
}

const Switch = ({ isChecked, isDisabled }: SwitchProps) => {
    const [isEnabled, setIsEnabled] = useState(isChecked);

    const toggleSwitch = () => {
        if (isDisabled) return;
        setIsEnabled(previousState => !previousState);
    };

    return (
        <View>
            <RNSwitch
                trackColor={{ false: 'rgba(200, 200, 200, 0.5)', true: 'rgba(200, 200, 200, 1)' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Switch;
