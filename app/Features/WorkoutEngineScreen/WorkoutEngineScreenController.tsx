import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import StandardConfirmationModalComponent from "@/app/Components/Shared/StandardConfirmationModalComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutEngineScreenCON, {
    WorkoutExercise,
    WorkoutSet,
} from "@/app/Features/WorkoutEngineScreen/Constants/WorkoutEngineScreenCON";
import * as Haptics from "expo-haptics";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutEngineScreenExerciseCardStaticComponent from "./Components/static/WorkoutEngineScreenExerciseCardStaticComponent";
import WorkoutEngineScreenHeaderStaticComponent from "./Components/static/WorkoutEngineScreenHeaderStaticComponent";

type SessionState = "idle" | "running" | "paused";

// ─── FAB button ───────────────────────────────────────────────────────────────
function FABButton({
    label,
    onPress,
    isPrimary,
}: {
    label: string;
    onPress: () => void;
    isPrimary: boolean;
}): React.JSX.Element {
    const [pressed, setPressed] = useState<boolean>(false);

    const bg = isPrimary
        ? pressed
            ? ColorFactoryCON.HAIRLINE
            : ColorFactoryCON.WHITE
        : pressed
          ? ColorFactoryCON.CARD_BG_LIGHT_PRESSED
          : ColorFactoryCON.CARD_BG_LIGHT_PRESSED;

    return (
        <Pressable
            onPressIn={() => {
                setPressed(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onPressOut={() => setPressed(false)}
            onPress={onPress}
            style={{ flex: 1 }}
        >
            <View
                style={{
                    backgroundColor: bg,
                    borderWidth: 1,
                    borderColor: isPrimary
                        ? ColorFactoryCON.WHITE
                        : ColorFactoryCON.CARD_BORDER,
                    paddingVertical: EdgeInsetsCON.LG,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: "700",
                        color: isPrimary
                            ? ColorFactoryCON.BLACK
                            : ColorFactoryCON.WHITE,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                    }}
                >
                    {label}
                </Text>
            </View>
        </Pressable>
    );
}

export default function WorkoutEngineScreenController(): React.JSX.Element {
    const [sessionState, setSessionState] = useState<SessionState>("idle");
    const [startModalVisible, setStartModalVisible] = useState<boolean>(false);
    const [stopModalVisible, setStopModalVisible] = useState<boolean>(false);
    const [exercises, setExercises] = useState<WorkoutExercise[]>(
        WorkoutEngineScreenCON.EXERCISES,
    );

    const isRunning = sessionState === "running";

    // ─── Set handlers ─────────────────────────────────────────────────
    const handleSetComplete = useCallback((setId: string): void => {
        setExercises((prev) =>
            prev.map((exercise) => ({
                ...exercise,
                sets: exercise.sets.map((set) =>
                    set.id === setId ? { ...set, completed: true } : set,
                ),
            })),
        );
    }, []);

    const handleAddSet = useCallback((exerciseId: string): void => {
        setExercises((prev) =>
            prev.map((exercise) => {
                if (exercise.id !== exerciseId) return exercise;
                const newSetNumber = exercise.sets.length + 1;
                const lastSet = exercise.sets[exercise.sets.length - 1];
                const newSet: WorkoutSet = {
                    id: `${exerciseId}-${newSetNumber}`,
                    setNumber: newSetNumber,
                    totalSets: newSetNumber,
                    weightPlaceholder: lastSet?.weightPlaceholder ?? "",
                    repsPlaceholder: lastSet?.repsPlaceholder ?? "",
                    completed: false,
                };
                const updatedSets = exercise.sets.map((s) => ({
                    ...s,
                    totalSets: newSetNumber,
                }));
                return { ...exercise, sets: [...updatedSets, newSet] };
            }),
        );
    }, []);

    // ─── Session state handlers ────────────────────────────────────────
    const handleStartPress = (): void => setStartModalVisible(true);

    const handleStartConfirm = (): void => {
        setStartModalVisible(false);
        setSessionState("running");
    };

    const handlePause = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSessionState("paused");
    };

    const handleResume = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSessionState("running");
    };

    const handleStopPress = (): void => setStopModalVisible(true);

    const handleStopConfirm = (): void => {
        setStopModalVisible(false);
        setSessionState("idle");
        console.log("Session stopped");
        // TODO: save + navigate back
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: EdgeInsetsCON.SCREEN_TOP,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <WorkoutEngineScreenHeaderStaticComponent
                    isRunning={isRunning}
                />

                {exercises.map((exercise) => (
                    <WorkoutEngineScreenExerciseCardStaticComponent
                        key={exercise.id}
                        exercise={exercise}
                        onSetComplete={handleSetComplete}
                        onAddSet={handleAddSet}
                    />
                ))}
            </ScrollView>

            {/* Floating action area */}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                }}
                pointerEvents="box-none"
            >
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
                    {sessionState === "idle" && (
                        <FABButton
                            label={WorkoutEngineScreenCON.CTA_START}
                            onPress={handleStartPress}
                            isPrimary={true}
                        />
                    )}

                    {sessionState === "running" && (
                        <>
                            <FABButton
                                label={WorkoutEngineScreenCON.CTA_PAUSE}
                                onPress={handlePause}
                                isPrimary={false}
                            />
                            <StandardButtonComponent
                                label={WorkoutEngineScreenCON.CTA_STOP}
                                onPress={handleStopPress}
                                variant={StandardButtonComponentVariant.DANGER}
                                style={{ flex: 1 }}
                                borderRadius={0}
                                fontSize={13}
                                fontWeight="700"
                            />
                        </>
                    )}

                    {sessionState === "paused" && (
                        <>
                            <FABButton
                                label={WorkoutEngineScreenCON.CTA_RESUME}
                                onPress={handleResume}
                                isPrimary={true}
                            />
                            <StandardButtonComponent
                                label={WorkoutEngineScreenCON.CTA_STOP}
                                onPress={handleStopPress}
                                variant={StandardButtonComponentVariant.DANGER}
                                style={{ flex: 1 }}
                                borderRadius={0}
                                fontSize={13}
                                fontWeight="700"
                            />
                        </>
                    )}
                </View>
            </View>

            {/* Start modal */}
            <StandardConfirmationModalComponent
                visible={startModalVisible}
                title={WorkoutEngineScreenCON.MODAL_START_TITLE}
                subtitle={WorkoutEngineScreenCON.MODAL_START_SUBTITLE}
                confirmLabel="Start"
                cancelLabel="Cancel"
                onConfirm={handleStartConfirm}
                onCancel={() => setStartModalVisible(false)}
            />

            {/* Stop modal */}
            <StandardConfirmationModalComponent
                visible={stopModalVisible}
                title={WorkoutEngineScreenCON.MODAL_STOP_TITLE}
                subtitle={WorkoutEngineScreenCON.MODAL_STOP_SUBTITLE}
                confirmLabel="Stop"
                cancelLabel="Cancel"
                onConfirm={handleStopConfirm}
                onCancel={() => setStopModalVisible(false)}
            />
        </SafeAreaView>
    );
}
