import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import StandardButtonComponent, {
    StandardButtonComponentVariant,
} from "@/app/Components/Shared/StandardButtonComponent";
import StandardConfirmationModalComponent from "@/app/Components/Shared/StandardConfirmationModalComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import ExerciseLibraryCON from "@/app/Constants/ExerciseLibraryCON";
import CreateExerciseScreenEquipmentGridStaticComponent from "@/app/Features/CreateExerciseScreen/Components/static/CreateExerciseScreenEquipmentGridStaticComponent";
import CreateExerciseScreenMuscleGridStaticComponent from "@/app/Features/CreateExerciseScreen/Components/static/CreateExerciseScreenMuscleGridStaticComponent";
import ExerciseDetailsScreenCON from "@/app/Features/ExerciseDetailsScreen/Constants/ExerciseDetailsScreenCON";
import DatabaseService from "@/app/Services/DatabaseService";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExerciseDetailsScreenController(): React.JSX.Element {
    const router = useRouter();
    const { id, name, muscleGroup, category } = useLocalSearchParams<{
        id: string;
        name: string;
        muscleGroup: string;
        category: string;
    }>();

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
    };

    const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // Controlled state — seeded from route params, updated when user taps the grids
    const [selectedGroup, setSelectedGroup] = useState<string>(muscleGroup ?? "");
    const [selectedCategory, setSelectedCategory] = useState<string>(category ?? "");

    // Save is only enabled when something actually changed from the original
    const hasChanges =
        selectedGroup !== (muscleGroup ?? "") ||
        selectedCategory !== (category ?? "");

    const handleSavePress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setShowSaveModal(true);
    };

    const handleConfirmSave = async (): Promise<void> => {
        setShowSaveModal(false);
        setIsSaving(true);
        try {
            await DatabaseService.getInstance().updateExercise(id, {
                name: name ?? "",
                muscleGroup: selectedGroup,
                category: selectedCategory,
            });
            router.back();
        } catch (error) {
            console.error("Error updating exercise:", error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setShowErrorModal(true);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeletePress = (): void => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async (): Promise<void> => {
        setShowDeleteModal(false);
        setIsDeleting(true);
        try {
            await DatabaseService.getInstance().deleteExercise(id);
            router.back();
        } catch (error) {
            console.error("Error deleting exercise:", error);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setShowErrorModal(true);
        } finally {
            setIsDeleting(false);
        }
    };

    // Derive full lists from the library — same as CreateExerciseScreen
    const muscleGroups = useMemo(() => {
        const groups = new Set<string>();
        ExerciseLibraryCON.EXERCISES.forEach((ex) => {
            if (ex.muscleGroup) groups.add(ex.muscleGroup);
        });
        return Array.from(groups);
    }, []);

    const categories = useMemo(() => {
        const cats = new Set<string>();
        ExerciseLibraryCON.EXERCISES.forEach((ex) => {
            if (ex.category) cats.add(ex.category);
        });
        return Array.from(cats);
    }, []);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            {/* Header — title + back */}
            <ApplicationStickyToolbar
                title={ExerciseDetailsScreenCON.PAGE_TITLE}
                onClose={handleClose}
                leftIconType="back"
            />

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: ExerciseDetailsScreenCON.SCROLL_PADDING_TOP,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
            >
                {/* Exercise name — read-only display */}
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
                        {ExerciseDetailsScreenCON.LABEL_EXERCISE_NAME}
                    </Text>
                    <Text
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
                    >
                        {name ?? ""}
                    </Text>
                </View>

                {/* Muscle Group section — same grid, read-only (no onSelectGroup) */}
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
                            {ExerciseDetailsScreenCON.LABEL_CHOOSE_MUSCLE_GROUP}
                        </Text>
                    </View>
                    <CreateExerciseScreenMuscleGridStaticComponent
                        muscleGroups={muscleGroups}
                        selectedGroup={selectedGroup}
                        onSelectGroup={setSelectedGroup}
                    />
                </View>

                {/* Equipment section — same grid, read-only */}
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
                            {ExerciseDetailsScreenCON.LABEL_CHOOSE_EQUIPMENT}
                        </Text>
                    </View>
                    <CreateExerciseScreenEquipmentGridStaticComponent
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </View>
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
                    {isDeleting ? (
                        <View
                            style={{
                                flex: 1,
                                paddingVertical: EdgeInsetsCON.LG,
                                backgroundColor: ColorFactoryCON.DANGER_MUTED,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ActivityIndicator color={ColorFactoryCON.DANGER} size="small" />
                        </View>
                    ) : (
                        <StandardButtonComponent
                            label={ExerciseDetailsScreenCON.CTA_DELETE}
                            onPress={handleDeletePress}
                            variant={StandardButtonComponentVariant.DANGER}
                            style={{ flex: 1 }}
                            borderRadius={0}
                            fontSize={13}
                            fontWeight="700"
                            disabled={isSaving}
                        />
                    )}
                    {isSaving ? (
                        <View
                            style={{
                                flex: 1,
                                paddingVertical: EdgeInsetsCON.LG,
                                backgroundColor: ColorFactoryCON.WHITE,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ActivityIndicator color={ColorFactoryCON.INK} size="small" />
                        </View>
                    ) : (
                        <StandardButtonComponent
                            label={ExerciseDetailsScreenCON.CTA_SAVE}
                            onPress={handleSavePress}
                            variant={StandardButtonComponentVariant.WHITE}
                            style={{ flex: 1 }}
                            borderRadius={0}
                            fontSize={13}
                            fontWeight="700"
                            disabled={!hasChanges || isDeleting}
                        />
                    )}
                </View>
            </View>

            {/* Save confirmation modal */}
            <StandardConfirmationModalComponent
                visible={showSaveModal}
                title={ExerciseDetailsScreenCON.MODAL_SAVE_TITLE}
                subtitle={ExerciseDetailsScreenCON.MODAL_SAVE_SUBTITLE}
                confirmLabel="Save"
                cancelLabel="Cancel"
                onConfirm={handleConfirmSave}
                onCancel={() => setShowSaveModal(false)}
            />

            {/* Delete confirmation modal */}
            <StandardConfirmationModalComponent
                visible={showDeleteModal}
                title={ExerciseDetailsScreenCON.MODAL_DELETE_TITLE}
                subtitle={ExerciseDetailsScreenCON.MODAL_DELETE_SUBTITLE}
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

            {/* Error modal */}
            <StandardConfirmationModalComponent
                visible={showErrorModal}
                title={ExerciseDetailsScreenCON.MODAL_ERROR_TITLE}
                subtitle={ExerciseDetailsScreenCON.MODAL_ERROR_SUBTITLE}
                confirmLabel="OK"
                cancelLabel="Dismiss"
                onConfirm={() => setShowErrorModal(false)}
                onCancel={() => setShowErrorModal(false)}
            />
        </SafeAreaView>
    );
}
