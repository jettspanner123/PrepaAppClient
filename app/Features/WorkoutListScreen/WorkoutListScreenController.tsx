import ApplicationToolbarBackButton from "@/app/Components/Shared/ApplicationToolbarBackButton";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import WorkoutListScreenCardStaticComponent from "@/app/Features/WorkoutListScreen/Components/static/WorkoutListScreenCardStaticComponent";
import WorkoutListScreenCON from "@/app/Features/WorkoutListScreen/Constants/WorkoutListScreenCON";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutListScreenController(): React.JSX.Element {
    const router = useRouter();

    const handleStart = (id: string): void => {
        router.push(`/workout-engine/${id}`);
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                    paddingTop: EdgeInsetsCON.SCREEN_TOP,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
            >
                <ApplicationToolbarBackButton />

                <View style={{ marginBottom: EdgeInsetsCON.XXL }}>
                    <Text
                        style={{
                            fontSize: 48,
                            fontWeight: "900",
                            color: ColorFactoryCON.WHITE,
                            textTransform: "uppercase",
                            letterSpacing: -1,
                            lineHeight: 52,
                        }}
                    >
                        {WorkoutListScreenCON.PAGE_TITLE}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "400",
                            color: ColorFactoryCON.MUTE,
                            marginTop: EdgeInsetsCON.SM,
                        }}
                    >
                        {WorkoutListScreenCON.PAGE_SUBTITLE}
                    </Text>
                </View>

                {/* Workout cards */}
                {WorkoutListScreenCON.WORKOUTS.map((workout) => (
                    <WorkoutListScreenCardStaticComponent
                        key={workout.id}
                        workout={workout}
                        onStart={handleStart}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
