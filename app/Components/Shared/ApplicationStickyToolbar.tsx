import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface ApplicationStickyToolbarProps {
    title: string;
    onClose: () => void;
    leftIconType?: "close" | "back";
}

export default function ApplicationStickyToolbar({
    title,
    onClose,
    leftIconType = "close",
}: ApplicationStickyToolbarProps): React.JSX.Element {
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

                {/* Spacer to centre the title */}
                <View style={{ width: 40 }} />
            </View>
        </BlurView>
    );
}
