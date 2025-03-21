import React, { ReactNode, useState } from "react";
import Modal from "react-native-modal";
import { StyleSheet, useColorScheme, View } from "react-native";
import { useTheme } from "@/contexts/themeContext";

type Props = {
    children: ReactNode;
    isVisible?: boolean;
    dismissed?: () => void;
};

export default function SimpleModalBottomFlyout({ children, isVisible, dismissed }: Props) {
    const { colors } = useTheme();

    const backPressed = () => {
        if (dismissed) dismissed();
    };

    return (
        <Modal
            statusBarTranslucent={true}
            onBackdropPress={() => backPressed()}
            isVisible={isVisible}
            style={styles.modal}
        >
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>{children}</View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0,
        backgroundColor: "transparent",
        height: "50%",
    },
    modalContent: {
        height: "40%",
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-around",
    },
});
