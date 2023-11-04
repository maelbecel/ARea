import React, { createRef, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, DimensionValue } from "react-native";
import { getWriteColor } from "../ActionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UpdateAppletEnableWithID } from "../../api/UpdateApplet";

/**
 * The `darkenColor` function takes a color, a factor, and a dark mode flag, and returns a darkened
 * version of the color if dark mode is enabled.
 * @param {string} color - The `color` parameter is a string representing a color in hexadecimal format
 * (e.g., "#FF0000" for red).
 * @param {number} factor - The `factor` parameter determines how much the color should be darkened. It
 * is a number that represents the intensity of darkening. A higher factor value will result in a
 * darker color.
 * @param {boolean} darkMode - A boolean value indicating whether the dark mode is enabled or not.
 * @returns The function `darkenColor` returns a string representing the darkened color.
 */
export const darkenColor = (color: string, factor: number, darkMode: boolean): string => {
    if (!darkMode) {
        return color;
    }
    if (!color) {
        return "#FFFFFF";
    }
    /**
     * The function `hexToRgb` takes a hexadecimal color code as input and returns an array of RGB
     * values representing the color.
     * @param {string} hex - The `hex` parameter is a string representing a hexadecimal color value.
     * @returns The function `hexToRgb` returns an array of numbers representing the RGB values of a
     * given hexadecimal color code. If the input `hex` is a valid string, the function converts it to
     * an array of numbers and returns it. If the input `hex` is not a valid string or is empty, the
     * function returns `[0, 0, 0]`, representing black.
     */
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
    const darkenedR = Math.max(0, Math.floor(r / factor));
    const darkenedG = Math.max(0, Math.floor(g / factor));
    const darkenedB = Math.max(0, Math.floor(b / factor));
    const darkenedHex = rgbToHex(darkenedR, darkenedG, darkenedB);
    return rgbToHex(darkenedR, darkenedG, darkenedB);
};

/* The `ToggleSwitchProps` interface defines the props that can be passed to the `ToggleSwitch`
component. Here's a breakdown of each prop: */
interface ToggleSwitchProps {
    isChecked: boolean;
    isDisabled: boolean;
    yesLabel: string;
    noLabel: string;
    bgColor: string;
    toggleColor?: string;
    darkMode?: boolean;
    bigSwitch?: boolean;
    onChange?: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, isDisabled, yesLabel, noLabel, bgColor, toggleColor, darkMode = true, bigSwitch = false, onChange }) => {
    const [isChekedState, setIsChecked] = useState<boolean>(false);
    const [darkenBg, setDarkenColor] = useState<string>(bgColor);

    /* The `useEffect` hook is used to perform side effects in a functional component. In this case,
    the `useEffect` hook is used to update the state variables `isChekedState` and `darkenBg`
    whenever the `isChecked` prop changes. */
    useEffect(() => {
        setIsChecked(isChecked);
        setDarkenColor(darkenColor(bgColor, 1.2, darkMode));
    }, [isChecked]);

    /**
     * The function `handleSwitchChange` updates the state of a switch component and calls an
     * asynchronous function to update the enable status of an applet if a condition is met.
     */
    const handleSwitchChange = async () => {
        setIsChecked(!isChekedState);
        if (bigSwitch) {
            await UpdateAppletEnableWithID(await AsyncStorage.getItem("appletID"), !isChekedState);
        };
    }

    return (
        <TouchableOpacity
            onPress={handleSwitchChange}
            style={[styles.container, {
                backgroundColor: darkenBg,
                width: bigSwitch ? '100%' : '60%',
                borderRadius: bigSwitch ? 50 : 100,
                justifyContent: isChekedState ? 'flex-end' : 'flex-start',
            }]}
            disabled={isDisabled}
        >
            {isChekedState ? (
                <>
                <Text style={[styles.label, {
                    marginRight: bigSwitch ? '15%' : '20%',
                    color: getWriteColor(darkenBg),
                    fontSize: bigSwitch ? 30 : 15,
                }]}>{isChekedState ? yesLabel : noLabel}</Text>
                <View style={[, {
                    width: bigSwitch ? 75 : 30,
                    height: bigSwitch ? 75 : 30,
                    borderRadius: bigSwitch ? 37.5 : 15,
                    backgroundColor: toggleColor ? toggleColor : bgColor }
                ]}/>
                </>
            ) : (
            <>
                <View style={[, {
                    width: bigSwitch ? 75 : 30,
                    height: bigSwitch ? 75 : 30,
                    borderRadius: bigSwitch ? 37.5 : 15,
                    backgroundColor: toggleColor ? toggleColor : bgColor }
                ]}/>
                <Text style={[styles.label, {
                    marginLeft: bigSwitch ? '15%' : '15%',
                    color: getWriteColor(darkenBg),
                    fontSize: bigSwitch ? 30 : 15,
                }]}>{isChekedState ? yesLabel : noLabel}</Text>
            </>
            )}
        </TouchableOpacity>
    );
};

/* The `const styles` variable is an object that contains style definitions for different elements in
the `ToggleSwitch` component. It uses the `StyleSheet.create` method from the `react-native` library
to create a stylesheet with optimized performance. */
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
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
