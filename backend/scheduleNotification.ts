import { useData } from "@/contexts/dataProvider";
import * as Notifications from "expo-notifications";

export async function scheduleNotification() {
    const data = useData();
    const now = new Date();
    const notificationTime = new Date(now);
    notificationTime.setHours(18, 30, 0, 0);

    // If the time has already passed for today, schedule for tomorrow
    if (notificationTime < now) {
        notificationTime.setDate(now.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Solar Update",
            body: `Ertrag: ${data.liveSolarData?.total.YieldDay}Wh; Peak: ${
                data.solarHistoryData[data.solarHistoryData.length - 1].HighestWatt
            }W`,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 18,
            minute: 30,
        },
    });
}
