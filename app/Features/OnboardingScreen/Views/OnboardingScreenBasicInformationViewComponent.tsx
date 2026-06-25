import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import useOnboardingStateStore from "@/app/Store/OnboardingStateStore";
import React from "react";
import { Text, View } from "react-native";

interface OnboardingScreenBasicInformationViewComponentProps {
    errors?: { name?: boolean; courseName?: boolean; profileName?: boolean };
    allValid?: boolean;
}

export default function OnboardingScreenBasicInformationViewComponent({
    errors = {},
    allValid = false,
}: OnboardingScreenBasicInformationViewComponentProps): React.JSX.Element {
    const { basicInfo, setBasicInfo } = useOnboardingStateStore();

    return (
        <PageScrollViewHolderComponent>
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {OnboardingScreenCON.BASIC_INFO_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {OnboardingScreenCON.BASIC_INFO_SUBTITLE}
            </Text>

            <View
                style={{ marginTop: EdgeInsetsCON.XXL, gap: EdgeInsetsCON.LG }}
            >
                <StandardInputComponent
                    label={OnboardingScreenCON.LABEL_NAME}
                    value={basicInfo.name}
                    onChangeText={(text) => setBasicInfo({ name: text })}
                    placeholder={OnboardingScreenCON.PLACEHOLDER_NAME}
                    hasError={errors.name}
                    isValid={allValid}
                />
                <StandardInputComponent
                    label={OnboardingScreenCON.LABEL_COURSE_NAME}
                    value={basicInfo.courseName}
                    onChangeText={(text) => setBasicInfo({ courseName: text })}
                    placeholder={OnboardingScreenCON.PLACEHOLDER_COURSE_NAME}
                    labelClassName="mt-5"
                    hasError={errors.courseName}
                    isValid={allValid}
                />
                <StandardInputComponent
                    label={OnboardingScreenCON.LABEL_PROFILE_NAME}
                    value={basicInfo.profileName}
                    onChangeText={(text) => setBasicInfo({ profileName: text })}
                    placeholder={OnboardingScreenCON.PLACEHOLDER_PROFILE_NAME}
                    labelClassName="mt-5"
                    hasError={errors.profileName}
                    isValid={allValid}
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
