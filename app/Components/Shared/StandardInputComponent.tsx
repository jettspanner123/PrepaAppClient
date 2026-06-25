import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";

interface StandardInputComponentProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    hasError?: boolean;
    isValid?: boolean;
}

export default function StandardInputComponent({
    label,
    value,
    onChangeText,
    placeholder,
    inputClassName,
    labelClassName,
    hasError = false,
    isValid = false,
}: StandardInputComponentProps): React.JSX.Element {
    const [focused, setFocused] = useState<boolean>(false);
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!hasError) return;
        Animated.sequence([
            Animated.timing(shakeAnim, {
                toValue: 8,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -8,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 6,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: -6,
                duration: 60,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
                toValue: 0,
                duration: 60,
                useNativeDriver: true,
            }),
        ]).start();
    }, [hasError]);

    const borderColor = isValid
        ? ColorFactoryCON.SUCCESS
        : hasError
          ? ColorFactoryCON.DANGER
          : focused
            ? ColorFactoryCON.WHITE
            : ColorFactoryCON.CARD_BORDER;

    const labelColor = isValid
        ? ColorFactoryCON.SUCCESS
        : hasError
          ? ColorFactoryCON.DANGER
          : ColorFactoryCON.MUTE;

    return (
        <View style={{ gap: EdgeInsetsCON.XS }}>
            <Text
                className={labelClassName}
                style={{
                    fontSize: 11,
                    fontWeight: "600",
                    color: labelColor,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    marginBottom: 5,
                    marginLeft: 5,
                }}
            >
                {label}
            </Text>
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={ColorFactoryCON.MUTE}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={inputClassName}
                    style={{
                        backgroundColor: ColorFactoryCON.INPUT_BG,
                        borderRadius: EdgeInsetsCON.MD,
                        borderWidth: 1,
                        borderColor,
                        paddingHorizontal: EdgeInsetsCON.LG,
                        paddingVertical: EdgeInsetsCON.LG,
                        fontSize: 16,
                        fontWeight: "500",
                        color: ColorFactoryCON.WHITE,
                    }}
                />
            </Animated.View>
        </View>
    );
}
