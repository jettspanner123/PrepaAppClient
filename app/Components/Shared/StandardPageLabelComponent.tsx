import React from "react";
import { Text } from "react-native";

interface StandardPageLabelComponentProps {
    text: string;
    className?: string;
}

export default function StandardPageLabelComponent({
    text,
    className,
}: StandardPageLabelComponentProps): React.JSX.Element {
    return (
        <Text
            className={`mt-ei-md text-base font-medium text-cf-mute ${className ?? ""}`}
        >
            {text}
        </Text>
    );
}
