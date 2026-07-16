import ColorFactoryCON from "@/app/Constants/ColorFactoryCON";
import EdgeInsetsCON from "@/app/Constants/EdgeInsetsCON";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CreateExerciseScreenEquipmentGridStaticComponentProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string) => void;
}

export default function CreateExerciseScreenEquipmentGridStaticComponent({
    categories,
    selectedCategory,
    onSelectCategory,
}: CreateExerciseScreenEquipmentGridStaticComponentProps): React.JSX.Element {
    return (
        <View style={styles.GRID_WRAPPER}>
            {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                    <Pressable
                        key={category}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            onSelectCategory(category);
                        }}
                        style={[
                            styles.GRID_ITEM,
                            isSelected
                                ? styles.GRID_ITEM_SELECTED
                                : styles.GRID_ITEM_UNSELECTED,
                        ]}
                    >
                        <Text
                            style={[
                                styles.GRID_TEXT,
                                isSelected
                                    ? styles.GRID_TEXT_SELECTED
                                    : styles.GRID_TEXT_UNSELECTED,
                            ]}
                        >
                            {category}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    GRID_WRAPPER: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: EdgeInsetsCON.CARD_GAP,
        marginTop: EdgeInsetsCON.MD,
    },
    GRID_ITEM: {
        width: "48.5%",
        height: 80,
        borderWidth: 1,
        borderRadius: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    GRID_ITEM_UNSELECTED: {
        borderColor: ColorFactoryCON.CARD_BORDER,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    GRID_ITEM_SELECTED: {
        borderColor: ColorFactoryCON.WHITE,
        backgroundColor: ColorFactoryCON.WHITE,
    },
    GRID_TEXT: {
        fontFamily: "Anton",
        fontSize: 18,
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    GRID_TEXT_UNSELECTED: {
        color: ColorFactoryCON.WHITE,
    },
    GRID_TEXT_SELECTED: {
        color: ColorFactoryCON.INK,
    },
});
