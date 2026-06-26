import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import AdditionalInformationScreenCON from "@/app/Features/AdditionalInformationScreen/Constants/AdditionalInformationScreenCON";
import OnboardingScreenStepCardStaticComponent from "@/app/Features/OnboardingScreen/Components/static/OnboardingScreenStepCardStaticComponent";
import React from "react";
import { Text, View } from "react-native";

export default function AdditionalInformationScreenInitialViewComponent(): React.JSX.Element {
    return (
        <PageScrollViewHolderComponent>
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {AdditionalInformationScreenCON.INITIAL_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {AdditionalInformationScreenCON.INITIAL_SUBTITLE}
            </Text>

            <View
                style={{ marginTop: EdgeInsetsCON.XXL, gap: EdgeInsetsCON.MD }}
            >
                <Text
                    style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: ColorFactoryCON.MUTE,
                        textTransform: "uppercase",
                        letterSpacing: 1.5,
                        marginBottom: EdgeInsetsCON.XS,
                    }}
                >
                    {AdditionalInformationScreenCON.INITIAL_STEP_LABEL}
                </Text>

                {AdditionalInformationScreenCON.INITIAL_STEPS.map(
                    (item, index) => (
                        <OnboardingScreenStepCardStaticComponent
                            key={item.step}
                            index={index}
                            step={item.step}
                            description={item.description}
                            accentColor={item.accentColor}
                        />
                    ),
                )}
            </View>
        </PageScrollViewHolderComponent>
    );
}
