import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import StandardConfirmationModalComponent from "@/app/Components/Shared/StandardConfirmationModalComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import ExerciseLibraryCON from "@/app/Constants/ExerciseLibraryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import { useRouter, useNavigation } from "expo-router";
import { BlurView } from "expo-blur";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatabaseService from "@/app/Services/DatabaseService";
import CreateExerciseScreenCON from "./Constants/CreateExerciseScreenCON";
import CreateExerciseScreenMuscleGridStaticComponent from "./Components/static/CreateExerciseScreenMuscleGridStaticComponent";
import CreateExerciseScreenEquipmentGridStaticComponent from "./Components/static/CreateExerciseScreenEquipmentGridStaticComponent";

export default function CreateExerciseScreenController(): React.JSX.Element {
    const router = useRouter();
    const navigation = useNavigation();

    const [exerciseName, setExerciseName] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<string | null>("Chest");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        "Barbell",
    );

    // States for discard confirmation
    const [showDiscardModal, setShowDiscardModal] = useState<boolean>(false);
    const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [pendingAction, setPendingAction] = useState<any>(null);

    // Block back navigation if exercise name is not empty
    useEffect(() => {
        const isBlocking = exerciseName.trim().length > 0;

        // Dynamically disable/enable swipe gesture on iOS
        navigation.setOptions({
            gestureEnabled: !isBlocking,
        });

        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            if (!isBlocking) {
                // If the name is empty, allow standard navigation
                return;
            }

            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Save the action to trigger later
            setPendingAction(e.data.action);
            setShowDiscardModal(true);
        });

        return unsubscribe;
    }, [navigation, exerciseName]);

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    const handleConfirmDiscard = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowDiscardModal(false);
        if (pendingAction) {
            navigation.dispatch(pendingAction);
        }
    };

    const handleCancelDiscard = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowDiscardModal(false);
        setPendingAction(null);
    };

    const handleSave = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowSaveModal(true);
    };

    const handleConfirmSave = async (): Promise<void> => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowSaveModal(false);

        if (!selectedGroup || !selectedCategory) {
            return;
        }

        setIsSaving(true);

        try {
            const exercisePayload = {
                name: exerciseName,
                muscleGroup: selectedGroup,
                category: selectedCategory,
            };
            console.log(
                "Saving exact object to RTDB:",
                JSON.stringify(exercisePayload, null, 2),
            );

            await DatabaseService.getInstance().saveExercise(exercisePayload);

            // On success, go back
            setExerciseName(""); // clear input to bypass beforeRemove check
            setTimeout(() => {
                router.back();
            }, 50);
        } catch (error) {
            console.error("Error saving exercise to RTDB:", error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setShowErrorModal(true);
        } finally {
            setIsSaving(false);
        }
    };

    // Dynamically pull all unique muscle groups from the exercise library
    const muscleGroups = useMemo(() => {
        const groups = new Set<string>();
        ExerciseLibraryCON.EXERCISES.forEach((ex) => {
            if (ex.muscleGroup) {
                groups.add(ex.muscleGroup);
            }
        });
        return Array.from(groups);
    }, []);

    // Dynamically pull all unique equipment categories from the exercise library
    const categories = useMemo(() => {
        const cats = new Set<string>();
        ExerciseLibraryCON.EXERCISES.forEach((ex) => {
            if (ex.category) {
                cats.add(ex.category);
            }
        });
        return Array.from(cats);
    }, []);

    // Validation: name must not be empty, muscle group and equipment category must be selected
    const isSaveDisabled =
        !exerciseName.trim() || !selectedGroup || !selectedCategory;

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
                    title={CreateExerciseScreenCON.PAGE_TITLE}
                    onClose={handleClose}
                    leftIconType="back"
                />

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                        paddingTop: CreateExerciseScreenCON.SCROLL_PADDING_TOP,
                        paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE + 60,
                    }}
                >
                    {/* Exercise name input */}
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
                            {CreateExerciseScreenCON.LABEL_EXERCISE_NAME}
                        </Text>
                        <TextInput
                            value={exerciseName}
                            onChangeText={setExerciseName}
                            placeholder={
                                CreateExerciseScreenCON.PLACEHOLDER_EXERCISE_NAME
                            }
                            placeholderTextColor={ColorFactoryCON.CARD_BORDER}
                            autoCapitalize="characters"
                            style={{
                                fontSize: 22,
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

                    {/* Choose Muscle Group section */}
                    <View style={{ marginBottom: EdgeInsetsCON.XXL }}>
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
                                {CreateExerciseScreenCON.LABEL_CHOOSE_MUSCLE_GROUP}
                            </Text>
                        </View>
                        <CreateExerciseScreenMuscleGridStaticComponent
                            muscleGroups={muscleGroups}
                            selectedGroup={selectedGroup}
                            onSelectGroup={setSelectedGroup}
                        />
                    </View>

                    {/* Choose Equipment section */}
                    <View>
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
                                {CreateExerciseScreenCON.LABEL_CHOOSE_EQUIPMENT}
                            </Text>
                        </View>
                        <CreateExerciseScreenEquipmentGridStaticComponent
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Floating Action Save Button */}
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
                    {isSaving ? (
                        <View
                            style={{
                                width: "100%",
                                paddingVertical: EdgeInsetsCON.LG,
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
                    ) : isSaveDisabled ? (
                        <View
                            style={{
                                width: "100%",
                                paddingVertical: EdgeInsetsCON.LG,
                                borderWidth: 1,
                                borderColor: ColorFactoryCON.CARD_BORDER,
                                borderRadius: 0,
                                overflow: "hidden",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(255, 255, 255, 0.12)",
                            }}
                        >
                            <BlurView
                                intensity={95}
                                tint="light"
                                style={StyleSheet.absoluteFillObject}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "900",
                                    color: ColorFactoryCON.BLACK,
                                    textTransform: "uppercase",
                                    letterSpacing: 0.5,
                                }}
                            >
                                {CreateExerciseScreenCON.CTA_SAVE}
                            </Text>
                        </View>
                    ) : (
                        <StandardButtonComponent
                            label={CreateExerciseScreenCON.CTA_SAVE}
                            onPress={handleSave}
                            variant={StandardButtonComponentVariant.WHITE}
                            fullWidth
                            borderRadius={0}
                            fontSize={16}
                            fontWeight="900"
                        />
                    )}
                </View>
            </View>

            {/* Confirmation Modal */}
            <StandardConfirmationModalComponent
                visible={showDiscardModal}
                title="Discard Changes?"
                subtitle="Are you sure you want to discard this exercise? Your details will not be saved."
                confirmLabel="Discard"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDiscard}
                onCancel={handleCancelDiscard}
            />

            {/* Save Confirmation Modal */}
            <StandardConfirmationModalComponent
                visible={showSaveModal}
                title="Save Exercise?"
                subtitle="Are you sure you want to save this new exercise?"
                confirmLabel="Save"
                cancelLabel="Cancel"
                onConfirm={handleConfirmSave}
                onCancel={() => setShowSaveModal(false)}
            />

            {/* Error Confirmation Modal */}
            <StandardConfirmationModalComponent
                visible={showErrorModal}
                title="Error Saving Exercise"
                subtitle="An error occurred while saving your exercise to the database. Please try again."
                confirmLabel="Try Again"
                cancelLabel="Close"
                onConfirm={() => {
                    setShowErrorModal(false);
                    setShowSaveModal(true);
                }}
                onCancel={() => setShowErrorModal(false)}
            />
        </SafeAreaView>
    );
}
