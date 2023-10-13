import React, { createRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface ToggleSwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
    yesLabel: string;
    noLabel: string;
    bgColor: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, isDisabled, yesLabel, noLabel, bgColor }) => {

    const [isChekedState, setIsChecked] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#ffffff");

    useEffect(() => {
        setIsChecked(isChecked);
        setColor(bgColor);
        console.log("isChecked -> ", isChecked);
    }, []);

    const handleSwitchChange = () => {

        setIsChecked(!isChekedState);

        if (isChekedState == true) {
            console.log("disabled");
        } else {
            console.log("enabled");
        }
    }

    const darkenColor = (color: string, factor: number): string => {
        const hexToRgb = (hex: string): number[] =>
            hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));

        const rgbToHex = (r: number, g: number, b: number): string =>
            `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;

        const [r, g, b] = hexToRgb(color);
        const darkenedR = Math.max(0, Math.floor(r - factor));
        const darkenedG = Math.max(0, Math.floor(g - factor));
        const darkenedB = Math.max(0, Math.floor(b - factor));

        return rgbToHex(darkenedR, darkenedG, darkenedB);
    };

    return (
        <TouchableOpacity
            onPress={handleSwitchChange}
            style={[styles.container, { backgroundColor: darkenColor(bgColor, 50) }, isDisabled && styles.disabled]}
            disabled={isDisabled}
        >
            <Text style={styles.label}>{isChecked ? yesLabel : noLabel}</Text>
            <View style={[styles.toggle, isChecked && {backgroundColor: bgColor}]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 160,
        height: 34,
        borderRadius: 20,
        padding: 4,
    },
    label: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 160 / 4,
    },
    toggle: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: "grey",
    },
    disabled: {
        opacity: 1, // Opacité lorsque le toggle est désactivé
    },
});

export default ToggleSwitch;
