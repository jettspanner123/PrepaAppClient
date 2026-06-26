import StandardInputComponent from "@/app/Components/Shared/StandardInputComponent";
import StandardPageHeaderComponent from "@/app/Components/Shared/StandardPageHeaderComponent";
import StandardPageLabelComponent from "@/app/Components/Shared/StandardPageLabelComponent";
import useAuthenticationStateStore from "@/app/Store/AuthenticationStateStore";
import React, { useCallback } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorFactoryCON from "../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../Constants/EdgeInsetsCON";
import AuthenticationScreenFABStaticComponent from "./Components/static/AuthenticationScreenFABStaticComponent";
import AuthenticationScreenCON from "./Constants/AuthenticationScreenCON";

export default function AuthenticationScreenController(): React.JSX.Element {
    const { phoneNumber, setPhoneNumber, email, setEmail } =
        useAuthenticationStateStore();

    const handleFABPress = useCallback((): void => {
        console.log("Send OTP — phone:", phoneNumber, "email:", email);
        // TODO: trigger OTP
    }, [phoneNumber, email]);

    const handleGooglePress = useCallback((): void => {
        console.log("Login with Google");
        // TODO: trigger Google auth
    }, []);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: EdgeInsetsCON.SCROLL_BOTTOM_CLEARANCE,
                    }}
                >
                    {/* Header */}
                    <View
                        style={{
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: EdgeInsetsCON.SCREEN_TOP,
                            gap: EdgeInsetsCON.MD,
                        }}
                    >
                        <StandardPageHeaderComponent
                            text={AuthenticationScreenCON.PAGE_HEADING}
                        />
                        <StandardPageLabelComponent
                            text={AuthenticationScreenCON.LOGIN_LABEL}
                        />
                    </View>

                    {/* Divider */}
                    <View
                        style={{
                            height: 1,
                            backgroundColor: ColorFactoryCON.WHITE,
                            opacity: 0.2,
                            marginTop: EdgeInsetsCON.XL,
                            marginHorizontal: EdgeInsetsCON.XL - 4,
                        }}
                    />

                    {/* Inputs */}
                    <View
                        style={{
                            paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                            paddingTop: EdgeInsetsCON.XL,
                            gap: EdgeInsetsCON.LG,
                        }}
                    >
                        <StandardInputComponent
                            label={AuthenticationScreenCON.LABEL_EMAIL}
                            value={email}
                            onChangeText={setEmail}
                            placeholder={
                                AuthenticationScreenCON.PLACEHOLDER_EMAIL
                            }
                        />
                        <StandardInputComponent
                            labelClassName="mt-5"
                            label={AuthenticationScreenCON.LABEL_PHONE}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder={
                                AuthenticationScreenCON.PLACEHOLDER_PHONE
                            }
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* FAB */}
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                }}
                pointerEvents="box-none"
            >
                <AuthenticationScreenFABStaticComponent
                    onPress={handleFABPress}
                    onGooglePress={handleGooglePress}
                />
            </View>
        </SafeAreaView>
    );
}
