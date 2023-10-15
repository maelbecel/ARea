import React, { createRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, DimensionValue } from "react-native";

interface ToggleSwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
    yesLabel: string;
    noLabel: string;
    bgColor: string;
    toggleColor?: string;
    width?: DimensionValue;
    height?: DimensionValue;
    darkMode?: boolean;
    toggleSize?: DimensionValue;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, isDisabled, yesLabel, noLabel, bgColor, toggleColor, width = '50%', height = '100%', darkMode = true, toggleSize }) => {

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
        if (!darkMode) {
            return color;
        }
        if (!color) {
            console.log("no color");
            return "#FFFFFF";
        }
        const hexToRgb = (hex: string): number[] => {
            if (hex) {
                const match = hex.match(/\w\w/g);
                if (match) {
                    return match.map((x) => parseInt(x, 16));
                }
            }
            return [0, 0, 0];
        };
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
            style={[styles.container, { backgroundColor: darkenColor(bgColor, 50), width: width, height: height }, isDisabled && styles.disabled]}
            disabled={isDisabled}
        >
            <Text style={styles.label}>{isChecked ? yesLabel : noLabel}</Text>
            <View style={[styles.toggle, isChecked && {backgroundColor: toggleColor ? toggleColor : bgColor}]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        borderRadius: 15,
        backgroundColor: "grey",
    },
    disabled: {
        opacity: 1, // Opacité lorsque le toggle est désactivé
    },
});

export default ToggleSwitch;
