import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardDateInputComponent from "@/app/Components/Shared/StandardDateInputComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import StandardOptionSelectorComponent from "@/app/Components/Shared/StandardOptionSelectorComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import AdditionalInformationScreenCON from "@/app/Features/AdditionalInformationScreen/Constants/AdditionalInformationScreenCON";
import useAdditionalInformationStateStore from "@/app/Store/AdditionalInformationStateStore";
import React from "react";
import { Text, View } from "react-native";

export default function AdditionalInformationScreenAdditionalInfoViewComponent(): React.JSX.Element {
    const {
        graduationYear,
        setGraduationYear,
        collegeName,
        setCollegeName,
        currentState,
        setCurrentState,
        hometownState,
        setHometownState,
    } = useAdditionalInformationStateStore();

    return (
        <PageScrollViewHolderComponent>
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {AdditionalInformationScreenCON.ADDITIONAL_INFO_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {AdditionalInformationScreenCON.ADDITIONAL_INFO_SUBTITLE}
            </Text>

            <View
                style={{ marginTop: EdgeInsetsCON.XXL, gap: EdgeInsetsCON.LG }}
            >
                <StandardInputComponent
                    label={AdditionalInformationScreenCON.LABEL_COLLEGE_NAME}
                    value={collegeName}
                    onChangeText={setCollegeName}
                    placeholder={
                        AdditionalInformationScreenCON.PLACEHOLDER_COLLEGE_NAME
                    }
                />
                <StandardDateInputComponent
                    label={AdditionalInformationScreenCON.LABEL_GRADUATION_YEAR}
                    value={graduationYear}
                    onChange={setGraduationYear}
                    fromYear={1980}
                    toYear={new Date().getFullYear() + 6}
                />
                <StandardOptionSelectorComponent
                    label={AdditionalInformationScreenCON.LABEL_CURRENT_STATE}
                    options={AdditionalInformationScreenCON.INDIAN_STATES}
                    value={currentState || null}
                    onChange={setCurrentState}
                    placeholder="Select state"
                />
                <StandardOptionSelectorComponent
                    label={AdditionalInformationScreenCON.LABEL_HOMETOWN_STATE}
                    options={AdditionalInformationScreenCON.INDIAN_STATES}
                    value={hometownState || null}
                    onChange={setHometownState}
                    placeholder="Select state"
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
