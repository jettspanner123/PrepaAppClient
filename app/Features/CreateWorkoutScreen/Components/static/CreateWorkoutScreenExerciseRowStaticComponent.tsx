import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { ExerciseItem } from "@/app/Constants/ExerciseLibraryCON";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface CreateWorkoutScreenExerciseRowStaticComponentProps {
    item: ExerciseItem;
    index: number;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export default function CreateWorkoutScreenExerciseRowStaticComponent({
    item,
    index,
    isSelected,
    onToggle,
}: CreateWorkoutScreenExerciseRowStaticComponentProps): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    const handlePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onToggle(item.id);
    };

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: EdgeInsetsCON.LG,
                borderBottomWidth: 1,
                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                backgroundColor: pressed
                    ? ColorFactoryCON.CARD_BG_LIGHT
                    : "transparent",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: EdgeInsetsCON.LG,
                    flex: 1,
                }}
            >
                {/* Checkbox */}
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

                {/* Name + category */}
                <View style={{ flex: 1, gap: 2 }}>
                    <Text
                        style={{
                            fontFamily: "Anton",
                            fontSize: 24,
                            fontWeight: "900",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            flexWrap: "wrap",
                        }}
                    >
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                        }}
                    >
                        {item.muscleGroup} · {item.category}
                    </Text>
                </View>
            </View>

            {/* Index number */}
            <Text
                style={{
                    fontSize: 11,
                    fontWeight: "700",
                    color: ColorFactoryCON.CARD_BORDER,
                    letterSpacing: 1,
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </Text>
        </Pressable>
    );
}
