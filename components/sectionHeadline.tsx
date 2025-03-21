import React from "react";
import { View, Text } from "react-native";
import SimpleText from "./simpleText";
import { useColors } from "@/assets/colors/colors";

type Props = {
    text: string;
};

export default function SectionHeadline({ text }: Props) {
    const colors = useColors();

    return (
        <SimpleText
            fontsize={20}
            style={{
                color: colors.secondaryText,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 20,
                marginBottom: 5,
            }}
        >
            {text}
        </SimpleText>
    );
}
