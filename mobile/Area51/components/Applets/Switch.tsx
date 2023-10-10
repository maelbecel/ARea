import React, { useState } from "react";
import { View, Switch as RNSwitch } from "react-native";

interface SwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
}

const Switch = ({ isChecked, isDisabled }: SwitchProps) => {
    const [isChekedState, setIsChecked] = useState<boolean>(isChecked);

    const handleSwitchChange = () => {
        if (!isDisabled) {
            setIsChecked(!isChekedState);
            console.log(isChekedState ? "disabled" : "enabled");
        }
    };

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isDisabled ? (
                <View style={{ opacity: 0.5 }}>
                    <RNSwitch
                        value={isChekedState}
                        onValueChange={handleSwitchChange}
                        disabled={true}
                    />
                </View>
            ) : (
                <RNSwitch
                    value={isChekedState}
                    onValueChange={handleSwitchChange}
                />
            )}
        </View>
    );
};

export default Switch;
