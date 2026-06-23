import React from "react";
import { View } from "react-native";
import EdgeInsetsCON from "../../../Constants/EdgeInsetsCON";
import ProfileSelectionScreenCardStaticComponent from "../Components/static/ProfileSelectionScreenCardStaticComponent";
import ProfileSelectionScreenCON from "../Constants/ProfileSelectionScreenCON";

interface ProfileSelectionScreenCardListControllerProps {
    onProfileSelect: (id: string) => void;
}

export default function ProfileSelectionScreenCardListController({
    onProfileSelect,
}: ProfileSelectionScreenCardListControllerProps): React.JSX.Element {
    return (
        <View
            style={{
                paddingHorizontal: EdgeInsetsCON.SCREEN_H,
                gap: EdgeInsetsCON.CARD_GAP,
            }}
        >
            {ProfileSelectionScreenCON.PROFILES.map((profile) => (
                <ProfileSelectionScreenCardStaticComponent
                    key={profile.id}
                    id={profile.id}
                    name={profile.name}
                    initials={profile.initials}
                    onPress={onProfileSelect}
                />
            ))}
        </View>
    );
}
