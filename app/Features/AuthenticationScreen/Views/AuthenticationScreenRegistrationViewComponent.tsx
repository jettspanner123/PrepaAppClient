import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import AuthenticationScreenCON from "@/app/Features/AuthenticationScreen/Constants/AuthenticationScreenCON";
import useAuthenticationStateStore from "@/app/Store/AuthenticationStateStore";
import React from "react";
import { View } from "react-native";

export default function AuthenticationScreenRegistrationViewComponent(): React.JSX.Element {
    const { registrationPhone, setRegistrationPhone } =
        useAuthenticationStateStore();

    return (
        <PageScrollViewHolderComponent>
            <View style={{ gap: EdgeInsetsCON.LG }}>
                <StandardInputComponent
                    label={AuthenticationScreenCON.LABEL_PHONE}
                    value={registrationPhone}
                    onChangeText={setRegistrationPhone}
                    placeholder={AuthenticationScreenCON.PLACEHOLDER_PHONE}
                />
            </View>
        </PageScrollViewHolderComponent>
    );
}
