import ApplicationToolbarBackButton from "@/app/Components/Shared/ApplicationToolbarBackButton";
import StandardBottomSheetComponent from "@/app/Components/Shared/StandardBottomSheetComponent";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import StandardConfirmationModalComponent from "@/app/Components/Shared/StandardConfirmationModalComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import ExerciseLibraryCON from "@/app/Constants/ExerciseLibraryCON";
import WorkoutEngineScreenCON from "@/app/Features/WorkoutEngineScreen/Constants/WorkoutEngineScreenCON";
import WorkoutListScreenCON from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import DatabaseService from "@/app/Services/DatabaseService";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import { WorkoutExerciseType } from "@/app/Types/WorkoutExerciseType";
import { WorkoutSetType } from "@/app/Types/WorkoutSetType";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Alert,
    LayoutAnimation,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

    const customWorkouts = useUserCustomDataStateStore(
        (state) => state.customWorkouts,
    );
    const customExercises = useUserCustomDataStateStore(
        (state) => state.customExercises,
    );

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

    const workout = useMemo(
        () => allWorkouts.find((w) => w.id === id),
        [allWorkouts, id],
    );

    const [sessionState, setSessionState] = useState<SessionState>("idle");
    const [startModalVisible, setStartModalVisible] = useState<boolean>(false);
    const [stopModalVisible, setStopModalVisible] = useState<boolean>(false);
    const [completeModalVisible, setCompleteModalVisible] =
        useState<boolean>(false);
    const [deleteConfirmModalVisible, setDeleteConfirmModalVisible] =
        useState<boolean>(false);
    const [deleteTargetExId, setDeleteTargetExId] = useState<string | null>(
        null,
    );
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

    const [exercises, setExercises] =
        useState<WorkoutExerciseType[]>(initialExercises);
    const [alternateTargetExId, setAlternateTargetExId] = useState<
        string | null
    >(null);

    // Alternate Bottom Sheet search and filtering states
    const [sheetSearchQuery, setSheetSearchQuery] = useState<string>("");
    const [sheetSearchFocused, setSheetSearchFocused] =
        useState<boolean>(false);
    const [sheetActiveGroup, setSheetActiveGroup] = useState<string>("Chest");

    // Load static and custom exercises library list
    const allLibraryExercises = useMemo(() => {
        const staticList = ExerciseLibraryCON.EXERCISES;
        const customList = customExercises
            ? Object.entries(customExercises).map(([id, data]) => ({
                  id,
                  name: data.name,
                  muscleGroup: data.muscleGroup,
                  category: data.category || "Custom",
              }))
            : [];
        return [...staticList, ...customList];
    }, [customExercises]);

    // Filter exercises by muscle group and search query
    const filteredAlternativeExercises = useMemo(() => {
        const q = sheetSearchQuery.trim().toLowerCase();
        let list = allLibraryExercises.filter(
            (ex) =>
                ex.muscleGroup.toLowerCase() === sheetActiveGroup.toLowerCase(),
        );
        if (!q) return list;
        return list.filter(
            (ex) =>
                ex.name.toLowerCase().includes(q) ||
                ex.muscleGroup.toLowerCase().includes(q),
        );
    }, [sheetSearchQuery, sheetActiveGroup, allLibraryExercises]);

    // Helper to get category for alternative exercises
    const getExerciseCategory = useCallback(
        (name: string): string => {
            const found = allLibraryExercises.find((e) => e.name === name);
            return found ? found.category : "Custom";
        },
        [allLibraryExercises],
    );

    const handleAlternatePress = useCallback((exerciseId: string): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSheetSearchQuery("");
        setSheetActiveGroup("Chest");
        setAlternateTargetExId(exerciseId);
    }, []);

    const handleConfirmAlternate = useCallback(
        (newExName: string): void => {
            if (!alternateTargetExId) return;
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            const category = getExerciseCategory(newExName);

            setExercises((prev) =>
                prev.map((ex) => {
                    if (ex.id === alternateTargetExId) {
                        return {
                            ...ex,
                            name: newExName,
                            category: category,
                        };
                    }
                    return ex;
                }),
            );

            setAlternateTargetExId(null);
        },
        [alternateTargetExId, getExerciseCategory],
    );

    const handleDeleteExercise = useCallback((exerciseId: string): void => {
        setDeleteTargetExId(exerciseId);
        setDeleteConfirmModalVisible(true);
    }, []);

    const handleConfirmDelete = useCallback((): void => {
        if (!deleteTargetExId) return;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExercises((prev) => prev.filter((ex) => ex.id !== deleteTargetExId));
        setDeleteTargetExId(null);
        setDeleteConfirmModalVisible(false);
    }, [deleteTargetExId]);

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
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
            await DatabaseService.getInstance().saveWorkoutSession(
                sessionPayload,
            );

            setCompleteModalVisible(false);
            setSessionState("idle");
            router.back();
        } catch (error) {
            console.error("Error saving workout session to RTDB:", error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setCompleteModalVisible(false);
        }
    };

    // Actions for the alternate bottom sheet header
    const bottomSheetActions = useMemo(() => [
        {
            label: "Voice Module",
            onPress: () => {
                console.log("Voice Module action triggered from bottom sheet");
            },
            icon: "mic-outline",
        },
        {
            label: "Create Exercise",
            onPress: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setAlternateTargetExId(null);
                setTimeout(() => {
                    router.push("/create-exercise");
                }, 200);
            },
            icon: "add-circle-outline",
        },
    ], [router, setAlternateTargetExId]);

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
                    onPress={
                        sessionState === "idle" ? undefined : handleStopPress
                    }
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
                        isStarted={sessionState !== "idle"}
                        onAlternate={handleAlternatePress}
                        onDelete={handleDeleteExercise}
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
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: EdgeInsetsCON.SM,
                                }}
                            >
                                <FABButton
                                    label={WorkoutEngineScreenCON.CTA_PAUSE}
                                    onPress={handlePause}
                                    isPrimary={false}
                                />
                                <StandardButtonComponent
                                    label={WorkoutEngineScreenCON.CTA_STOP}
                                    onPress={handleStopPress}
                                    variant={
                                        StandardButtonComponentVariant.DANGER
                                    }
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
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: EdgeInsetsCON.SM,
                                }}
                            >
                                <FABButton
                                    label={WorkoutEngineScreenCON.CTA_RESUME}
                                    onPress={handleResume}
                                    isPrimary={true}
                                />
                                <StandardButtonComponent
                                    label={WorkoutEngineScreenCON.CTA_STOP}
                                    onPress={handleStopPress}
                                    variant={
                                        StandardButtonComponentVariant.DANGER
                                    }
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

            <StandardConfirmationModalComponent
                visible={deleteConfirmModalVisible}
                title="Delete Exercise"
                subtitle="Are you sure you want to remove this exercise from your active session? Any logged sets will be lost."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteConfirmModalVisible(false)}
            />

            <StandardBottomSheetComponent
                visible={alternateTargetExId !== null}
                title="Alternate Exercise"
                onClose={() => setAlternateTargetExId(null)}
                rightIconType="more"
                actions={bottomSheetActions}
            >
                {/* Search bar */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: sheetSearchFocused
                            ? ColorFactoryCON.WHITE
                            : ColorFactoryCON.CARD_BORDER,
                        paddingHorizontal: EdgeInsetsCON.LG,
                        paddingVertical: EdgeInsetsCON.MD,
                        marginBottom: EdgeInsetsCON.LG,
                        gap: EdgeInsetsCON.MD,
                        backgroundColor: "transparent",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 26,
                            color: sheetSearchFocused
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.MUTE,
                        }}
                    >
                        ⌕
                    </Text>
                    <TextInput
                        value={sheetSearchQuery}
                        onChangeText={setSheetSearchQuery}
                        placeholder="Search exercises..."
                        placeholderTextColor={ColorFactoryCON.CARD_BORDER}
                        onFocus={() => setSheetSearchFocused(true)}
                        onBlur={() => setSheetSearchFocused(false)}
                        style={{
                            flex: 1,
                            fontSize: 15,
                            fontWeight: "700",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            paddingVertical: EdgeInsetsCON.XS,
                        }}
                    />
                </View>

                {/* Muscle group chips */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginLeft: -EdgeInsetsCON.SCREEN_H,
                        marginRight: -EdgeInsetsCON.SCREEN_H,
                        marginBottom: EdgeInsetsCON.LG,
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                        gap: EdgeInsetsCON.SM,
                        paddingBottom: EdgeInsetsCON.XS,
                    }}
                >
                    {[
                        "Chest",
                        "Back",
                        "Shoulders",
                        "Arms",
                        "Legs",
                        "Core",
                        "Traps",
                        "Full Body",
                        "Cardio",
                    ].map((group) => {
                        const isActive = sheetActiveGroup === group;
                        return (
                            <Pressable
                                key={group}
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Light,
                                    );
                                    setSheetActiveGroup(group);
                                }}
                                style={{
                                    paddingHorizontal: EdgeInsetsCON.XL,
                                    paddingVertical: EdgeInsetsCON.SM,
                                    borderWidth: 1,
                                    borderColor: isActive
                                        ? ColorFactoryCON.WHITE
                                        : ColorFactoryCON.CARD_BORDER,
                                    backgroundColor: isActive
                                        ? ColorFactoryCON.WHITE
                                        : "transparent",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "700",
                                        color: isActive
                                            ? ColorFactoryCON.BLACK
                                            : ColorFactoryCON.MUTE,
                                        textTransform: "uppercase",
                                        letterSpacing: 2,
                                    }}
                                >
                                    {group}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                {/* Exercises list */}
                {filteredAlternativeExercises.map((ex, index) => {
                    const isEven = index % 2 === 0;
                    const restingBg = isEven
                        ? ColorFactoryCON.CARD_BG_LIGHT
                        : ColorFactoryCON.CARD_BG_LIGHT_PRESSED;
                    const pressedBg = isEven ? "#222222" : "#2a2a2a";

                    return (
                        <Pressable
                            key={ex.id}
                            onPress={() => handleConfirmAlternate(ex.name)}
                        >
                            {({ pressed }) => (
                                <View
                                    style={{
                                        backgroundColor: pressed
                                            ? pressedBg
                                            : restingBg,
                                        borderWidth: 1,
                                        borderColor:
                                            ColorFactoryCON.CARD_BORDER,
                                        marginBottom: EdgeInsetsCON.MD,
                                        transform: [
                                            { scale: pressed ? 0.98 : 1 },
                                        ],
                                        opacity: pressed ? 0.85 : 1,
                                        flexDirection: "row",
                                        alignItems: "stretch",
                                    }}
                                >
                                    {/* Number badge card (edge-to-edge) */}
                                    <View
                                        style={{
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.1)",
                                            borderRightWidth: 1,
                                            borderRightColor:
                                                ColorFactoryCON.CARD_BORDER,
                                            width: 42,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "Anton",
                                                fontSize: 14,
                                                color: ColorFactoryCON.WHITE,
                                            }}
                                        >
                                            {index + 1}
                                        </Text>
                                    </View>

                                    {/* Exercise Name Container */}
                                    <View
                                        style={{
                                            flex: 1,
                                            paddingVertical: 14,
                                            paddingHorizontal: EdgeInsetsCON.XL,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "500",
                                                color: ColorFactoryCON.WHITE,
                                            }}
                                        >
                                            {ex.name}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </Pressable>
                    );
                })}

                {filteredAlternativeExercises.length === 0 && (
                    <View style={{ paddingVertical: 40, alignItems: "center" }}>
                        <Text
                            style={{
                                color: ColorFactoryCON.MUTE,
                                fontSize: 14,
                            }}
                        >
                            No exercises found
                        </Text>
                    </View>
                )}
            </StandardBottomSheetComponent>
        </SafeAreaView>
    );
}
