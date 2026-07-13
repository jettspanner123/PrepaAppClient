import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, StyleProp, Text, View, ViewStyle } from "react-native";

// ─── Variant ──────────────────────────────────────────────────────────────────
export enum StandardButtonComponentVariant {
    /** Solid white background, dark ink text — primary CTA */
    WHITE = "WHITE",
    /** Dark background with border, white text — secondary/ghost style */
    DARK = "DARK",
    /** Red background with white text — destructive action */
    DANGER = "DANGER",
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface StandardButtonComponentProps {
    label: string;
    onPress: () => void;

    // Variant
    variant?: StandardButtonComponentVariant;

    // Layout
    style?: StyleProp<ViewStyle>;
    fullWidth?: boolean;

    // Overrides
    backgroundColor?: string;
    pressedBackgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontSize?: number;
    fontWeight?: "400" | "500" | "600" | "700" | "800" | "900";

    // Prefix / suffix text (e.g. chevrons)
    prefixLabel?: string;
    suffixLabel?: string;

    // Haptics
    hapticStyle?: Haptics.ImpactFeedbackStyle;
    disableHaptics?: boolean;

    // State
    disabled?: boolean;
}

export default function StandardButtonComponent({
    label,
    onPress,
    variant = StandardButtonComponentVariant.WHITE,
    style,
    fullWidth = false,
    backgroundColor,
    pressedBackgroundColor,
    textColor,
    borderColor,
    borderWidth = 1,
    borderRadius = 9999,
    paddingVertical = EdgeInsetsCON.LG,
    paddingHorizontal = EdgeInsetsCON.XL,
    fontSize = 16,
    fontWeight = "600",
    prefixLabel,
    suffixLabel,
    hapticStyle = Haptics.ImpactFeedbackStyle.Light,
    disableHaptics = false,
    disabled = false,
}: StandardButtonComponentProps): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    // ─── Default colors per variant ───────────────────────────────────
    const isWhite = variant === StandardButtonComponentVariant.WHITE;
    const isDanger = variant === StandardButtonComponentVariant.DANGER;

    const resolvedBg =
        backgroundColor ??
        (isWhite
            ? ColorFactoryCON.WHITE
            : isDanger
              ? ColorFactoryCON.DANGER_MUTED
              : ColorFactoryCON.CARD_BG_LIGHT_PRESSED);

    const resolvedPressedBg =
        pressedBackgroundColor ??
        (isWhite
            ? ColorFactoryCON.HAIRLINE
            : isDanger
              ? ColorFactoryCON.DANGER
              : ColorFactoryCON.CARD_BG_LIGHT);

    const resolvedTextColor =
        textColor ??
        (isWhite
            ? ColorFactoryCON.INK
            : isDanger
              ? ColorFactoryCON.DANGER
              : ColorFactoryCON.WHITE);

    const resolvedBorderColor =
        borderColor ??
        (isWhite
            ? ColorFactoryCON.HAIRLINE
            : isDanger
              ? ColorFactoryCON.DANGER
              : ColorFactoryCON.CARD_BORDER);

    const handlePressIn = (): void => setPressed(true);
    const handlePressOut = (): void => setPressed(false);

    const handlePress = (): void => {
        if (disabled) return;
        if (!disableHaptics) {
            Haptics.impactAsync(hapticStyle);
        }
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={[fullWidth ? { alignSelf: "stretch" } : {}, style]}
        >
            <View
                style={{
                    backgroundColor: pressed ? resolvedPressedBg : resolvedBg,
                    borderRadius,
                    borderWidth,
                    borderColor: resolvedBorderColor,
                    paddingVertical,
                    paddingHorizontal,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: EdgeInsetsCON.XS,
                    opacity: disabled ? 0.4 : 1,
                }}
            >
                {prefixLabel !== undefined && (
                    <Text
                        style={{
                            fontSize,
                            fontWeight,
                            color: resolvedTextColor,
                        }}
                    >
                        {prefixLabel}
                    </Text>
                )}
                <Text
                    style={{
                        fontSize,
                        fontWeight,
                        color: resolvedTextColor,
                    }}
                >
                    {label}
                </Text>
                {suffixLabel !== undefined && (
                    <Text
                        style={{
                            fontSize,
                            fontWeight,
                            color: resolvedTextColor,
                        }}
                    >
                        {suffixLabel}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}
