import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import SimpleBox from "./simpleBox";
import SimpleText from "./simpleText";
import { useColors } from "@/assets/colors/colors";

interface SingleValueBoxProps {
    headline?: string;
    value?: string;
    selectable?: boolean;
    fontStyle?: TextStyle;
    accent?: boolean;
}

const SingleValueBox: React.FC<SingleValueBoxProps> = ({ accent, fontStyle, value, headline, selectable }) => {
    const colors = useColors();
    return (
        <SimpleBox
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <SimpleText style={{ color: accent ? colors.text : colors.accent, fontWeight: "bold" }} fontsize={18}>
                {headline}
            </SimpleText>
            <SimpleText
                fontsize={22}
                selectable={selectable}
                style={[
                    {
                        fontWeight: "900",
                        marginTop: 5,
                    },
                    fontStyle,
                ]}
            >
                {value}
            </SimpleText>
        </SimpleBox>
    );
};

const styles = StyleSheet.create({
    text: {},
});

export default SingleValueBox;
