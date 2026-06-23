import React from "react";
import OnboardingScreenOptions from "../Models/OnboardingScreenOptions";
import OnboardingScreenBasicInformationViewComponent from "../Views/OnboardingScreenBasicInformationViewComponent";
import OnboardingScreenCourseInformationViewComponent from "../Views/OnboardingScreenCourseInformationViewComponent";
import OnboardingScreenDateInformationViewComponent from "../Views/OnboardingScreenDateInformationViewComponent";
import OnboardingScreenInitialViewComponent from "../Views/OnboardingScreenInitialViewComponent";
import OnboardingScreenSaveScreenViewComponent from "../Views/OnboardingScreenSaveScreenViewComponent";

type OnboardingScreenView = React.JSX.Element;

export default class OnboardingService {
    public static current = new OnboardingService();

    public getCurrentScreen(
        option: OnboardingScreenOptions,
    ): OnboardingScreenView {
        switch (option) {
            case OnboardingScreenOptions.INITIAL_SCREEN:
                return <OnboardingScreenInitialViewComponent />;
            case OnboardingScreenOptions.BASIC_INFORMATION:
                return <OnboardingScreenBasicInformationViewComponent />;
            case OnboardingScreenOptions.COURSE_INFORMATION:
                return <OnboardingScreenCourseInformationViewComponent />;
            case OnboardingScreenOptions.DATE_INFORMATION:
                return <OnboardingScreenDateInformationViewComponent />;
            case OnboardingScreenOptions.SAVE_SCREEN:
                return <OnboardingScreenSaveScreenViewComponent />;
        }
    }
}
