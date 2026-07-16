import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
    LayoutAnimation,
    Platform,
    Pressable,
    Text,
    UIManager,
    View,
} from "react-native";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface ToolbarAction {
    label: string;
    onPress: () => void;
    icon?: string;
}

interface ApplicationStickyToolbarProps {
    title: string;
    onClose: () => void;
    leftIconType?: "close" | "back";
    rightIconType?: "more" | "none";
    onRightPress?: () => void;
    actions?: ToolbarAction[];
}

function ActionButton({
    action,
    onPress,
}: {
    action: ToolbarAction;
    onPress: (callback: () => void) => void;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    return (
        <Pressable
            onPressIn={() => {
                setPressed(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onPressOut={() => setPressed(false)}
            onPress={() => onPress(action.onPress)}
            style={{
                flex: 1,
                flexDirection: "row",
                gap: EdgeInsetsCON.XS,
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                backgroundColor: pressed
                    ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
                    : ColorFactoryCON.CARD_BG_LIGHT,
                paddingVertical: EdgeInsetsCON.MD,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {action.icon && (
                <Ionicons
                    name={action.icon as any}
                    size={14}
                    color={ColorFactoryCON.WHITE}
                />
            )}
            <Text
                style={{
                    fontSize: 10,
                    fontWeight: "700",
                    color: ColorFactoryCON.WHITE,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                }}
            >
                {action.label}
            </Text>
        </Pressable>
    );
}

export default function ApplicationStickyToolbar({
    title,
    onClose,
    leftIconType = "close",
    rightIconType = "none",
    onRightPress,
    actions = [],
}: ApplicationStickyToolbarProps): React.JSX.Element {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleMorePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded((prev) => !prev);
        if (onRightPress) {
            onRightPress();
        }
    };

    const handleActionPress = (actionOnPress: () => void): void => {
        // Collapse the toolbar first with animation
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(false);
        // Execute original action
        actionOnPress();
    };

    return (
        <BlurView
            intensity={50}
            tint="dark"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                paddingTop: EdgeInsetsCON.SCREEN_TOP,
                paddingBottom: EdgeInsetsCON.LG,
                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Close button */}
                <Pressable
                    onPress={onClose}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {leftIconType === "back" ? (
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={ColorFactoryCON.WHITE}
                        />
                    ) : (
                        <Ionicons
                            name="close"
                            size={24}
                            color={ColorFactoryCON.WHITE}
                        />
                    )}
                </Pressable>

                {/* Title */}
                <Text
                    style={{
                        fontFamily: "Anton",
                        fontSize: 24,
                        fontWeight: "900",
                        color: ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                    }}
                >
                    {title}
                </Text>

                {/* Right button or Spacer to centre the title */}
                {rightIconType === "more" ? (
                    <Pressable
                        onPress={handleMorePress}
                        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons
                            name={isExpanded ? "close" : "ellipsis-vertical"}
                            size={24}
                            color={ColorFactoryCON.WHITE}
                        />
                    </Pressable>
                ) : (
                    <View style={{ width: 40 }} />
                )}
            </View>

            {/* Expanded Actions */}
            {isExpanded && actions && actions.length > 0 && (
                <View
                    style={{
                        flexDirection: "row",
                        gap: EdgeInsetsCON.SM,
                        marginTop: EdgeInsetsCON.LG,
                    }}
                >
                    {actions.map((action, index) => (
                        <ActionButton
                            key={index}
                            action={action}
                            onPress={handleActionPress}
                        />
                    ))}
                </View>
            )}
        </BlurView>
    );
}
