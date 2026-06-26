import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorFactoryCON from "../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../Constants/EdgeInsetsCON";
import AdditionalInformationScreenFABStaticComponent from "./Components/static/AdditionalInformationScreenFABStaticComponent";
import AdditionalInformationScreenOptions from "./Models/AdditionalInformationScreenOptions";
import AdditionalInformationScreenAdditionalInfoViewComponent from "./Views/AdditionalInformationScreenAdditionalInfoViewComponent";
import AdditionalInformationScreenInitialViewComponent from "./Views/AdditionalInformationScreenInitialViewComponent";
import AdditionalInformationScreenPersonalInfoViewComponent from "./Views/AdditionalInformationScreenPersonalInfoViewComponent";
import AdditionalInformationScreenSaveViewComponent from "./Views/AdditionalInformationScreenSaveViewComponent";

const FIRST_SCREEN = AdditionalInformationScreenOptions.INITIAL_SCREEN;
const LAST_SCREEN = AdditionalInformationScreenOptions.SAVE_SCREEN;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREENS = [
    AdditionalInformationScreenOptions.INITIAL_SCREEN,
    AdditionalInformationScreenOptions.PERSONAL_INFO_SCREEN,
    AdditionalInformationScreenOptions.ADDITIONAL_INFO_SCREEN,
    AdditionalInformationScreenOptions.SAVE_SCREEN,
];

export default function AdditionalInformationScreenController(): React.JSX.Element {
    const [currentScreen, setCurrentScreen] =
        useState<AdditionalInformationScreenOptions>(FIRST_SCREEN);
    const scrollRef = useRef<ScrollView>(null);

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
    }, [currentScreen]);

    const handleBack = useCallback((): void => {
        if (currentScreen > FIRST_SCREEN) {
            setCurrentScreen(currentScreen - 1);
        }
    }, [currentScreen]);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            {/* Paged screen content */}
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
                        {screen ===
                            AdditionalInformationScreenOptions.INITIAL_SCREEN && (
                            <AdditionalInformationScreenInitialViewComponent />
                        )}
                        {screen ===
                            AdditionalInformationScreenOptions.PERSONAL_INFO_SCREEN && (
                            <AdditionalInformationScreenPersonalInfoViewComponent />
                        )}
                        {screen ===
                            AdditionalInformationScreenOptions.ADDITIONAL_INFO_SCREEN && (
                            <AdditionalInformationScreenAdditionalInfoViewComponent />
                        )}
                        {screen ===
                            AdditionalInformationScreenOptions.SAVE_SCREEN && (
                            <AdditionalInformationScreenSaveViewComponent />
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
                <AdditionalInformationScreenFABStaticComponent
                    onNext={handleNext}
                    onBack={handleBack}
                    canGoBack={currentScreen > FIRST_SCREEN}
                    canGoNext={currentScreen < LAST_SCREEN}
                />
            </View>
        </SafeAreaView>
    );
}
