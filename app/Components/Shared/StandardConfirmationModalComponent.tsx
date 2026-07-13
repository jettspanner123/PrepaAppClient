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

const SCREEN_HEIGHT = Dimensions.get("screen").height;

interface StandardConfirmationModalComponentProps {
    visible: boolean;
    title: string;
    subtitle?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ActionButton({
    label,
    onPress,
    isPrimary,
    hasBorderRight,
}: {
    label: string;
    onPress: () => void;
    isPrimary: boolean;
    hasBorderRight: boolean;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    const bg = isPrimary
        ? pressed
            ? ColorFactoryCON.HAIRLINE
            : ColorFactoryCON.WHITE
        : pressed
          ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
          : "transparent";

    const textColor = isPrimary ? ColorFactoryCON.BLACK : ColorFactoryCON.MUTE;

    return (
        <Pressable
            onPressIn={() => {
                setPressed(true);
                Haptics.impactAsync(
                    isPrimary
                        ? Haptics.ImpactFeedbackStyle.Medium
                        : Haptics.ImpactFeedbackStyle.Light,
                );
            }}
            onPressOut={() => setPressed(false)}
            onPress={onPress}
            style={{
                flex: 1,
                paddingVertical: EdgeInsetsCON.LG,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: bg,
                borderRightWidth: hasBorderRight ? 1 : 0,
                borderRightColor: ColorFactoryCON.CARD_BORDER,
            }}
        >
            <Text
                style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: textColor,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                }}
            >
                {label}
            </Text>
        </Pressable>
    );
}

export default function StandardConfirmationModalComponent({
    visible,
    title,
    subtitle,
    confirmLabel = "Done",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
}: StandardConfirmationModalComponentProps): React.JSX.Element {
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const cardTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    useEffect(() => {
        if (visible) {
            backdropOpacity.setValue(0);
            cardTranslateY.setValue(SCREEN_HEIGHT);
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 200,
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
    }, [visible]);

    const animateOut = (callback: () => void): void => {
        Animated.parallel([
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 180,
                useNativeDriver: false,
            }),
            Animated.timing(cardTranslateY, {
                toValue: SCREEN_HEIGHT,
                duration: 180,
                useNativeDriver: true,
            }),
        ]).start(() => callback());
    };

    const handleConfirm = (): void => animateOut(onConfirm);
    const handleCancel = (): void => animateOut(onCancel);

    const backdropBg = backdropOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"],
    });

    return (
        <Modal
            visible={visible}
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

                {/* Card */}
                <Animated.View
                    style={{
                        transform: [{ translateY: cardTranslateY }],
                        backgroundColor: ColorFactoryCON.BLACK,
                        borderWidth: 1,
                        borderColor: ColorFactoryCON.CARD_BORDER,
                        marginHorizontal: EdgeInsetsCON.SCREEN_H,
                        alignSelf: "stretch",
                        overflow: "hidden",
                    }}
                >
                    {/* Text block */}
                    <View
                        style={{
                            padding: EdgeInsetsCON.XL,
                            borderBottomWidth: 1,
                            borderBottomColor: ColorFactoryCON.CARD_BORDER,
                            gap: EdgeInsetsCON.SM,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "900",
                                color: ColorFactoryCON.WHITE,
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                            }}
                        >
                            {title}
                        </Text>
                        {subtitle !== undefined && (
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: "400",
                                    color: ColorFactoryCON.MUTE,
                                    lineHeight: 18,
                                }}
                            >
                                {subtitle}
                            </Text>
                        )}
                    </View>

                    {/* Buttons */}
                    <View style={{ flexDirection: "row" }}>
                        <ActionButton
                            label={cancelLabel}
                            onPress={handleCancel}
                            isPrimary={false}
                            hasBorderRight={true}
                        />
                        <ActionButton
                            label={confirmLabel}
                            onPress={handleConfirm}
                            isPrimary={true}
                            hasBorderRight={false}
                        />
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}
