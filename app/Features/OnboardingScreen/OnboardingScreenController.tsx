import useOnboardingStateStore from "@/app/Store/OnboardingStateStore";
import React, { useCallback, useEffect, useRef } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorFactoryCON from "../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../Constants/EdgeInsetsCON";
import OnboardingScreenFABStaticComponent from "./Components/static/OnboardingScreenFABStaticComponent";
import OnboardingScreenOptions from "./Models/OnboardingScreenOptions";
import OnboardingScreenBasicInformationViewComponent from "./Views/OnboardingScreenBasicInformationViewComponent";
import OnboardingScreenCourseInformationViewComponent from "./Views/OnboardingScreenCourseInformationViewComponent";
import OnboardingScreenDateInformationViewComponent from "./Views/OnboardingScreenDateInformationViewComponent";
import OnboardingScreenInitialViewComponent from "./Views/OnboardingScreenInitialViewComponent";
import OnboardingScreenSaveScreenViewComponent from "./Views/OnboardingScreenSaveScreenViewComponent";

const FIRST_SCREEN = OnboardingScreenOptions.INITIAL_SCREEN;
const LAST_SCREEN = OnboardingScreenOptions.SAVE_SCREEN;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREENS = [
    FIRST_SCREEN,
    OnboardingScreenOptions.BASIC_INFORMATION,
    OnboardingScreenOptions.COURSE_INFORMATION,
    OnboardingScreenOptions.DATE_INFORMATION,
    LAST_SCREEN,
];

export default function OnboardingScreenController(): React.JSX.Element {
    const { currentScreen, setCurrentScreen } = useOnboardingStateStore();
    const scrollRef = useRef<ScrollView>(null);

    // Scroll to the correct page whenever currentScreen changes
    useEffect(() => {
        scrollRef.current?.scrollTo({
            x: currentScreen * SCREEN_WIDTH,
            animated: true,
        });
    }, [currentScreen]);

    const handleNext = useCallback((): void => {
        if (currentScreen < LAST_SCREEN) {
            setCurrentScreen(currentScreen + 1);
        }
    }, [currentScreen, setCurrentScreen]);

    const handleBack = useCallback((): void => {
        if (currentScreen > FIRST_SCREEN) {
            setCurrentScreen(currentScreen - 1);
        }
    }, [currentScreen, setCurrentScreen]);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            {/* Horizontal paged scroll view — all screens pre-rendered side by side */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
            >
                {SCREENS.map((screen) => (
                    <View key={screen} style={{ width: SCREEN_WIDTH, flex: 1 }}>
                        {screen === OnboardingScreenOptions.INITIAL_SCREEN && (
                            <OnboardingScreenInitialViewComponent />
                        )}
                        {screen ===
                            OnboardingScreenOptions.BASIC_INFORMATION && (
                            <OnboardingScreenBasicInformationViewComponent />
                        )}
                        {screen ===
                            OnboardingScreenOptions.COURSE_INFORMATION && (
                            <OnboardingScreenCourseInformationViewComponent />
                        )}
                        {screen ===
                            OnboardingScreenOptions.DATE_INFORMATION && (
                            <OnboardingScreenDateInformationViewComponent />
                        )}
                        {screen === OnboardingScreenOptions.SAVE_SCREEN && (
                            <OnboardingScreenSaveScreenViewComponent />
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* FAB */}
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
                <OnboardingScreenFABStaticComponent
                    onNext={handleNext}
                    onBack={handleBack}
                    canGoBack={currentScreen > FIRST_SCREEN}
                    canGoNext={currentScreen < LAST_SCREEN}
                />
            </View>
        </SafeAreaView>
    );
}
