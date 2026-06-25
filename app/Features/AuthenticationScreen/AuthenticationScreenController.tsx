import StandardPageHeaderComponent from "@/app/Components/Shared/StandardPageHeaderComponent";
import StandardPageLabelComponent from "@/app/Components/Shared/StandardPageLabelComponent";
import StandardSegmentedComponent from "@/app/Components/Shared/StandardSegmentedComponent";
import AuthenticationScreenLoginViewComponent from "@/app/Features/AuthenticationScreen/Views/AuthenticationScreenLoginViewComponent";
import AuthenticationScreenRegistrationViewComponent from "@/app/Features/AuthenticationScreen/Views/AuthenticationScreenRegistrationViewComponent";
import useAuthenticationStateStore from "@/app/Store/AuthenticationStateStore";
import React, { useCallback, useEffect, useRef } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColorFactoryCON from "../../Constants/ColorFactoryCON";
import EdgeInsetsCON from "../../Constants/EdgeInsetsCON";
import AuthenticationScreenFABStaticComponent from "./Components/static/AuthenticationScreenFABStaticComponent";
import AuthenticationScreenCON from "./Constants/AuthenticationScreenCON";
import AuthenticationScreenOptions from "./Models/AuthenticationScreenOptions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREENS = [
    AuthenticationScreenOptions.LOGIN,
    AuthenticationScreenOptions.REGISTRATION,
];

const SEGMENT_OPTIONS = [
    { label: "Login", value: String(AuthenticationScreenOptions.LOGIN) },
    {
        label: "Register",
        value: String(AuthenticationScreenOptions.REGISTRATION),
    },
];

const LABELS: Record<AuthenticationScreenOptions, string> = {
    [AuthenticationScreenOptions.LOGIN]: AuthenticationScreenCON.LOGIN_LABEL,
    [AuthenticationScreenOptions.REGISTRATION]:
        AuthenticationScreenCON.REGISTRATION_LABEL,
};

export default function AuthenticationScreenController(): React.JSX.Element {
    const { currentScreen, setCurrentScreen, loginPhone, registrationPhone } =
        useAuthenticationStateStore();
    const horizontalScrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        horizontalScrollRef.current?.scrollTo({
            x: currentScreen * SCREEN_WIDTH,
            animated: true,
        });
    }, [currentScreen]);

    const handleSegmentChange = useCallback(
        (value: string): void => {
            setCurrentScreen(Number(value) as AuthenticationScreenOptions);
        },
        [setCurrentScreen],
    );

    const handleFABPress = useCallback((): void => {
        if (currentScreen === AuthenticationScreenOptions.LOGIN) {
            console.log("Send OTP — login:", loginPhone);
        } else {
            console.log("Send OTP — registration:", registrationPhone);
        }
    }, [currentScreen, loginPhone, registrationPhone]);

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: ColorFactoryCON.BLACK }}
            edges={[]}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* Outer vertical scroll — scrolls everything together */}
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
                            text={LABELS[currentScreen]}
                        />
                        <StandardSegmentedComponent
                            options={SEGMENT_OPTIONS}
                            selectedValue={String(currentScreen)}
                            onChange={handleSegmentChange}
                        />
                    </View>

                    {/* Divider */}
                    <View
                        style={{
                            height: 1,
                            backgroundColor: ColorFactoryCON.WHITE,
                            opacity: 0.2,
                            marginTop: EdgeInsetsCON.XXL,
                            marginHorizontal: EdgeInsetsCON.XL - 4,
                            borderRadius: 100,
                        }}
                    />

                    {/* Horizontal paging scroll — switches between screens */}
                    <ScrollView
                        ref={horizontalScrollRef}
                        horizontal
                        pagingEnabled
                        scrollEnabled={false}
                        showsHorizontalScrollIndicator={false}
                        style={{ width: SCREEN_WIDTH }}
                    >
                        {SCREENS.map((screen) => (
                            <View key={screen} style={{ width: SCREEN_WIDTH }}>
                                {screen ===
                                    AuthenticationScreenOptions.LOGIN && (
                                    <AuthenticationScreenLoginViewComponent />
                                )}
                                {screen ===
                                    AuthenticationScreenOptions.REGISTRATION && (
                                    <AuthenticationScreenRegistrationViewComponent />
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Single FAB */}
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
                />
            </View>
        </SafeAreaView>
    );
}
