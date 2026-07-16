import NavigationBarComponent, {
    NavIcons,
    NavigationBarItem,
} from "@/app/Components/Shared/NavigationBarComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import useHomeStateStore from "@/app/Store/HomeStateStore";
import React, { useCallback, useEffect, useRef } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DietScreenController from "./Controllers/DietScreenController";
import SettingsScreenController from "./Controllers/SettingsScreenController";
import StatisticsScreenController from "./Controllers/StatisticsScreenController";
import WorkoutScreenController from "./Controllers/WorkoutScreenController";
import HomeScreenOptions from "./Models/HomeScreenOptions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TABS = [
    HomeScreenOptions.WORKOUT,
    HomeScreenOptions.DIET,
    HomeScreenOptions.STATISTICS,
    HomeScreenOptions.SETTINGS,
];

const NAV_ITEMS: NavigationBarItem[] = [
    {
        key: HomeScreenOptions.WORKOUT,
        label: "Workout",
        icon: NavIcons.barbell,
    },
    { key: HomeScreenOptions.DIET, label: "Diet", icon: NavIcons.diet },
    {
        key: HomeScreenOptions.STATISTICS,
        label: "Stats",
        icon: NavIcons.statistics,
    },
    {
        key: HomeScreenOptions.SETTINGS,
        label: "Settings",
        icon: NavIcons.settings,
    },
];

export default function HomeScreenController(): React.JSX.Element {
    const { currentTab, setCurrentTab } = useHomeStateStore();
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            x: currentTab * SCREEN_WIDTH,
            animated: false,
        });
    }, [currentTab]);

    const handleTabPress = useCallback(
        (key: number): void => {
            setCurrentTab(key as HomeScreenOptions);
        },
        [setCurrentTab],
    );

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            {/* Full screen paged content */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                {TABS.map((tab) => (
                    <View
                        key={tab}
                        style={{
                            width: SCREEN_WIDTH,
                            flex: 1,
                        }}
                    >
                        {tab === HomeScreenOptions.WORKOUT && (
                            <WorkoutScreenController />
                        )}
                        {tab === HomeScreenOptions.DIET && (
                            <DietScreenController />
                        )}
                        {tab === HomeScreenOptions.STATISTICS && (
                            <StatisticsScreenController />
                        )}
                        {tab === HomeScreenOptions.SETTINGS && (
                            <SettingsScreenController />
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Floating nav bar — absolutely positioned by NavigationBarComponent itself */}
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
                <NavigationBarComponent
                    items={NAV_ITEMS}
                    currentKey={currentTab}
                    onPress={handleTabPress}
                />
            </View>
        </SafeAreaView>
    );
}
