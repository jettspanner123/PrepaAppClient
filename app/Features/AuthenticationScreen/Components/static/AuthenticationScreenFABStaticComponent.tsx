import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import AuthenticationScreenCON from "@/app/Features/AuthenticationScreen/Constants/AuthenticationScreenCON";
import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";

interface AuthenticationScreenFABStaticComponentProps {
    onPress: () => void;
}

export default function AuthenticationScreenFABStaticComponent({
    onPress,
}: AuthenticationScreenFABStaticComponentProps): React.JSX.Element {
    const anim = useRef(new Animated.Value(0)).current;

    const handlePressIn = (): void => {
        Animated.timing(anim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const handlePressOut = (): void => {
        Animated.timing(anim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handlePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
    };

    const backgroundColor = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [ColorFactoryCON.WHITE, ColorFactoryCON.HAIRLINE],
    });

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{
                position: "absolute",
                bottom: EdgeInsetsCON.FAB_BOTTOM,
                left: EdgeInsetsCON.SCREEN_H,
                right: EdgeInsetsCON.SCREEN_H,
            }}
        >
            <Animated.View
                style={{
                    backgroundColor,
                    borderRadius: 9999,
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    paddingVertical: EdgeInsetsCON.LG,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: ColorFactoryCON.INK,
                    }}
                >
                    {AuthenticationScreenCON.SEND_OTP_LABEL}
                </Text>
            </Animated.View>
        </Pressable>
    );
}
