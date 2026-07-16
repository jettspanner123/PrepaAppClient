import ApplicationStickyToolbar from "@/app/Components/Shared/ApplicationStickyToolbar";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateExerciseScreenCON from "./Constants/CreateExerciseScreenCON";

export default function CreateExerciseScreenController(): React.JSX.Element {
    const router = useRouter();
    const [exerciseName, setExerciseName] = useState<string>("");

    const handleClose = (): void => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.back();
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
                        paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
