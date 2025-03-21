import React, { useEffect } from "react";
import { StyleSheet, ViewStyle, ScrollView, View } from "react-native";
import * as StatusBar from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import SimplePageHeadline from "./simplePageHeadline";
import { useTheme } from "@/contexts/themeContext";
import SimpleIconButton from "./simpleIconButton";
import { useData } from "@/contexts/dataProvider";

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    enableScroll?: boolean;
    fullscreen?: boolean;
    headline?: string;
};

export default function SimplePage({ children, style, enableScroll, fullscreen, headline }: Props) {
    const { colors } = useTheme();
    const data = useData();

    const reloadData = () => {
        data.reloadData();
    };

    const content = () => {
        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: colors.background },
                    { padding: fullscreen ? 0 : 8 },
                    style,
                ]}
            >
                <View style={[styles.header, { padding: fullscreen ? 0 : 10, paddingBottom: fullscreen ? 0 : 20 }]}>
                    {headline && <SimplePageHeadline text={headline} />}
                    <View style={styles.closeButtonHeader}>
                        <SimpleIconButton iconSize={28} icon="reload-outline" onPress={reloadData} />
                    </View>
                </View>

                {enableScroll ? (
                    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} scrollEnabled={true}>
                        {children}
                    </ScrollView>
                ) : (
                    children
                )}
            </View>
        );
    };

    useEffect(() => {
        if (fullscreen) StatusBar.setStatusBarBackgroundColor("transparent");
    }, [fullscreen]);
    return fullscreen ? (
        content()
    ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>{content()}</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    closeButtonHeader: {
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
});
