import OnboardingScreenBasicInformationViewComponent from "@/app/Features/OnboardingScreen/Views/OnboardingScreenBasicInformationViewComponent";
import OnboardingScreenCourseInformationViewComponent from "@/app/Features/OnboardingScreen/Views/OnboardingScreenCourseInformationViewComponent";
import OnboardingScreenDateInformationViewComponent from "@/app/Features/OnboardingScreen/Views/OnboardingScreenDateInformationViewComponent";
import OnboardingScreenInitialViewComponent from "@/app/Features/OnboardingScreen/Views/OnboardingScreenInitialViewComponent";
import OnboardingScreenSaveScreenViewComponent from "@/app/Features/OnboardingScreen/Views/OnboardingScreenSaveScreenViewComponent";
import useOnboardingStateStore from "@/app/Store/OnboardingStateStore";
import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorFactoryCON from "../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../Constants/EdgeInsetsCON";
import OnboardingScreenFABStaticComponent from "./Components/static/OnboardingScreenFABStaticComponent";
import OnboardingScreenProgressBarStaticComponent from "./Components/static/OnboardingScreenProgressBarStaticComponent";
import OnboardingScreenOptions from "./Models/OnboardingScreenOptions";

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

// ─── Error shape per screen ───────────────────────────────────────────────────
interface BasicInfoErrors {
    name?: boolean;
    courseName?: boolean;
    profileName?: boolean;
}

interface CourseInfoErrors {
    studyingFor?: boolean;
    attemptYear?: boolean;
}

interface DateInfoErrors {
    startDate?: boolean;
    examDate?: boolean;
}

export default function OnboardingScreenController(): React.JSX.Element {
    const { currentScreen, setCurrentScreen, basicInfo, courseInfo, dateInfo } =
        useOnboardingStateStore();
    const scrollRef = useRef<ScrollView>(null);

    const [basicInfoErrors, setBasicInfoErrors] = useState<BasicInfoErrors>({});
    const [courseInfoErrors, setCourseInfoErrors] = useState<CourseInfoErrors>(
        {},
    );
    const [dateInfoErrors, setDateInfoErrors] = useState<DateInfoErrors>({});

    useEffect(() => {
        scrollRef.current?.scrollTo({
            x: currentScreen * SCREEN_WIDTH,
            animated: true,
        });
    }, [currentScreen]);

    // ─── Validators ───────────────────────────────────────────────────────────
    const validateBasicInfo = useCallback((): boolean => {
        const errors: BasicInfoErrors = {
            name: basicInfo.name.trim() === "",
            courseName: basicInfo.courseName.trim() === "",
            profileName: basicInfo.profileName.trim() === "",
        };
        const hasErrors = Object.values(errors).some(Boolean);
        if (hasErrors) {
            setBasicInfoErrors(errors);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
        return !hasErrors;
    }, [basicInfo]);

    const validateCourseInfo = useCallback((): boolean => {
        const errors: CourseInfoErrors = {
            studyingFor: courseInfo.studyingFor.trim() === "",
            attemptYear: courseInfo.attemptYear === null,
        };
        const hasErrors = Object.values(errors).some(Boolean);
        if (hasErrors) {
            setCourseInfoErrors(errors);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
        return !hasErrors;
    }, [courseInfo]);

    const validateDateInfo = useCallback((): boolean => {
        const errors: DateInfoErrors = {
            startDate: dateInfo.startDate === null,
            examDate: dateInfo.examDate === null,
        };
        const hasErrors = Object.values(errors).some(Boolean);
        if (hasErrors) {
            setDateInfoErrors(errors);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
        return !hasErrors;
    }, [dateInfo]);

    // ─── Navigation ───────────────────────────────────────────────────────────
    const handleNext = useCallback((): void => {
        if (currentScreen === OnboardingScreenOptions.BASIC_INFORMATION) {
            if (!validateBasicInfo()) return;
            setBasicInfoErrors({});
        }
        if (currentScreen === OnboardingScreenOptions.COURSE_INFORMATION) {
            if (!validateCourseInfo()) return;
            setCourseInfoErrors({});
        }
        if (currentScreen === OnboardingScreenOptions.DATE_INFORMATION) {
            if (!validateDateInfo()) return;
            setDateInfoErrors({});
        }
        if (currentScreen < LAST_SCREEN) {
            setCurrentScreen(currentScreen + 1);
        }
    }, [
        currentScreen,
        setCurrentScreen,
        validateBasicInfo,
        validateCourseInfo,
        validateDateInfo,
    ]);

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
                            <OnboardingScreenBasicInformationViewComponent
                                errors={basicInfoErrors}
                            />
                        )}
                        {screen ===
                            OnboardingScreenOptions.COURSE_INFORMATION && (
                            <OnboardingScreenCourseInformationViewComponent
                                errors={courseInfoErrors}
                            />
                        )}
                        {screen ===
                            OnboardingScreenOptions.DATE_INFORMATION && (
                            <OnboardingScreenDateInformationViewComponent
                                errors={dateInfoErrors}
                            />
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
                <View
                    style={{
                        position: "absolute",
                        bottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                        left: EdgeInsetsCON.SCREEN_H,
                        right: EdgeInsetsCON.SCREEN_H,
                    }}
                >
                    <OnboardingScreenProgressBarStaticComponent
                        progress={currentScreen / LAST_SCREEN}
                    />
                </View>
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
