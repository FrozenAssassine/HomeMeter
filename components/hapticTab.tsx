import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";

export function HapticTab(props: BottomTabBarButtonProps) {
    return (
        <PlatformPressable
            {...props}
            onPressIn={(ev) => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
                    // Fallback for unsupported devices
                });
                props.onPressIn?.(ev);
            }}
        />
    );
}
