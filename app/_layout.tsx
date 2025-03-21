import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { darkTheme, lightTheme } from "@/assets/colors/colors";
import { useEffect } from "react";
import { ThemeProvider } from "@/contexts/themeContext";
import { DataProvider, useData } from "@/contexts/dataProvider";
import * as Notifications from "expo-notifications";
import { scheduleNotification } from "@/backend/scheduleNotification";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const background = colorScheme == "light" ? lightTheme.background : darkTheme.background;

    async function requestPermissions() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to send notifications was denied");
        }
    }
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync(background);
        StatusBar.setStatusBarBackgroundColor(background);
    }, [colorScheme]);

    useEffect(() => {
        requestPermissions();

        scheduleNotification();
    }, []);

    return (
        <ThemeProvider>
            <DataProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </DataProvider>
        </ThemeProvider>
    );
}
