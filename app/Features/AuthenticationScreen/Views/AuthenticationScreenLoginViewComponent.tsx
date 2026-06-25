import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import AuthenticationScreenCON from "@/app/Features/AuthenticationScreen/Constants/AuthenticationScreenCON";
import useAuthenticationStateStore from "@/app/Store/AuthenticationStateStore";
import React from "react";
import { View } from "react-native";

export default function AuthenticationScreenLoginViewComponent(): React.JSX.Element {
    const { loginPhone, setLoginPhone } = useAuthenticationStateStore();

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
                label={AuthenticationScreenCON.LABEL_PHONE}
                value={loginPhone}
                onChangeText={setLoginPhone}
                placeholder={AuthenticationScreenCON.PLACEHOLDER_PHONE}
            />
        </View>
    );
}
