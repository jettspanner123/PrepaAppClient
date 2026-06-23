import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface StandardInputComponentProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
}

export default function StandardInputComponent({
    label,
    value,
    onChangeText,
    placeholder,
    inputClassName,
    labelClassName,
}: StandardInputComponentProps): React.JSX.Element {
    const [focused, setFocused] = useState<boolean>(false);

    return (
        <View style={{ gap: EdgeInsetsCON.XS }}>
            <Text
                className={labelClassName}
                style={{
                    fontSize: 11,
                    fontWeight: "600",
                    color: ColorFactoryCON.MUTE,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    marginBottom: 5,
                    marginLeft: 5,
                }}
            >
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={ColorFactoryCON.MUTE}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={inputClassName}
                style={{
                    backgroundColor: ColorFactoryCON.INPUT_BG,
                    borderRadius: EdgeInsetsCON.MD,
                    borderWidth: 1,
                    borderColor: focused
                        ? ColorFactoryCON.WHITE
                        : ColorFactoryCON.CARD_BORDER,
                    paddingHorizontal: EdgeInsetsCON.LG,
                    paddingVertical: EdgeInsetsCON.LG,
                    fontSize: 16,
                    fontWeight: "500",
                    color: ColorFactoryCON.WHITE,
                }}
            />
        </View>
    );
}
