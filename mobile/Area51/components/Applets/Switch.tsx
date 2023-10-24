import React, { createRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, DimensionValue } from "react-native";
import { getWriteColor } from "../ActionCard";

interface ToggleSwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
    yesLabel: string;
    noLabel: string;
    bgColor: string;
    toggleColor?: string;
    darkMode?: boolean;
    bigSwitch?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, isDisabled, yesLabel, noLabel, bgColor, toggleColor, darkMode = true, bigSwitch = false }) => {

    const [isChekedState, setIsChecked] = useState<boolean>(false);
    const [darkenBg, setDarkenColor] = useState<string>("#ffffff");

    useEffect(() => {
        setIsChecked(isChecked);
        setDarkenColor(darkenColor(bgColor, 100));
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
            style={[styles.container, {
                backgroundColor: darkenBg,
                width: bigSwitch ? '100%' : '50%',
                borderRadius: bigSwitch ? 50 : 100
            }]}
            disabled={isDisabled}
        >
            <Text style={[styles.label, {
                marginLeft: bigSwitch ? '35%' : '12.5%',
                color: getWriteColor(darkenBg),
                fontSize: bigSwitch ? 30 : 14,
            }]}>{isChekedState ? yesLabel : noLabel}</Text>
            <View style={[, {
                width: bigSwitch ? 75 : 25,
                height: bigSwitch ? 75 : 25,
                borderRadius: bigSwitch ? 35 : 12.5,
                transform: [{ translateX: isChekedState ? 0 : -287 }],},
                isChecked && { backgroundColor: toggleColor ? toggleColor : bgColor }
            ]}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 4,
    },
    label: {
        fontWeight: "bold",
    },
    disabled: {
        opacity: 1, // Opacité lorsque le toggle est désactivé
    },
});

export default ToggleSwitch;
