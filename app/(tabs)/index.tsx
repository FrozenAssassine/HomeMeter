import SectionHeadline from "@/components/sectionHeadline";
import SimplePage from "@/components/simplePage";
import SingleValueBox from "@/components/singleValueBox";
import VerticalView from "@/components/verticalView";
import { useData } from "@/contexts/dataProvider";
import React from "react";

export default function SolarOverview() {
    const data = useData();

    const summaryData = data.liveSolarData?.inverters[0].AC[0];

    return (
        <SimplePage headline="Übersicht" enableScroll={true}>
            <VerticalView style={{ gap: 10, alignItems: "center", justifyContent: "center" }}>
                <SectionHeadline text="Solar" />
                <SingleValueBox
                    headline="Ertrag Heute"
                    value={
                        (data.liveSolarData?.total.YieldDay.v.toFixed(0) ?? "") + data.liveSolarData?.total.YieldDay.u
                    }
                />
                <SingleValueBox
                    headline="Aktuelle Leistung"
                    value={(data.liveSolarData?.total.Power.v.toFixed(2) ?? "") + data.liveSolarData?.total.Power.u}
                />

                <SingleValueBox
                    headline="Gesamtertrag"
                    value={
                        (data.liveSolarData?.total.YieldTotal.v.toFixed(1) ?? "") +
                        data.liveSolarData?.total.YieldTotal.u
                    }
                />
                <SingleValueBox
                    headline="Peak"
                    value={
                        (data.solarHistoryData[data.solarHistoryData.length - 1]?.HighestWatt.toFixed(1) ?? "") + "W"
                    }
                />
                <SectionHeadline text="Verbrauch" />
                <SingleValueBox
                    headline="Aktuelle Einspeisung"
                    value={data.livePowerData?.total_power.toFixed(2) + "W"}
                />
                <SingleValueBox
                    headline="Hausverbrauch"
                    value={
                        ((data.livePowerData?.total_power ?? 0) + (data.liveSolarData?.total.Power.v ?? 0)).toFixed(2) +
                        "W"
                    }
                />
            </VerticalView>
        </SimplePage>
    );
}
