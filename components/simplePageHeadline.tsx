import React from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "@/contexts/themeContext";
import SimpleText from "./simpleText";

type Props = {
    text: string;
    style?: ViewStyle;
    fontsize?: number;
};

export default function SimplePageHeadline(props: Props) {
    const { colors } = useTheme();
    return (
        <View style={[{ display: "flex", alignItems: "center" }, props.style]}>
            <SimpleText
                style={{ fontWeight: 700, marginTop: 10, color: colors.accent }}
                fontsize={props.fontsize ?? 28}
            >
                {props.text}
            </SimpleText>
        </View>
    );
}
