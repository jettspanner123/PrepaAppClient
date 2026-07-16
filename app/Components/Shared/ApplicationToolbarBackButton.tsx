import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface ApplicationToolbarBackButtonProps {
    onPress?: () => void;
}

export default function ApplicationToolbarBackButton({
    onPress,
}: ApplicationToolbarBackButtonProps): React.JSX.Element {
    const router = useRouter();

    const handlePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            style={{ marginBottom: EdgeInsetsCON.MD }}
        >
            <Text
                style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                }}
            >
                ← Back
            </Text>
        </Pressable>
    );
}
