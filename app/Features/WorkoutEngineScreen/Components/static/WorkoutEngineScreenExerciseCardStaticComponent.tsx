import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutEngineScreenCON, {
    WorkoutExercise,
} from "@/app/Features/WorkoutEngineScreen/Constants/WorkoutEngineScreenCON";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, Text, View } from "react-native";
import WorkoutEngineScreenSetRowStaticComponent from "./WorkoutEngineScreenSetRowStaticComponent";

interface WorkoutEngineScreenExerciseCardStaticComponentProps {
    exercise: WorkoutExercise;
    onSetComplete: (setId: string) => void;
    onAddSet: (exerciseId: string) => void;
}

export default function WorkoutEngineScreenExerciseCardStaticComponent({
    exercise,
    onSetComplete,
    onAddSet,
}: WorkoutEngineScreenExerciseCardStaticComponentProps): React.JSX.Element {
    const indexStr = String(exercise.index).padStart(2, "0");

    const handleAddSet = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onAddSet(exercise.id);
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

            {/* Add Set button */}
            <Pressable
                onPress={handleAddSet}
                style={({ pressed }) => ({
                    borderWidth: 1,
                    borderColor: ColorFactoryCON.CARD_BORDER,
                    paddingVertical: EdgeInsetsCON.MD,
                    alignItems: "center",
                    backgroundColor: pressed
                        ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
                        : "transparent",
                })}
            >
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                    }}
                >
                    {WorkoutEngineScreenCON.CTA_ADD_SET}
                </Text>
            </Pressable>
        </View>
    );
}
