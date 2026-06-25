import StandardFullDateInputComponent from "@/app/Components/Shared/StandardFullDateInputComponent";
import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import AuthenticationScreenCON from "@/app/Features/AuthenticationScreen/Constants/AuthenticationScreenCON";
import useAuthenticationStateStore from "@/app/Store/AuthenticationStateStore";
import React from "react";
import { View } from "react-native";

export default function AuthenticationScreenRegistrationViewComponent(): React.JSX.Element {
    const {
        registrationFullName,
        setRegistrationFullName,
        registrationDateOfBirth,
        setRegistrationDateOfBirth,
        registrationPhone,
        setRegistrationPhone,
    } = useAuthenticationStateStore();

    return (
        <View
            style={{
                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                paddingTop: EdgeInsetsCON.XL,
                gap: EdgeInsetsCON.LG,
            }}
        >
            <StandardInputComponent
                labelClassName="mt-5"
                label={AuthenticationScreenCON.LABEL_FULL_NAME}
                value={registrationFullName}
                onChangeText={setRegistrationFullName}
                placeholder={AuthenticationScreenCON.PLACEHOLDER_FULL_NAME}
            />
            <StandardFullDateInputComponent
                labelClassName="mt-5"
                label={AuthenticationScreenCON.LABEL_DATE_OF_BIRTH}
                value={registrationDateOfBirth}
                onChange={setRegistrationDateOfBirth}
            />
            <StandardInputComponent
                labelClassName="mt-5"
                label={AuthenticationScreenCON.LABEL_PHONE}
                value={registrationPhone}
                onChangeText={setRegistrationPhone}
                placeholder={AuthenticationScreenCON.PLACEHOLDER_PHONE}
            />
        </View>
    );
}
