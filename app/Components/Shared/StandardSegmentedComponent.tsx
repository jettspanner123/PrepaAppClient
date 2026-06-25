import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

interface SegmentOption {
    label: string;
    value: string;
}

interface StandardSegmentedComponentProps {
    options: SegmentOption[];
    selectedValue: string;
    onChange: (value: string) => void;
    className?: string;
}

export default function StandardSegmentedComponent({
    options,
    selectedValue,
    onChange,
    className,
}: StandardSegmentedComponentProps): React.JSX.Element {
    const selectedIndex = options.findIndex((o) => o.value === selectedValue);
    const translateX = useRef(
        new Animated.Value(selectedIndex === -1 ? 0 : selectedIndex),
    ).current;

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: selectedIndex === -1 ? 0 : selectedIndex,
            useNativeDriver: false,
            speed: 20,
            bounciness: 0,
        }).start();
    }, [selectedIndex]);

    const segmentWidthPercent = `${100 / options.length}%`;

    const thumbLeft = translateX.interpolate({
        inputRange: options.map((_, i) => i),
        outputRange: options.map((_, i) => `${(i * 100) / options.length}%`),
    });

    return (
        <View
            className={className}
            style={{
                flexDirection: "row",
                backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                borderRadius: EdgeInsetsCON.MD,
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                padding: EdgeInsetsCON.XXS,
                position: "relative",
            }}
        >
            {/* Sliding thumb */}
            <Animated.View
                style={{
                    position: "absolute",
                    top: EdgeInsetsCON.XXS,
                    bottom: EdgeInsetsCON.XXS,
                    left: thumbLeft,
                    width: segmentWidthPercent,
                    backgroundColor: ColorFactoryCON.CARD_BG_LIGHT_PRESSED,
                    borderRadius: EdgeInsetsCON.SM + EdgeInsetsCON.XXS,
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                }}
            />

            {/* Segment buttons */}
            {options.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                    <Pressable
                        key={option.value}
                        onPressIn={() =>
                            Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light,
                            )
                        }
                        onPress={() => onChange(option.value)}
                        style={{
                            flex: 1,
                            paddingVertical: EdgeInsetsCON.MD,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: isSelected ? "600" : "400",
                                color: isSelected
                                    ? ColorFactoryCON.WHITE
                                    : ColorFactoryCON.MUTE,
                            }}
                        >
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
