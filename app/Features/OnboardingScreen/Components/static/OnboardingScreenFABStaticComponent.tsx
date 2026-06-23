import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ColorFactoryCON from "../../../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../../../Constants/EdgeInsetsCON";

interface OnboardingScreenFABStaticComponentProps {
    onNext: () => void;
    onBack: () => void;
    canGoBack: boolean;
}

type FABButtonVariant = "next" | "back";

function FABButton({
    variant,
    onPress,
    flex,
}: {
    variant: FABButtonVariant;
    onPress: () => void;
    flex: number;
}): React.JSX.Element {
    const isNext = variant === "next";
    const [pressed, setPressed] = useState<boolean>(false);

    const handlePressIn = (): void => setPressed(true);
    const handlePressOut = (): void => setPressed(false);

    const handlePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
    };

    const backgroundColor = isNext
        ? pressed
            ? ColorFactoryCON.HAIRLINE
            : ColorFactoryCON.WHITE
        : pressed
          ? ColorFactoryCON.CARD_BG_LIGHT
          : ColorFactoryCON.CARD_BG_LIGHT_PRESSED;

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={{ flex }}
        >
            <View
                style={{
                    backgroundColor,
                    borderRadius: 9999,
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    paddingVertical: EdgeInsetsCON.LG,
                    paddingHorizontal: EdgeInsetsCON.XL,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: EdgeInsetsCON.XS,
                }}
            >
                {!isNext && (
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: ColorFactoryCON.WHITE,
                        }}
                    >
                        ‹
                    </Text>
                )}
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: isNext
                            ? ColorFactoryCON.INK
                            : ColorFactoryCON.WHITE,
                    }}
                >
                    {isNext ? "Next" : "Previous"}
                </Text>
                {isNext && (
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: ColorFactoryCON.INK,
                        }}
                    >
                        ›
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

export default function OnboardingScreenFABStaticComponent({
    onNext,
    onBack,
    canGoBack,
}: OnboardingScreenFABStaticComponentProps): React.JSX.Element {
    return (
        <View
            style={{
                position: "absolute",
                bottom: EdgeInsetsCON.FAB_BOTTOM,
                left: EdgeInsetsCON.SCREEN_H,
                right: EdgeInsetsCON.SCREEN_H,
                flexDirection: "row",
                gap: EdgeInsetsCON.SM,
            }}
        >
            {canGoBack && (
                <FABButton variant="back" onPress={onBack} flex={1} />
            )}
            <FABButton variant="next" onPress={onNext} flex={1} />
        </View>
    );
}
