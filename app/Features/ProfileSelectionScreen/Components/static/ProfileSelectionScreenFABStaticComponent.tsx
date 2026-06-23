import * as Haptics from "expo-haptics";
import React, { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";
import ColorFactoryCON from "../../../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../../../Constants/EdgeInsetsCON";
import ProfileSelectionScreenCON from "../../Constants/ProfileSelectionScreenCON";

interface ProfileSelectionScreenFABStaticComponentProps {
    onPress: () => void;
}

export default function ProfileSelectionScreenFABStaticComponent({
    onPress,
}: ProfileSelectionScreenFABStaticComponentProps): React.JSX.Element {
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
        outputRange: [
            ColorFactoryCON.CARD_BG_LIGHT,
            ColorFactoryCON.CARD_BG_LIGHT_PRESSED,
        ],
    });

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={{
                    backgroundColor,
                    borderRadius: 9999,
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    paddingVertical: EdgeInsetsCON.LG,
                    paddingHorizontal: EdgeInsetsCON.XL,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: ColorFactoryCON.WHITE,
                    }}
                >
                    {ProfileSelectionScreenCON.ADD_PROFILE_LABEL}
                </Text>
            </Animated.View>
        </Pressable>
    );
}
