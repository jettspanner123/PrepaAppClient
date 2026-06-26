import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardFullDateInputComponent from "@/app/Components/Shared/StandardFullDateInputComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import StandardOptionSelectorComponent from "@/app/Components/Shared/StandardOptionSelectorComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import AdditionalInformationScreenCON from "@/app/Features/AdditionalInformationScreen/Constants/AdditionalInformationScreenCON";
import useAdditionalInformationStateStore from "@/app/Store/AdditionalInformationStateStore";
import React from "react";
import { Text, View } from "react-native";

export default function AdditionalInformationScreenPersonalInfoViewComponent(): React.JSX.Element {
    const { name, setName, dateOfBirth, setDateOfBirth, gender, setGender } =
        useAdditionalInformationStateStore();

    return (
        <PageScrollViewHolderComponent>
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {AdditionalInformationScreenCON.PERSONAL_INFO_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {AdditionalInformationScreenCON.PERSONAL_INFO_SUBTITLE}
            </Text>

            <View
                style={{ marginTop: EdgeInsetsCON.XXL, gap: EdgeInsetsCON.LG }}
            >
                <StandardInputComponent
                    label={AdditionalInformationScreenCON.LABEL_NAME}
                    value={name}
                    onChangeText={setName}
                    placeholder={
                        AdditionalInformationScreenCON.PLACEHOLDER_NAME
                    }
                />
                <StandardFullDateInputComponent
                    labelClassName="mt-3"
                    label={AdditionalInformationScreenCON.LABEL_DATE_OF_BIRTH}
                    value={dateOfBirth}
                    onChange={setDateOfBirth}
                />
                <StandardOptionSelectorComponent
                    labelClassName="mt-3"
                    label={AdditionalInformationScreenCON.LABEL_GENDER}
                    options={AdditionalInformationScreenCON.GENDER_OPTIONS}
                    value={gender}
                    onChange={setGender}
                    placeholder="Select gender"
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
