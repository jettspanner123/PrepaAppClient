import ApplicationToolbarBackButton from "@/app/Components/Shared/ApplicationToolbarBackButton";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import StandardConfirmationModalComponent from "@/app/Components/Shared/StandardConfirmationModalComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutEngineScreenCON from "@/app/Features/WorkoutEngineScreen/Constants/WorkoutEngineScreenCON";
import WorkoutListScreenCON from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import DatabaseService from "@/app/Services/DatabaseService";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutExerciseType } from "@/app/Types/WorkoutExerciseType";
import { WorkoutSetType } from "@/app/Types/WorkoutSetType";
import WorkoutEngineScreenExerciseCardStaticComponent from "./Components/static/WorkoutEngineScreenExerciseCardStaticComponent";
import WorkoutEngineScreenHeaderStaticComponent from "./Components/static/WorkoutEngineScreenHeaderStaticComponent";

type SessionState = "idle" | "running" | "paused";

const SHADOW_STYLE = {
    shadowColor: ColorFactoryCON.SHADOW,
    shadowOffset: {
        width: EdgeInsetsCON.SHADOW_OFFSET_W,
        height: EdgeInsetsCON.SHADOW_OFFSET_H,
    },
    shadowOpacity: EdgeInsetsCON.SHADOW_OPACITY,
    shadowRadius: EdgeInsetsCON.SHADOW_RADIUS,
    elevation: EdgeInsetsCON.SHADOW_ELEVATION,
};

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
                    ...SHADOW_STYLE,
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
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const navigation = useNavigation();

    const customWorkouts = useUserCustomDataStateStore((state) => state.customWorkouts);

    const allWorkouts = useMemo(() => {
        const staticList = WorkoutListScreenCON.WORKOUTS;
        if (!customWorkouts) {
            return staticList;
        }
        const customList = Object.values(customWorkouts).map((w) => ({
            id: w.id || "",
            tags: ["Custom"],
            title: w.name,
            description: w.exercises.join(", "),
            exercises: w.exercises.map((name) => ({ name })),
        }));
        return [...staticList, ...customList];
    }, [customWorkouts]);

    const workout = useMemo(() => allWorkouts.find((w) => w.id === id), [allWorkouts, id]);

    const [sessionState, setSessionState] = useState<SessionState>("idle");
    const [startModalVisible, setStartModalVisible] = useState<boolean>(false);
    const [stopModalVisible, setStopModalVisible] = useState<boolean>(false);
    const [completeModalVisible, setCompleteModalVisible] = useState<boolean>(false);
    const [elapsed, setElapsed] = useState<number>(0);

    const initialExercises = useMemo(() => {
        if (!workout) return WorkoutEngineScreenCON.EXERCISES;
        return workout.exercises.map((ex, index) => ({
            id: String(index + 1),
            index: index + 1,
            category: workout.tags[0] ?? "Exercise",
            name: ex.name,
            sets: [
                {
                    id: `${index + 1}-1`,
                    setNumber: 1,
                    totalSets: 1,
                    weightPlaceholder: "0",
                    repsPlaceholder: "8",
                    completed: false,
                },
            ],
        }));
    }, [workout]);

    const [exercises, setExercises] = useState<WorkoutExerciseType[]>(initialExercises);

    useEffect(() => {
        setExercises(initialExercises);
    }, [initialExercises]);

    const isRunning = sessionState === "running";

    // Stable tick callback — increments elapsed only while running
    const handleTick = useCallback((): void => {
        setElapsed((prev) => prev + 1);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            gestureEnabled: sessionState === "idle",
        });
    }, [navigation, sessionState]);

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
                const newSet: WorkoutSetType = {
                    id: `${exerciseId}-${newSetNumber}`,
                    setNumber: newSetNumber,
                    totalSets: newSetNumber,
                    weightPlaceholder: lastSet?.weightPlaceholder ?? "0",
                    repsPlaceholder: lastSet?.repsPlaceholder ?? "8",
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

    // ─── Session handlers ─────────────────────────────────────────────
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
        router.back();
    };

    const handleCompletePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setCompleteModalVisible(true);
    };

    const handleCompleteConfirm = async (): Promise<void> => {
        const totalCompletedSets = exercises.reduce(
            (total, exercise) =>
                total + exercise.sets.filter((s) => s.completed).length,
            0,
        );

        if (totalCompletedSets === 0) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            Alert.alert(
                "Empty Session",
                "You haven't completed any sets! Please complete at least one set before saving, or use the Stop button to exit.",
                [{ text: "OK", onPress: () => setCompleteModalVisible(false) }],
            );
            return;
        }

        try {
            const sessionPayload = {
                workoutId: id ?? "unknown",
                workoutName: titleLine1,
                exercises: exercises,
                durationSeconds: elapsed,
            };
            console.log(
                "Saving workout session to RTDB:",
                JSON.stringify(sessionPayload, null, 2),
            );
            await DatabaseService.getInstance().saveWorkoutSession(sessionPayload);
            
            setCompleteModalVisible(false);
            setSessionState("idle");
            router.back();
        } catch (error) {
            console.error("Error saving workout session to RTDB:", error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setCompleteModalVisible(false);
        }
    };

    // ─── Dynamic title lines ──────────────────────────────────────────
    const titleLine1 =
        workout?.title ?? WorkoutEngineScreenCON.SESSION_TITLE_LINE1;
    const titleLine2 = WorkoutEngineScreenCON.SESSION_TITLE_LINE2;

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
                <ApplicationToolbarBackButton
                    onPress={sessionState === "idle" ? undefined : handleStopPress}
                />
                <WorkoutEngineScreenHeaderStaticComponent
                    isRunning={isRunning}
                    elapsed={elapsed}
                    onTick={handleTick}
                    titleLine1={titleLine1}
                    titleLine2={titleLine2}
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
                        flexDirection: "column",
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
                            <View style={{ flexDirection: "row", gap: EdgeInsetsCON.SM }}>
                                <FABButton
                                    label={WorkoutEngineScreenCON.CTA_PAUSE}
                                    onPress={handlePause}
                                    isPrimary={false}
                                />
                                <StandardButtonComponent
                                    label={WorkoutEngineScreenCON.CTA_STOP}
                                    onPress={handleStopPress}
                                    variant={StandardButtonComponentVariant.DANGER}
                                    style={[{ flex: 1 }, SHADOW_STYLE]}
                                    borderRadius={0}
                                    fontSize={13}
                                    fontWeight="700"
                                />
                            </View>
                            <StandardButtonComponent
                                label={WorkoutEngineScreenCON.CTA_FINISH}
                                onPress={handleCompletePress}
                                variant={StandardButtonComponentVariant.WHITE}
                                fullWidth
                                style={SHADOW_STYLE}
                                borderRadius={0}
                                fontSize={13}
                                fontWeight="700"
                            />
                        </>
                    )}
                    {sessionState === "paused" && (
                        <>
                            <View style={{ flexDirection: "row", gap: EdgeInsetsCON.SM }}>
                                <FABButton
                                    label={WorkoutEngineScreenCON.CTA_RESUME}
                                    onPress={handleResume}
                                    isPrimary={true}
                                />
                                <StandardButtonComponent
                                    label={WorkoutEngineScreenCON.CTA_STOP}
                                    onPress={handleStopPress}
                                    variant={StandardButtonComponentVariant.DANGER}
                                    style={[{ flex: 1 }, SHADOW_STYLE]}
                                    borderRadius={0}
                                    fontSize={13}
                                    fontWeight="700"
                                />
                            </View>
                            <StandardButtonComponent
                                label={WorkoutEngineScreenCON.CTA_FINISH}
                                onPress={handleCompletePress}
                                variant={StandardButtonComponentVariant.WHITE}
                                fullWidth
                                style={SHADOW_STYLE}
                                borderRadius={0}
                                fontSize={13}
                                fontWeight="700"
                            />
                        </>
                    )}
                </View>
            </View>

            <StandardConfirmationModalComponent
                visible={startModalVisible}
                title={WorkoutEngineScreenCON.MODAL_START_TITLE}
                subtitle={WorkoutEngineScreenCON.MODAL_START_SUBTITLE}
                confirmLabel="Start"
                cancelLabel="Cancel"
                onConfirm={handleStartConfirm}
                onCancel={() => setStartModalVisible(false)}
            />

            <StandardConfirmationModalComponent
                visible={stopModalVisible}
                title={WorkoutEngineScreenCON.MODAL_STOP_TITLE}
                subtitle={WorkoutEngineScreenCON.MODAL_STOP_SUBTITLE}
                confirmLabel="Stop"
                cancelLabel="Cancel"
                onConfirm={handleStopConfirm}
                onCancel={() => setStopModalVisible(false)}
            />

            <StandardConfirmationModalComponent
                visible={completeModalVisible}
                title={WorkoutEngineScreenCON.MODAL_COMPLETE_TITLE}
                subtitle={WorkoutEngineScreenCON.MODAL_COMPLETE_SUBTITLE}
                confirmLabel="Complete"
                cancelLabel="Cancel"
                onConfirm={handleCompleteConfirm}
                onCancel={() => setCompleteModalVisible(false)}
            />
        </SafeAreaView>
    );
}
