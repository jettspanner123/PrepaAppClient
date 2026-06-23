import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardDateInputComponent from "@/app/Components/Shared/StandardDateInputComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function OnboardingScreenCourseInformationViewComponent(): React.JSX.Element {
    const [studyingFor, setStudyingFor] = useState<string>("");
    const [attemptYear, setAttemptYear] = useState<number | null>(null);

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
                    value={studyingFor}
                    onChangeText={setStudyingFor}
                    placeholder={OnboardingScreenCON.PLACEHOLDER_STUDYING_FOR}
                />
                <StandardDateInputComponent
                    label={OnboardingScreenCON.LABEL_ATTEMPT_YEAR}
                    value={attemptYear}
                    onChange={setAttemptYear}
                    labelClassName="mt-5"
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
