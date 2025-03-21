import React from "react";
import { View } from "react-native";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
};

export default function VerticalView(props: Props) {
    return <View style={[{ display: "flex", flexDirection: "column" }, props.style]}>{props.children}</View>;
}
