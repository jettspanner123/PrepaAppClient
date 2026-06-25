import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardFullDateInputComponent from "@/app/Components/Shared/StandardFullDateInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import useOnboardingStateStore from "@/app/Store/OnboardingStateStore";
import React from "react";
import { Text, View } from "react-native";

interface OnboardingScreenDateInformationViewComponentProps {
    errors?: { startDate?: boolean; examDate?: boolean };
}

export default function OnboardingScreenDateInformationViewComponent({
    errors = {},
}: OnboardingScreenDateInformationViewComponentProps): React.JSX.Element {
    const { dateInfo, setDateInfo } = useOnboardingStateStore();

    return (
        <PageScrollViewHolderComponent>
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {OnboardingScreenCON.DATE_INFO_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {OnboardingScreenCON.DATE_INFO_SUBTITLE}
            </Text>

            <View
                style={{ marginTop: EdgeInsetsCON.XXL, gap: EdgeInsetsCON.LG }}
            >
                <StandardFullDateInputComponent
                    label={OnboardingScreenCON.LABEL_START_DATE}
                    value={dateInfo.startDate}
                    onChange={(date) => setDateInfo({ startDate: date })}
                    labelClassName="mt-5"
                    hasError={errors.startDate}
                />
                <StandardFullDateInputComponent
                    label={OnboardingScreenCON.LABEL_EXAM_DATE}
                    value={dateInfo.examDate}
                    onChange={(date) => setDateInfo({ examDate: date })}
                    labelClassName="mt-5"
                    hasError={errors.examDate}
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
