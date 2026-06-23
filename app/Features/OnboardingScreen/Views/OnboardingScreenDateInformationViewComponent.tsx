import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardFullDateInputComponent, {
    FullDate,
} from "@/app/Components/Shared/StandardFullDateInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function OnboardingScreenDateInformationViewComponent(): React.JSX.Element {
    const [examYear, setExamYear] = useState<number | null>(null);
    const [startYear, setStartYear] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<FullDate | null>(null);
    const [examDate, setExamDate] = useState<FullDate | null>(null);

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
                    value={startDate}
                    onChange={setStartDate}
                    labelClassName="mt-5"
                />
                <StandardFullDateInputComponent
                    label={OnboardingScreenCON.LABEL_EXAM_DATE}
                    value={examDate}
                    onChange={setExamDate}
                    labelClassName="mt-5"
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
