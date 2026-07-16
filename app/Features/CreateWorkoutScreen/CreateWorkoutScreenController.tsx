import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import StandardWeekDayInputComponent from "@/app/Components/Shared/StandardWeekDayInputComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import ExerciseLibraryCON from "@/app/Constants/ExerciseLibraryCON";
import CreateWorkoutScreenCON from "@/app/Features/CreateWorkoutScreen/Constants/CreateWorkoutScreenCON";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateWorkoutScreenExerciseRowStaticComponent from "./Components/static/CreateWorkoutScreenExerciseRowStaticComponent";

export default function CreateWorkoutScreenController(): React.JSX.Element {
    const router = useRouter();

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    const handleRightPress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log("Right action pressed");
    };

    const handleVoiceModule = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log("Voice Module action triggered");
    };

    const handleCreateExercise = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        console.log("Create Exercise action triggered");
    };

    const toolbarActions = [
        {
            label: "Voice Module",
            onPress: handleVoiceModule,
            icon: "mic-outline",
        },
        {
            label: "Create Exercise",
            onPress: handleCreateExercise,
            icon: "add-circle-outline",
        },
    ];

    const [workoutName, setWorkoutName] = useState<string>("");
    const [selectedWeekDay, setSelectedWeekDay] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [activeGroup, setActiveGroup] = useState<string>("Chest");

    const scrollViewRef = useRef<ScrollView>(null);

    const clearBtnAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(clearBtnAnim, {
            toValue: selectedWeekDay !== null ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [selectedWeekDay, clearBtnAnim]);

    const clearBtnHeight = clearBtnAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 48],
    });

    const clearBtnMargin = clearBtnAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, EdgeInsetsCON.SM],
    });

    const filteredExercises = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        let list = ExerciseLibraryCON.EXERCISES.filter(
            (ex) => ex.muscleGroup.toLowerCase() === activeGroup.toLowerCase(),
        );
        if (!q) return list;
        return list.filter(
            (ex) =>
                ex.name.toLowerCase().includes(q) ||
                ex.muscleGroup.toLowerCase().includes(q) ||
                ex.category.toLowerCase().includes(q),
        );
    }, [searchQuery, activeGroup]);

    const handleToggle = (id: string): void => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleSave = (): void => {
        console.log("Saving workout:", workoutName, Array.from(selectedIds));
        // TODO: persist
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* Header — title + close */}
                <ApplicationStickyToolbar
                    title={CreateWorkoutScreenCON.PAGE_TITLE}
                    onClose={handleClose}
                    leftIconType="back"
                    rightIconType="more"
                    onRightPress={handleRightPress}
                    actions={toolbarActions}
                />

                <ScrollView
                    ref={scrollViewRef}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                        paddingTop: CreateWorkoutScreenCON.SCROLL_PADDING_TOP,
                        paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                    }}
                >
                    {/* Workout name input */}
                    <View
                        style={{
                            marginTop: EdgeInsetsCON.LG,
                            marginBottom: EdgeInsetsCON.XXL,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "700",
                                color: ColorFactoryCON.MUTE,
                                textTransform: "uppercase",
                                letterSpacing: 2,
                                marginBottom: EdgeInsetsCON.SM,
                            }}
                        >
                            {CreateWorkoutScreenCON.LABEL_WORKOUT_NAME}
                        </Text>
                        <TextInput
                            value={workoutName}
                            onChangeText={setWorkoutName}
                            placeholder={
                                CreateWorkoutScreenCON.PLACEHOLDER_WORKOUT_NAME
                            }
                            placeholderTextColor={ColorFactoryCON.CARD_BORDER}
                            autoCapitalize="characters"
                            style={{
                                fontSize: 32,
                                fontWeight: "900",
                                color: ColorFactoryCON.WHITE,
                                textTransform: "uppercase",
                                letterSpacing: -0.5,
                                borderBottomWidth: 2,
                                borderBottomColor: ColorFactoryCON.WHITE,
                                paddingVertical: EdgeInsetsCON.XS,
                            }}
                        />
                    </View>

                    {/* Weekday selector input */}
                    <View style={{ marginBottom: EdgeInsetsCON.XXL }}>
                        <StandardWeekDayInputComponent
                            label="Assign Week Day"
                            value={selectedWeekDay}
                            onChange={setSelectedWeekDay}
                            placeholder="Select Day"
                            borderRadius={0}
                        />
                        <Animated.View
                            style={{
                                height: clearBtnHeight,
                                opacity: clearBtnAnim,
                                marginTop: clearBtnMargin,
                                overflow: "hidden",
                            }}
                        >
                            <StandardButtonComponent
                                label="Clear"
                                onPress={() => {
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Light,
                                    );
                                    setSelectedWeekDay(null);
                                }}
                                variant={StandardButtonComponentVariant.DANGER}
                                style={{ height: 48, justifyContent: "center" }}
                                borderRadius={0}
                            />
                        </Animated.View>
                    </View>

                    {/* Exercise selection section */}
                    <View>
                        {/* Section header */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                borderBottomWidth: 1,
                                borderBottomColor: ColorFactoryCON.CARD_BORDER,
                                paddingBottom: EdgeInsetsCON.XXS,
                                marginBottom: EdgeInsetsCON.LG,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: "700",
                                    color: ColorFactoryCON.WHITE,
                                    textTransform: "uppercase",
                                    letterSpacing: 2,
                                }}
                            >
                                {CreateWorkoutScreenCON.LABEL_SELECT_EXERCISES}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: "700",
                                    color: ColorFactoryCON.MUTE,
                                    letterSpacing: 1.5,
                                    textTransform: "uppercase",
                                }}
                            >
                                {selectedIds.size}/
                                {ExerciseLibraryCON.EXERCISES.length} SELECTED
                            </Text>
                        </View>

                        {/* Search bar */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: searchFocused
                                    ? ColorFactoryCON.WHITE
                                    : ColorFactoryCON.CARD_BORDER,
                                paddingHorizontal: EdgeInsetsCON.LG,
                                paddingVertical: EdgeInsetsCON.MD,
                                marginBottom: EdgeInsetsCON.LG,
                                gap: EdgeInsetsCON.MD,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 26,
                                    color: searchFocused
                                        ? ColorFactoryCON.WHITE
                                        : ColorFactoryCON.MUTE,
                                }}
                            >
                                ⌕
                            </Text>
                            <TextInput
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholder={
                                    CreateWorkoutScreenCON.PLACEHOLDER_SEARCH
                                }
                                placeholderTextColor={
                                    ColorFactoryCON.CARD_BORDER
                                }
                                onFocus={() => {
                                    setSearchFocused(true);
                                    setTimeout(() => {
                                        scrollViewRef.current?.scrollTo({
                                            y: CreateWorkoutScreenCON.SEARCH_FOCUS_SCROLL_Y,
                                            animated: true,
                                        });
                                    }, 100);
                                }}
                                onBlur={() => setSearchFocused(false)}
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
                            }}
                            contentContainerStyle={{
                                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                                gap: EdgeInsetsCON.SM,
                                paddingBottom: EdgeInsetsCON.LG,
                            }}
                        >
                            {CreateWorkoutScreenCON.MUSCLE_GROUPS.map(
                                (group) => {
                                    const isActive = activeGroup === group;
                                    return (
                                        <Pressable
                                            key={group}
                                            onPress={() => {
                                                Haptics.impactAsync(
                                                    Haptics.ImpactFeedbackStyle
                                                        .Light,
                                                );
                                                setActiveGroup(group);
                                            }}
                                            style={{
                                                paddingHorizontal:
                                                    EdgeInsetsCON.XL,
                                                paddingVertical:
                                                    EdgeInsetsCON.SM,
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
                                },
                            )}
                        </ScrollView>

                        {/* Selected exercises chips */}
                        {selectedIds.size > 0 && (
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    gap: EdgeInsetsCON.SM,
                                    paddingBottom: EdgeInsetsCON.LG,
                                }}
                            >
                                {ExerciseLibraryCON.EXERCISES.filter((ex) =>
                                    selectedIds.has(ex.id),
                                ).map((ex) => (
                                    <Pressable
                                        key={ex.id}
                                        onPress={() => handleToggle(ex.id)}
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: EdgeInsetsCON.XS,
                                            paddingHorizontal: EdgeInsetsCON.LG,
                                            paddingVertical: EdgeInsetsCON.SM,
                                            backgroundColor:
                                                ColorFactoryCON.CARD_BG_LIGHT_PRESSED,
                                            borderWidth: 1,
                                            borderColor:
                                                ColorFactoryCON.SUCCESS,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                fontWeight: "700",
                                                color: ColorFactoryCON.SUCCESS,
                                                textTransform: "uppercase",
                                                letterSpacing: 1.5,
                                            }}
                                        >
                                            {ex.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                fontWeight: "700",
                                                color: ColorFactoryCON.SUCCESS,
                                            }}
                                        >
                                            ✕
                                        </Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}

                        {/* Exercise list */}
                        {filteredExercises.map((item, index) => (
                            <CreateWorkoutScreenExerciseRowStaticComponent
                                key={item.id}
                                item={item}
                                index={index}
                                isSelected={selectedIds.has(item.id)}
                                onToggle={handleToggle}
                            />
                        ))}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Floating Save button */}
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
                    }}
                >
                    <StandardButtonComponent
                        label={CreateWorkoutScreenCON.CTA_SAVE}
                        onPress={handleSave}
                        variant={StandardButtonComponentVariant.WHITE}
                        fullWidth
                        borderRadius={0}
                        fontSize={16}
                        fontWeight="900"
                        disabled={!workoutName.trim() || selectedIds.size === 0}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
