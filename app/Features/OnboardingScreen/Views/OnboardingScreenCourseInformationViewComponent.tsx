import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardDateInputComponent from "@/app/Components/Shared/StandardDateInputComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import useOnboardingStateStore from "@/app/Store/OnboardingStateStore";
import React from "react";
import { Text, View } from "react-native";

interface OnboardingScreenCourseInformationViewComponentProps {
    errors?: { studyingFor?: boolean; attemptYear?: boolean };
}

export default function OnboardingScreenCourseInformationViewComponent({
    errors = {},
}: OnboardingScreenCourseInformationViewComponentProps): React.JSX.Element {
    const { courseInfo, setCourseInfo } = useOnboardingStateStore();

    return (
        <PageScrollViewHolderComponent>
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {OnboardingScreenCON.COURSE_INFO_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {OnboardingScreenCON.COURSE_INFO_SUBTITLE}
            </Text>

            <View
                style={{ marginTop: EdgeInsetsCON.XXL, gap: EdgeInsetsCON.LG }}
            >
                <StandardInputComponent
                    label={OnboardingScreenCON.LABEL_STUDYING_FOR}
                    value={courseInfo.studyingFor}
                    onChangeText={(text) =>
                        setCourseInfo({ studyingFor: text })
                    }
                    placeholder={OnboardingScreenCON.PLACEHOLDER_STUDYING_FOR}
                    hasError={errors.studyingFor}
                />
                <StandardDateInputComponent
                    label={OnboardingScreenCON.LABEL_ATTEMPT_YEAR}
                    value={courseInfo.attemptYear}
                    onChange={(year) => setCourseInfo({ attemptYear: year })}
                    labelClassName="mt-5"
                    hasError={errors.attemptYear}
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
