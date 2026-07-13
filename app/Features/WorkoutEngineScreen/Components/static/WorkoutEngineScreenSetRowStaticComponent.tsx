import StandardConfirmationModalComponent from "@/app/Components/Shared/StandardConfirmationModalComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutEngineScreenCON, {
    WorkoutSet,
} from "@/app/Features/WorkoutEngineScreen/Constants/WorkoutEngineScreenCON";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface WorkoutEngineScreenSetRowStaticComponentProps {
    set: WorkoutSet;
    onComplete: (setId: string) => void;
}

export default function WorkoutEngineScreenSetRowStaticComponent({
    set,
    onComplete,
}: WorkoutEngineScreenSetRowStaticComponentProps): React.JSX.Element {
    const [weight, setWeight] = useState<string>("");
    const [reps, setReps] = useState<string>("");
    const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

    const handleCheckPress = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setConfirmVisible(true);
    };

    const handleConfirm = (): void => {
        onComplete(set.id);
        setConfirmVisible(false);
    };

    const handleCancel = (): void => {
        setConfirmVisible(false);
    };

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: EdgeInsetsCON.MD,
                    padding: EdgeInsetsCON.LG,
                    borderWidth: 1,
                    borderColor: set.completed
                        ? ColorFactoryCON.SUCCESS
                        : ColorFactoryCON.CARD_BORDER,
                    backgroundColor: set.completed
                        ? "rgba(30,170,82,0.06)"
                        : ColorFactoryCON.INK,
                }}
            >
                {/* Set counter */}
                <View style={{ width: 40 }}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                        }}
                    >
                        {WorkoutEngineScreenCON.LABEL_SET}
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "700",
                            color: ColorFactoryCON.WHITE,
                            letterSpacing: 0.5,
                        }}
                    >
                        {set.setNumber}/{set.totalSets}
                    </Text>
                </View>

                {/* Weight input */}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            marginBottom: EdgeInsetsCON.XXS,
                        }}
                    >
                        {WorkoutEngineScreenCON.LABEL_LBS}
                    </Text>
                    <TextInput
                        value={weight}
                        onChangeText={setWeight}
                        placeholder={set.weightPlaceholder}
                        placeholderTextColor={ColorFactoryCON.MUTE}
                        keyboardType="numeric"
                        editable={!set.completed}
                        style={{
                            fontSize: 20,
                            fontWeight: "700",
                            color: set.completed
                                ? ColorFactoryCON.MUTE
                                : ColorFactoryCON.WHITE,
                            borderBottomWidth: 2,
                            borderBottomColor: set.completed
                                ? ColorFactoryCON.CARD_BORDER
                                : ColorFactoryCON.WHITE,
                            paddingVertical: EdgeInsetsCON.XXS,
                        }}
                    />
                </View>

                {/* Reps input */}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "700",
                            color: ColorFactoryCON.MUTE,
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            marginBottom: EdgeInsetsCON.XXS,
                        }}
                    >
                        {WorkoutEngineScreenCON.LABEL_REPS}
                    </Text>
                    <TextInput
                        value={reps}
                        onChangeText={setReps}
                        placeholder={set.repsPlaceholder}
                        placeholderTextColor={ColorFactoryCON.MUTE}
                        keyboardType="numeric"
                        editable={!set.completed}
                        style={{
                            fontSize: 20,
                            fontWeight: "700",
                            color: set.completed
                                ? ColorFactoryCON.MUTE
                                : ColorFactoryCON.WHITE,
                            borderBottomWidth: 2,
                            borderBottomColor: set.completed
                                ? ColorFactoryCON.CARD_BORDER
                                : ColorFactoryCON.WHITE,
                            paddingVertical: EdgeInsetsCON.XXS,
                        }}
                    />
                </View>

                {/* Check button */}
                <Pressable
                    onPress={handleCheckPress}
                    disabled={set.completed}
                    style={{
                        width: 48,
                        height: 48,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: set.completed
                            ? ColorFactoryCON.SUCCESS
                            : ColorFactoryCON.WHITE,
                    }}
                >
                    <Ionicons
                        name="checkmark"
                        size={22}
                        color={
                            set.completed
                                ? ColorFactoryCON.WHITE
                                : ColorFactoryCON.BLACK
                        }
                    />
                </Pressable>
            </View>

            {/* Confirmation modal */}
            <StandardConfirmationModalComponent
                visible={confirmVisible}
                title="Complete this set?"
                subtitle="Mark this set as done. You won't be able to edit it after."
                confirmLabel="Done"
                cancelLabel="Cancel"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
}
