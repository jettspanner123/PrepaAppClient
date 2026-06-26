import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "./StandardButtonComponent";

// ─── Constants ────────────────────────────────────────────────────────────────
const SCREEN_HEIGHT = Dimensions.get("screen").height;

// ─── Option row ───────────────────────────────────────────────────────────────
function OptionRow({
    option,
    isSelected,
    isLast,
    onSelect,
}: {
    option: string;
    isSelected: boolean;
    isLast: boolean;
    onSelect: (option: string) => void;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    const bgColor = isSelected
        ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
        : pressed
          ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
          : "transparent";

    return (
        <Pressable
            onPress={() => onSelect(option)}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={{
                paddingHorizontal: EdgeInsetsCON.XL,
                paddingVertical: EdgeInsetsCON.LG,
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: isLast ? 0 : 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                backgroundColor: bgColor,
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: isSelected ? "600" : "400",
                    color: isSelected
                        ? ColorFactoryCON.WHITE
                        : ColorFactoryCON.MUTE,
                    textAlign: "center",
                }}
            >
                {option}
            </Text>
        </Pressable>
    );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface StandardOptionSelectorComponentProps {
    label: string;
    options: string[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    hasError?: boolean;
    isValid?: boolean;
}

export default function StandardOptionSelectorComponent({
    label,
    options,
    value,
    onChange,
    placeholder = "Select an option",
    inputClassName,
    labelClassName,
    hasError = false,
    isValid = false,
}: StandardOptionSelectorComponentProps): React.JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const cardTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    // ─── Shake on error ───────────────────────────────────────────────
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

    // ─── Animate in ───────────────────────────────────────────────────
    useEffect(() => {
        if (open) {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: false,
                }),
                Animated.spring(cardTranslateY, {
                    toValue: 0,
                    damping: 22,
                    stiffness: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [open]);

    const animateOut = (callback: () => void): void => {
        Animated.parallel([
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(cardTranslateY, {
                toValue: SCREEN_HEIGHT,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => callback());
    };

    const handleOpen = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        backdropOpacity.setValue(0);
        cardTranslateY.setValue(SCREEN_HEIGHT);
        setOpen(true);
    };

    const handleCancel = (): void => {
        animateOut(() => setOpen(false));
    };

    const handleSelect = (option: string): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onChange(option);
        animateOut(() => setOpen(false));
    };

    const backdropBg = backdropOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"],
    });

    const borderColor = isValid
        ? ColorFactoryCON.SUCCESS
        : hasError
          ? ColorFactoryCON.DANGER
          : open
            ? ColorFactoryCON.WHITE
            : ColorFactoryCON.CARD_BORDER;

    const labelColor = isValid
        ? ColorFactoryCON.SUCCESS
        : hasError
          ? ColorFactoryCON.DANGER
          : ColorFactoryCON.MUTE;

    return (
        <View style={{ gap: EdgeInsetsCON.XS }}>
            {/* Label */}
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

            {/* Trigger */}
            <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                <Pressable
                    onPressIn={() =>
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                    onPress={handleOpen}
                    className={inputClassName}
                    style={{
                        backgroundColor: ColorFactoryCON.INPUT_BG,
                        borderRadius: EdgeInsetsCON.MD,
                        borderWidth: 1,
                        borderColor,
                        paddingHorizontal: EdgeInsetsCON.LG,
                        paddingVertical: EdgeInsetsCON.LG,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: value
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.MUTE,
                        }}
                    >
                        {value ?? placeholder}
                    </Text>
                    <Text style={{ fontSize: 14, color: ColorFactoryCON.MUTE }}>
                        ›
                    </Text>
                </Pressable>
            </Animated.View>

            {/* Modal */}
            <Modal
                visible={open}
                transparent
                animationType="none"
                onRequestClose={handleCancel}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: backdropBg,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Pressable
                        style={{ position: "absolute", inset: 0 } as any}
                        onPress={handleCancel}
                    />

                    {/* Floating heading above card */}
                    <Animated.View
                        style={{
                            transform: [{ translateY: cardTranslateY }],
                            marginHorizontal: EdgeInsetsCON.SCREEN_H,
                            alignSelf: "stretch",
                            marginBottom: EdgeInsetsCON.SM,
                        }}
                    >
                        <View
                            style={{
                                alignSelf: "flex-start",
                                backgroundColor:
                                    ColorFactoryCON.CARD_BG_LIGHT_PRESSED,
                                borderRadius: 9999,
                                borderWidth: 1,
                                borderColor: ColorFactoryCON.CARD_BORDER,
                                paddingVertical: EdgeInsetsCON.XS,
                                paddingHorizontal: EdgeInsetsCON.LG,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "600",
                                    color: ColorFactoryCON.MUTE,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                }}
                            >
                                {label}
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Card */}
                    <Animated.View
                        style={{
                            transform: [{ translateY: cardTranslateY }],
                            backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                            borderRadius: EdgeInsetsCON.LG,
                            borderWidth: 1,
                            borderColor: ColorFactoryCON.CARD_BORDER,
                            marginHorizontal: EdgeInsetsCON.SCREEN_H,
                            alignSelf: "stretch",
                            overflow: "hidden",
                        }}
                    >
                        {/* Option rows — no title inside */}

                        {/* Option rows */}
                        {options.map((option, index) => (
                            <OptionRow
                                key={option}
                                option={option}
                                isSelected={option === value}
                                isLast={index === options.length - 1}
                                onSelect={handleSelect}
                            />
                        ))}
                    </Animated.View>

                    {/* Cancel button */}
                    <Animated.View
                        style={{
                            transform: [{ translateY: cardTranslateY }],
                            marginHorizontal: EdgeInsetsCON.SCREEN_H,
                            alignSelf: "stretch",
                            marginTop: EdgeInsetsCON.SM,
                        }}
                    >
                        <StandardButtonComponent
                            label="Cancel"
                            onPress={handleCancel}
                            variant={StandardButtonComponentVariant.DARK}
                            fullWidth
                            hapticStyle={Haptics.ImpactFeedbackStyle.Light}
                        />
                    </Animated.View>
                </Animated.View>
            </Modal>
        </View>
    );
}
