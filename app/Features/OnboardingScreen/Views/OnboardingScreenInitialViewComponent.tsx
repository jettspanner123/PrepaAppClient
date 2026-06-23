import PageScrollViewHolderComponent from "@/app/Components/Page/PageScrollViewHolderComponent";
import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import OnboardingScreenStepCardStaticComponent from "@/app/Features/OnboardingScreen/Components/static/OnboardingScreenStepCardStaticComponent";
import OnboardingScreenCON from "@/app/Features/OnboardingScreen/Constants/OnboardingScreenCON";
import React from "react";
import { Text, View } from "react-native";

export default function OnboardingScreenInitialViewComponent(): React.JSX.Element {
    return (
        <PageScrollViewHolderComponent>
            {/* Heading */}
            <Text className="text-5xl font-black uppercase leading-none tracking-tight text-cf-white">
                {OnboardingScreenCON.INITIAL_TITLE}
            </Text>
            <Text className="mt-ei-md text-base font-medium text-cf-mute">
                {OnboardingScreenCON.INITIAL_SUBTITLE}
            </Text>

            {/* Steps list */}
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
                    {OnboardingScreenCON.INITIAL_STEP_LABEL}
                </Text>

                {OnboardingScreenCON.INITIAL_STEPS.map((item, index) => (
                    <OnboardingScreenStepCardStaticComponent
                        key={item.step}
                        index={index}
                        step={item.step}
                        description={item.description}
                    />
                ))}
            </View>
        </PageScrollViewHolderComponent>
    );
}
