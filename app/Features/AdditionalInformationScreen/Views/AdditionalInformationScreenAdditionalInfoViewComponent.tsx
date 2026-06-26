import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import React from "react";
import { Text } from "react-native";

export default function AdditionalInformationScreenAdditionalInfoViewComponent(): React.JSX.Element {
    return (
        <PageScrollViewHolderComponent>
            <Text
                className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white"
            >
                Additional{"\n"}Info
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                A couple more details to help us build the most accurate prep schedule for you.
            </Text>
        </PageScrollViewHolderComponent>
    );
}
