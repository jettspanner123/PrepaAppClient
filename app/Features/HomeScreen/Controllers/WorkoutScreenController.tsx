import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import HomeScreenCON from "@/app/Features/HomeScreen/Constants/HomeScreenCON";
import React from "react";
import { ScrollView, View } from "react-native";
import WorkoutScreenCaloriesCardStaticComponent from "../Components/static/WorkoutScreenCaloriesCardStaticComponent";
import WorkoutScreenHeroStaticComponent from "../Components/static/WorkoutScreenHeroStaticComponent";
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
            {/* Hero */}
            <WorkoutScreenHeroStaticComponent />

            {/* Today's Forge card */}
            <WorkoutScreenTodayCardStaticComponent />

            {/* Steps + Protein row */}
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

            {/* Full-width calories card */}
            <View style={{ marginBottom: EdgeInsetsCON.MD }}>
                <WorkoutScreenCaloriesCardStaticComponent />
            </View>

            {/* Heart rate + Active time row */}
            <View
                style={{
                    flexDirection: "row",
                    gap: EdgeInsetsCON.MD,
                    marginBottom: EdgeInsetsCON.MD,
                }}
            >
                <WorkoutScreenStatTileStaticComponent
                    label={HomeScreenCON.STAT_HEART_LABEL}
                    value={HomeScreenCON.STAT_HEART_VALUE}
                    unit={HomeScreenCON.STAT_HEART_UNIT}
                />
                <WorkoutScreenStatTileStaticComponent
                    label={HomeScreenCON.STAT_ACTIVE_LABEL}
                    value={HomeScreenCON.STAT_ACTIVE_VALUE}
                    unit={HomeScreenCON.STAT_ACTIVE_UNIT}
                />
            </View>
        </ScrollView>
    );
}
