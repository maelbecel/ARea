import React, { useEffect, useState } from "react";
import { View, Switch as RNSwitch } from "react-native";
import { UpdateAppletNotifWithID } from "../../api/UpdateApplet";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
}

const SwitchNotifyMe = ({ isChecked, isDisabled }: SwitchProps) => {
    const [isChekedState, setIsChecked] = useState<boolean>(isChecked);
    const [appletID, setAppletID] = useState<string>("");

    useEffect(() => {
        const getData = async () => {
            const id = await AsyncStorage.getItem("appletID");
            setAppletID(id);
        };
        getData();
    }, []);

    const handleSwitchChange = async () => {
        setIsChecked(!isChekedState);
        await UpdateAppletNotifWithID(appletID, !isChekedState);
    };

    return (
        <View>
            <RNSwitch
                value={isChekedState}
                onValueChange={handleSwitchChange}
                disabled={isDisabled}
            />
        </View>
    );
};

export default SwitchNotifyMe;
