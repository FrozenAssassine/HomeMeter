import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { darkTheme, lightTheme } from "@/assets/colors/colors";
import { useEffect } from "react";
import { ThemeProvider } from "@/contexts/themeContext";
import { DataProvider } from "@/contexts/dataProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const background =
    colorScheme == "light" ? lightTheme.background : darkTheme.background;

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(background);
    StatusBar.setStatusBarBackgroundColor(background);
  }, [colorScheme]);

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
