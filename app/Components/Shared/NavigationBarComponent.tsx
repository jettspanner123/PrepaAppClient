import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import {
    AntDesign,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface NavigationBarItem {
    key: number;
    label: string;
    icon: (active: boolean) => React.JSX.Element;
}

// ─── Tab item — each takes equal flex, active gets white bg ──────────────────
function TabItem({
    item,
    isActive,
    onPress,
}: {
    item: NavigationBarItem;
    isActive: boolean;
    onPress: () => void;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => {
                setPressed(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onPressOut={() => setPressed(false)}
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: EdgeInsetsCON.LG,
                backgroundColor: isActive
                    ? ColorFactoryCON.WHITE
                    : "rgba(0,0,0,0.3)",
                opacity: pressed ? 0.6 : 1,
            }}
        >
            {item.icon(isActive)}
            <Text
                style={{
                    fontSize: 8,
                    fontWeight: "700",
                    color: isActive
                        ? ColorFactoryCON.INK
                        : ColorFactoryCON.MUTE,
                    marginTop: EdgeInsetsCON.XXS,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                }}
            >
                {item.label}
            </Text>
        </Pressable>
    );
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface NavigationBarComponentProps {
    items: NavigationBarItem[];
    currentKey: number;
    onPress: (key: number) => void;
}

export default function NavigationBarComponent({
    items,
    currentKey,
    onPress,
}: NavigationBarComponentProps): React.JSX.Element {
    const ranksItem = items.find((item) => item.label.toLowerCase() === "ranks");
    const mainItems = items.filter((item) => item.label.toLowerCase() !== "ranks");

    return (
        <View
            style={{
                position: "absolute",
                bottom: EdgeInsetsCON.LG,
                marginBottom: 10,
                left: EdgeInsetsCON.SCREEN_H,
                right: EdgeInsetsCON.SCREEN_H,
                flexDirection: "row",
                alignItems: "stretch",
                gap: EdgeInsetsCON.MD,
            }}
            pointerEvents="box-none"
        >
            {ranksItem && (
                <BlurView
                    intensity={60}
                    tint="dark"
                    style={{
                        width: 72,
                        borderWidth: 1,
                        borderColor: ColorFactoryCON.CARD_BORDER,
                        overflow: "hidden",
                        shadowColor: ColorFactoryCON.SHADOW,
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.6,
                        shadowRadius: 16,
                        elevation: 12,
                    }}
                >
                    <TabItem
                        item={ranksItem}
                        isActive={currentKey === ranksItem.key}
                        onPress={() => onPress(ranksItem.key)}
                    />
                </BlurView>
            )}

            <BlurView
                intensity={60}
                tint="dark"
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "stretch",
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    overflow: "hidden",
                    shadowColor: ColorFactoryCON.SHADOW,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.6,
                    shadowRadius: 16,
                    elevation: 12,
                }}
            >
                {mainItems.map((item) => (
                    <TabItem
                        key={item.key}
                        item={item}
                        isActive={currentKey === item.key}
                        onPress={() => onPress(item.key)}
                    />
                ))}
            </BlurView>
        </View>
    );
}

// ─── Preset icon helpers ──────────────────────────────────────────────────────
export const NavIcons = {
    ranks: (active: boolean) => (
        <Ionicons
            name="trophy-outline"
            size={20}
            color={active ? ColorFactoryCON.INK : ColorFactoryCON.MUTE}
        />
    ),
    barbell: (active: boolean) => (
        <Ionicons
            name="barbell-outline"
            size={20}
            color={active ? ColorFactoryCON.INK : ColorFactoryCON.MUTE}
        />
    ),
    diet: (active: boolean) => (
        <MaterialCommunityIcons
            name="food-apple-outline"
            size={20}
            color={active ? ColorFactoryCON.INK : ColorFactoryCON.MUTE}
        />
    ),
    statistics: (active: boolean) => (
        <Feather
            name="bar-chart-2"
            size={20}
            color={active ? ColorFactoryCON.INK : ColorFactoryCON.MUTE}
        />
    ),
    settings: (active: boolean) => (
        <AntDesign
            name="setting"
            size={20}
            color={active ? ColorFactoryCON.INK : ColorFactoryCON.MUTE}
        />
    ),
};
