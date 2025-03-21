import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function scheduleNotification() {
    // Calculate the time for 18:00
    const now = new Date();
    const notificationTime = new Date(now);
    notificationTime.setHours(18, 0, 0, 0); // Set to 18:00:00 of the current day

    // If the time has already passed for today, schedule for tomorrow
    if (notificationTime < now) {
        notificationTime.setDate(now.getDate() + 1);
    }

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Solar Data Update",
            body: "Here are your solar data updates for the day.",
            data: {
                message: "Summary of your solar data",
                totalYield: "100 kWh",
                yieldToday: "5 kWh",
                powerNow: "1.2 kW",
            },
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 11,
            minute: 55,
        },
    });
}
