import React, { useState } from "react";
import { View, Switch as RNSwitch } from "react-native";

interface SwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
}

const SwitchNotifyMe = ({ isChecked, isDisabled }: SwitchProps) => {
    const [isChekedState, setIsChecked] = useState<boolean>(isChecked);

    const handleSwitchChange = () => {
        if (!isDisabled) {
            setIsChecked(!isChekedState);
            console.log(isChekedState ? "disabled" : "enabled");
        }
    };

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RNSwitch
                value={isChekedState}
                onValueChange={handleSwitchChange}
                disabled={isDisabled}
            />
        </View>
    );
};

export default SwitchNotifyMe;
