import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { WorkoutExerciseType } from "@/app/Types/WorkoutExerciseType";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, View } from "react-native";
import WorkoutEngineScreenSetRowStaticComponent from "./WorkoutEngineScreenSetRowStaticComponent";

interface WorkoutEngineScreenExerciseCardStaticComponentProps {
    exercise: WorkoutExerciseType;
    onSetComplete: (setId: string) => void;
    onAddSet: (exerciseId: string) => void;
    isStarted: boolean;
    onAlternate: (exerciseId: string) => void;
    onDelete: (exerciseId: string) => void;
}

export default function WorkoutEngineScreenExerciseCardStaticComponent({
    exercise,
    onSetComplete,
    onAddSet,
    isStarted,
    onAlternate,
    onDelete,
}: WorkoutEngineScreenExerciseCardStaticComponentProps): React.JSX.Element {
    const indexStr = String(exercise.index).padStart(2, "0");

    const handleAddSet = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onAddSet(exercise.id);
    };

    const handleAlternate = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onAlternate(exercise.id);
    };

    const handleDelete = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onDelete(exercise.id);
    };

    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: ColorFactoryCON.CARD_BORDER,
                padding: EdgeInsetsCON.XL,
                gap: EdgeInsetsCON.XL,
                marginBottom: EdgeInsetsCON.XL,
            }}
        >
            {/* Exercise header */}
            <View>
                <Text
                    style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        marginBottom: EdgeInsetsCON.XXS,
                    }}
                >
                    {indexStr} / {exercise.category}
                </Text>
                <Text
                    style={{
                        fontSize: 32,
                        fontWeight: "900",
                        color: ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        lineHeight: 36,
                    }}
                >
                    {exercise.name}
                </Text>
            </View>

            {isStarted && (
                <>
                    {/* Sets */}
                    <View style={{ gap: EdgeInsetsCON.MD }}>
                        {exercise.sets.map((set) => (
                            <WorkoutEngineScreenSetRowStaticComponent
                                key={set.id}
                                set={set}
                                onComplete={onSetComplete}
                            />
                        ))}
                    </View>

                    {/* Action buttons */}
                    <View style={{ gap: EdgeInsetsCON.SM }}>
                        {/* Add Set */}
                        <Pressable onPress={handleAddSet}>
                            {({ pressed }) => (
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: ColorFactoryCON.CARD_BORDER,
                                        paddingVertical: 12,
                                        backgroundColor: pressed
                                            ? "#2a2a2a"
                                            : ColorFactoryCON.CARD_BG_LIGHT_PRESSED,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 6,
                                    }}
                                >
                                    <Ionicons name="add" size={14} color={ColorFactoryCON.MUTE} />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 11,
                                            fontWeight: "700",
                                            color: ColorFactoryCON.MUTE,
                                            textTransform: "uppercase",
                                            letterSpacing: 0.5,
                                        }}
                                    >
                                        Add Set
                                    </Text>
                                </View>
                            )}
                        </Pressable>

                        {/* Alternate & Delete */}
                        <View style={{ flexDirection: "row", gap: EdgeInsetsCON.SM }}>
                            {/* Alternate */}
                            <Pressable
                                onPress={handleAlternate}
                                style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
                            >
                                {({ pressed }) => (
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: ColorFactoryCON.CARD_BORDER,
                                            paddingVertical: 12,
                                            backgroundColor: pressed
                                                ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
                                                : ColorFactoryCON.BLACK,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 6,
                                            width: "100%",
                                        }}
                                    >
                                        <Ionicons name="swap-horizontal" size={14} color={ColorFactoryCON.MUTE} />
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 11,
                                                fontWeight: "700",
                                                color: ColorFactoryCON.MUTE,
                                                textTransform: "uppercase",
                                                letterSpacing: 0.5,
                                            }}
                                        >
                                            Alternate
                                        </Text>
                                    </View>
                                )}
                            </Pressable>

                            {/* Delete */}
                            <Pressable
                                onPress={handleDelete}
                                style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
                            >
                                {({ pressed }) => (
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "rgba(239, 68, 68, 0.3)",
                                            paddingVertical: 12,
                                            backgroundColor: pressed
                                                ? "rgba(239, 68, 68, 0.15)"
                                                : ColorFactoryCON.BLACK,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 6,
                                            width: "100%",
                                        }}
                                    >
                                        <Ionicons name="trash-outline" size={14} color="#ef4444" />
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 11,
                                                fontWeight: "700",
                                                color: "#ef4444",
                                                textTransform: "uppercase",
                                                letterSpacing: 0.5,
                                            }}
                                        >
                                            Delete
                                        </Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}
