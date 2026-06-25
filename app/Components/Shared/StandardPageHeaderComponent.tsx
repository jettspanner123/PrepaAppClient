import React from "react";
import { Text } from "react-native";

interface StandardPageHeaderComponentProps {
    text: string;
    className?: string;
}

export default function StandardPageHeaderComponent({
    text,
    className,
}: StandardPageHeaderComponentProps): React.JSX.Element {
    return (
        <Text
            className={`text-5xl font-black uppercase leading-none tracking-tight text-cf-white ${className ?? ""}`}
        >
            {text}
        </Text>
    );
}
