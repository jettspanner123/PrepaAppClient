import StandardPageHeaderComponent from "@/app/Components/Shared/StandardPageHeaderComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import HomeScreenCON from "@/app/Features/HomeScreen/Constants/HomeScreenCON";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import WorkoutScreenStatTileStaticComponent from "../Components/static/WorkoutScreenStatTileStaticComponent";
import WorkoutScreenTodayCardStaticComponent from "../Components/static/WorkoutScreenTodayCardStaticComponent";

export default function WorkoutScreenController(): React.JSX.Element {
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            contentContainerStyle={{
                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                paddingTop: EdgeInsetsCON.SCREEN_TOP,
                paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
            }}
            showsVerticalScrollIndicator={false}
        >
            <StandardPageHeaderComponent text="Workout" />
            <Text
                style={{
                    fontSize: 13,
                    fontWeight: "500",
                    color: ColorFactoryCON.MUTE,
                    marginTop: EdgeInsetsCON.SM,
                    lineHeight: 18,
                }}
            >
                {HomeScreenCON.WORKOUT_AI_INSIGHT}
            </Text>
            <WorkoutScreenTodayCardStaticComponent />
            <View
                style={{
                    flexDirection: "row",
                    gap: EdgeInsetsCON.MD,
                    marginBottom: EdgeInsetsCON.MD,
                }}
            >
                <WorkoutScreenStatTileStaticComponent
                    label={HomeScreenCON.STAT_STEPS_LABEL}
                    value={HomeScreenCON.STAT_STEPS_VALUE}
                    unit={HomeScreenCON.STAT_STEPS_UNIT}
                />
                <WorkoutScreenStatTileStaticComponent
                    label={HomeScreenCON.STAT_PROTEIN_LABEL}
                    value={HomeScreenCON.STAT_PROTEIN_VALUE}
                    unit={HomeScreenCON.STAT_PROTEIN_UNIT}
                />
            </View>
        </ScrollView>
    );
}
