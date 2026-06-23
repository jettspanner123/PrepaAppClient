import useOnboardingStateStore from "@/app/Store/OnboardingStateStore";
import React, { useCallback } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorFactoryCON from "../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../Constants/EdgeInsetsCON";
import OnboardingScreenFABStaticComponent from "./Components/static/OnboardingScreenFABStaticComponent";
import OnboardingScreenOptions from "./Models/OnboardingScreenOptions";
import OnboardingService from "./Services/OnboardingService";

const FIRST_SCREEN = OnboardingScreenOptions.INITIAL_SCREEN;
const LAST_SCREEN = OnboardingScreenOptions.SAVE_SCREEN;

export default function OnboardingScreenController(): React.JSX.Element {
    const { currentScreen, setCurrentScreen } = useOnboardingStateStore();

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
            {/* Screen content */}
            <View
                style={{
                    flex: 1,
                    paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                }}
            >
                {OnboardingService.current.getCurrentScreen(currentScreen)}
            </View>

            {/* FAB — floats over content, passes touches through its transparent area */}
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
