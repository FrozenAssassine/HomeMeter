import { useColorScheme } from "react-native";

export type Colors = {
    background: string;
    containerBG: string;
    boxBG: string;
    text: string;
    primary: string;
    accent: string;
    accent2: string;
    secondaryText: string;
    //opposite of dark/light
    highlightedBG: string;
    highlightedText: string;
};

const lightTheme: Colors = {
    background: "#F8F9FA", // Softer white
    containerBG: "#E3E6E8", // Light neutral tone
    boxBG: "#DDE1E5", // Slightly darker for subtle depth
    text: "#222222", // Dark gray for better readability
    primary: "#5A00D6", // Vibrant deep purple
    accent: "#3E366B", // Cooler contrast tone
    accent2: "#2e2a45", // Cooler contrast tone
    highlightedText: "#FFFFFF",
    highlightedBG: "#5A00D6", // Primary color highlight
    secondaryText: "#555555", // Darker gray for contrast
};

const darkTheme: Colors = {
    background: "#181A1B", // Softer dark shade
    containerBG: "#222526", // Smooth transition from background
    boxBG: "#292C2E", // Subtle contrast
    text: "#E4E4E4", // Softer white for less strain
    primary: "#9B6EF3", // Softer vibrant purple
    accent: "#8A75E2", // Cooler and consistent
    accent2: "#494363", // Cooler and consistent
    highlightedText: "#181A1B",
    highlightedBG: "#E3E6E8", // Matches light mode's containerBG
    secondaryText: "#B0B0B0", // Lighter for better readability
};

export const useColors = () => {
    // Use `useColorScheme` for runtime theme detection
    const colorScheme = useColorScheme() || "light"; // default to 'light' if null

    if (colorScheme === "dark") {
        return darkTheme;
    }
    return lightTheme;
};

export { lightTheme, darkTheme };
