import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface CustomWorkoutsViewScreenCardStaticComponentProps {
    id: string;
    name: string;
    exercises: string[];
    weekDay?: string;
    isSelecting: boolean;
    isSelected: boolean;
    onPress: () => void;
    onLongPress: () => void;
    onEdit?: () => void;
}

export default function CustomWorkoutsViewScreenCardStaticComponent({
    id,
    name,
    exercises,
    weekDay,
    isSelecting,
    isSelected,
    onPress,
    onLongPress,
    onEdit,
}: CustomWorkoutsViewScreenCardStaticComponentProps): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            delayLongPress={350}
        >
            <View
                style={{
                    paddingVertical: EdgeInsetsCON.MD,
                    borderBottomWidth: 1,
                    borderBottomColor: ColorFactoryCON.CARD_BORDER,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: EdgeInsetsCON.LG,
                    backgroundColor: pressed
                        ? ColorFactoryCON.CARD_BG_LIGHT
                        : "transparent",
                }}
            >
                {/* Checkbox — only in selection mode */}
                {isSelecting && (
                    <View
                        style={{
                            width: 24,
                            height: 24,
                            borderWidth: 2,
                            borderColor: isSelected
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.CARD_BORDER,
                            backgroundColor: isSelected
                                ? ColorFactoryCON.WHITE
                                : "transparent",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isSelected && (
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "900",
                                    color: ColorFactoryCON.BLACK,
                                    lineHeight: 16,
                                }}
                            >
                                ✓
                            </Text>
                        )}
                    </View>
                )}

                {/* Name + exercises */}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "900",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                            marginTop: 2,
                        }}
                    >
                        {exercises.length} Exercises • {exercises.join(", ")}
                    </Text>
                </View>

                {/* Edit icon — hidden in selection mode */}
                {!isSelecting && onEdit && (
                    <Pressable
                        onPress={onEdit}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                        style={{ padding: EdgeInsetsCON.SM }}
                    >
                        <Ionicons
                            name="create-outline"
                            size={20}
                            color={ColorFactoryCON.WHITE}
                        />
                    </Pressable>
                )}
            </View>
        </Pressable>
    );
}
