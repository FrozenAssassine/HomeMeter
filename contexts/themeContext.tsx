import { Colors, useColors } from "@/assets/colors/colors";
import React, { createContext, useContext, ReactNode } from "react";

interface ThemeContextProps {
    colors: Colors;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const colors = useColors();

    return <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
