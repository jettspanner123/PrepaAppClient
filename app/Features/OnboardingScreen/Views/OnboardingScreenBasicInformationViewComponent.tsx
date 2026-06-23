import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function OnboardingScreenBasicInformationViewComponent(): React.JSX.Element {
    const [name, setName] = useState<string>("");
    const [courseName, setCourseName] = useState<string>("");
    const [profileName, setProfileName] = useState<string>("");

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
                    value={name}
                    onChangeText={setName}
                    placeholder={OnboardingScreenCON.PLACEHOLDER_NAME}
                />
                <StandardInputComponent
                    label={OnboardingScreenCON.LABEL_COURSE_NAME}
                    value={courseName}
                    onChangeText={setCourseName}
                    placeholder={OnboardingScreenCON.PLACEHOLDER_COURSE_NAME}
                    labelClassName="mt-5"
                />
                <StandardInputComponent
                    label={OnboardingScreenCON.LABEL_PROFILE_NAME}
                    value={profileName}
                    onChangeText={setProfileName}
                    placeholder={OnboardingScreenCON.PLACEHOLDER_PROFILE_NAME}
                    labelClassName="mt-5"
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
