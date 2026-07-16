import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
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

export default function StandardConfirmationModalComponent({
    visible,
    title,
    subtitle,
    confirmLabel = "Confirm",
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
    }, [visible, backdropOpacity, cardTranslateY]);

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

    const handleConfirm = (): void => animateOut(onConfirm);
    const handleCancel = (): void => animateOut(onCancel);

    const backdropBg = backdropOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"],
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
                <Animated.View
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: backdropOpacity,
                    }}
                >
                    <BlurView
                        intensity={30}
                        tint="dark"
                        style={{
                            flex: 1,
                        }}
                    />
                </Animated.View>
                <Pressable
                    style={{ position: "absolute", inset: 0 } as any}
                    onPress={handleCancel}
                />

                {/* Card */}
                <Animated.View
                    style={{
                        transform: [{ translateY: cardTranslateY }],
                        backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                        borderRadius: 0,
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
                </Animated.View>

                {/* Floating buttons */}
                <Animated.View
                    style={{
                        transform: [{ translateY: cardTranslateY }],
                        flexDirection: "row",
                        marginHorizontal: EdgeInsetsCON.SCREEN_H,
                        alignSelf: "stretch",
                        gap: EdgeInsetsCON.SM,
                        marginTop: EdgeInsetsCON.SM,
                    }}
                >
                    <StandardButtonComponent
                        label={cancelLabel}
                        onPress={handleCancel}
                        variant={StandardButtonComponentVariant.DARK}
                        style={{ flex: 1 }}
                        hapticStyle={Haptics.ImpactFeedbackStyle.Light}
                        borderRadius={0}
                    />
                    <StandardButtonComponent
                        label={confirmLabel}
                        onPress={handleConfirm}
                        variant={StandardButtonComponentVariant.WHITE}
                        style={{ flex: 1 }}
                        hapticStyle={Haptics.ImpactFeedbackStyle.Medium}
                        borderRadius={0}
                    />
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}
