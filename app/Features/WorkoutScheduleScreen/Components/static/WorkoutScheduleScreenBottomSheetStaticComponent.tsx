import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import { ScheduleDay } from "@/app/Features/WorkoutScheduleScreen/Constants/WorkoutScheduleScreenCON";
import WorkoutListScreenCON, {
    WorkoutCard,
} from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import useUserCustomDataStateStore from "@/app/Store/UserCustomDataStateStore";
import * as Haptics from "expo-haptics";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

interface WorkoutScheduleScreenBottomSheetStaticComponentProps {
    visible: boolean;
    day: ScheduleDay | null;
    onClose: () => void;
    onSelectWorkout?: (workout: WorkoutCard) => Promise<void> | void;
}

export default function WorkoutScheduleScreenBottomSheetStaticComponent({
    visible,
    day,
    onClose,
    onSelectWorkout,
}: WorkoutScheduleScreenBottomSheetStaticComponentProps): React.JSX.Element {
    const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const [savingWorkoutId, setSavingWorkoutId] = useState<string | null>(null);

    const customWorkouts = useUserCustomDataStateStore((state) => state.customWorkouts);

    const allWorkouts = useMemo(() => {
        const restDay: WorkoutCard = {
            id: "REST",
            tags: ["Rest"],
            title: "Rest Day",
            description: "Take some time to recover and rebuild.",
            exercises: [],
        };
        const staticList = WorkoutListScreenCON.WORKOUTS;
        const customList = customWorkouts
            ? Object.values(customWorkouts).map((w) => ({
                  id: w.id || "",
                  tags: ["Custom"],
                  title: w.name,
                  description: w.exercises.join(", "),
                  exercises: w.exercises.map((name) => ({ name })),
              }))
            : [];
        return [restDay, ...staticList, ...customList];
    }, [customWorkouts]);

    const animateOut = (callback: () => void): void => {
        Animated.timing(sheetTranslateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: false,
        }).start(() => callback());
    };

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        animateOut(onClose);
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) =>
                Math.abs(gestureState.dy) > 5,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    sheetTranslateY.setValue(gestureState.dy);
                } else {
                    sheetTranslateY.setValue(gestureState.dy * 0.2);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 120 || gestureState.vy > 0.5) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    animateOut(onClose);
                } else {
                    Animated.spring(sheetTranslateY, {
                        toValue: 0,
                        damping: 25,
                        stiffness: 200,
                        useNativeDriver: false,
                    }).start();
                }
            },
        }),
    ).current;

    useEffect(() => {
        if (visible) {
            sheetTranslateY.setValue(SCREEN_HEIGHT);
            Animated.spring(sheetTranslateY, {
                toValue: 0,
                damping: 25,
                stiffness: 200,
                useNativeDriver: false,
            }).start();
        }
    }, [visible, sheetTranslateY]);

    const backdropBg = sheetTranslateY.interpolate({
        inputRange: [0, SCREEN_HEIGHT * 0.85, SCREEN_HEIGHT],
        outputRange: ["rgba(0,0,0,0.75)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"],
        extrapolate: "clamp",
    });

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={handleClose}
        >
            <Animated.View
                style={{
                    flex: 1,
                    backgroundColor: backdropBg,
                    justifyContent: "flex-end",
                }}
            >
                {/* Dismiss Touch Area */}
                <Pressable
                    style={{ position: "absolute", inset: 0 } as any}
                    onPress={handleClose}
                />

                {/* Full Bottom Sheet Container */}
                <Animated.View
                    style={{
                        transform: [{ translateY: sheetTranslateY }],
                        height: "85%",
                        backgroundColor: ColorFactoryCON.INK,
                        borderRadius: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Sheet Header — styled like ApplicationStickyToolbar */}
                    <BlurView
                        {...panResponder.panHandlers}
                        intensity={50}
                        tint="dark"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: EdgeInsetsCON.LG,
                            paddingBottom: EdgeInsetsCON.LG,
                            borderBottomWidth: 1,
                            borderBottomColor: ColorFactoryCON.CARD_BORDER,
                        }}
                    >
                        {/* Close button */}
                        <Pressable
                            onPress={handleClose}
                            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                            style={{
                                width: 40,
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons
                                name="close"
                                size={24}
                                color={ColorFactoryCON.WHITE}
                            />
                        </Pressable>

                        {/* Heading Title */}
                        <Text
                            style={{
                                fontFamily: "Anton",
                                fontSize: 18,
                                fontWeight: "900",
                                color: ColorFactoryCON.WHITE,
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                            }}
                        >
                            {day ? day.day : ""}
                        </Text>

                        {/* Right Spacer to center title */}
                        <View style={{ width: 40 }} />
                    </BlurView>

                    {/* Scrollable Workout Cards List */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: 88,
                            paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                        }}
                    >
                        {allWorkouts.map((workout) => (
                            <View
                                key={workout.id}
                                style={{
                                    backgroundColor: ColorFactoryCON.CARD_BG_LIGHT,
                                    borderWidth: 1,
                                    borderColor: ColorFactoryCON.CARD_BORDER,
                                    padding: EdgeInsetsCON.XL,
                                    marginBottom: EdgeInsetsCON.LG,
                                }}
                            >
                                {/* Tags */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: EdgeInsetsCON.XS,
                                        marginBottom: EdgeInsetsCON.XS,
                                    }}
                                >
                                    {workout.tags.map((tag, index) => (
                                        <View
                                            key={tag}
                                            style={{
                                                paddingHorizontal: EdgeInsetsCON.SM,
                                                paddingVertical: 2,
                                                borderWidth: 1,
                                                backgroundColor:
                                                    index === 0
                                                        ? "rgba(255,255,255,0.1)"
                                                        : "transparent",
                                                borderColor:
                                                    index === 0
                                                        ? "rgba(255,255,255,0.3)"
                                                        : "rgba(255,255,255,0.1)",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: "700",
                                                    color:
                                                        index === 0
                                                            ? ColorFactoryCON.WHITE
                                                            : ColorFactoryCON.MUTE,
                                                    textTransform: "uppercase",
                                                    letterSpacing: 1.5,
                                                }}
                                            >
                                                {tag}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Title */}
                                <Text
                                    style={{
                                        fontSize: 28,
                                        fontWeight: "900",
                                        color: ColorFactoryCON.WHITE,
                                        textTransform: "uppercase",
                                        letterSpacing: -0.5,
                                        lineHeight: 32,
                                        marginBottom: EdgeInsetsCON.XS,
                                    }}
                                >
                                    {workout.title}
                                </Text>

                                {/* Description */}
                                <Text
                                    style={{
                                        fontSize: 13,
                                        fontWeight: "400",
                                        color: ColorFactoryCON.MUTE,
                                        lineHeight: 18,
                                        marginBottom: EdgeInsetsCON.LG,
                                    }}
                                >
                                    {workout.description}
                                </Text>

                                {/* Exercise list */}
                                {workout.exercises.length > 0 && (
                                    <View
                                        style={{
                                            borderTopWidth: 1,
                                            borderTopColor: ColorFactoryCON.CARD_BORDER,
                                            marginBottom: EdgeInsetsCON.LG,
                                        }}
                                    >
                                        {workout.exercises.map((exercise, index) => (
                                            <View
                                                key={exercise.name}
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: EdgeInsetsCON.MD,
                                                    paddingVertical: EdgeInsetsCON.SM,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: ColorFactoryCON.CARD_BORDER,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 10,
                                                        fontWeight: "700",
                                                        color: ColorFactoryCON.MUTE,
                                                        letterSpacing: 1,
                                                        width: 20,
                                                    }}
                                                >
                                                    {String(index + 1).padStart(2, "0")}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 14,
                                                        fontWeight: "600",
                                                        color: ColorFactoryCON.WHITE,
                                                        flex: 1,
                                                        letterSpacing: 0.2,
                                                    }}
                                                >
                                                    {exercise.name}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {/* Select CTA */}
                                {savingWorkoutId === workout.id ? (
                                    <View
                                        style={{
                                            width: "100%",
                                            paddingVertical: 14,
                                            backgroundColor: ColorFactoryCON.WHITE,
                                            borderRadius: 0,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <ActivityIndicator
                                            color={ColorFactoryCON.INK}
                                            size="small"
                                        />
                                    </View>
                                ) : (
                                    <StandardButtonComponent
                                        label="Select"
                                        onPress={async () => {
                                            Haptics.impactAsync(
                                                Haptics.ImpactFeedbackStyle.Medium,
                                            );
                                            if (onSelectWorkout) {
                                                setSavingWorkoutId(workout.id);
                                                try {
                                                    await onSelectWorkout(workout);
                                                    handleClose();
                                                } catch (err) {
                                                    console.error("Failed to save schedule day:", err);
                                                } finally {
                                                    setSavingWorkoutId(null);
                                                }
                                            } else {
                                                handleClose();
                                            }
                                        }}
                                        variant={StandardButtonComponentVariant.WHITE}
                                        fullWidth
                                        borderRadius={0}
                                        fontSize={12}
                                        fontWeight="700"
                                    />
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}
