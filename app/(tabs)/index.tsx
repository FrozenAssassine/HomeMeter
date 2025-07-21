import HomePageDataOverview from "@/components/homePageDataOverview";
import IndividualCellDisplay from "@/components/individualCellDisplay";
import SectionHeadline from "@/components/sectionHeadline";
import SimplePage from "@/components/simplePage";
import SingleValueBox from "@/components/singleValueBox";
import VerticalView from "@/components/verticalView";
import { useData } from "@/contexts/dataProvider";
import React from "react";
import { View } from "react-native";

export default function SolarOverview() {
    const data = useData();

    const historyData = data.solarHistoryData[data.solarHistoryData.length - 1];

    return (
        <SimplePage headline="Übersicht" enableScroll={true}>
            <VerticalView style={{ gap: 10, alignItems: "center", justifyContent: "center" }}>
                <HomePageDataOverview
                    leftTitle={(data.liveSolarData?.total.Power.v.toFixed(2) ?? "") + data.liveSolarData?.total.Power.u}
                    rightTitle={
                        ((data.livePowerData?.total_power ?? 0) <= 0 ? 0 : data.livePowerData?.total_power.toFixed(2)) +
                        "W"
                    }
                    bottomTitle={
                        ((data.livePowerData?.total_power ?? 0) + (data.liveSolarData?.total.Power.v ?? 0)).toFixed(2) +
                        "W"
                    }
                    leftIcon="sunny"
                    rightIcon="flash"
                    bottomIcon="home"
                    lineText={
                        (data.livePowerData?.total_power ?? 0 < 0 ? -1 * (data.livePowerData?.total_power ?? 0) : "0") +
                        "W"
                    }
                    useSolarPower={(data.liveSolarData?.total.Power.v ?? 0) > 0}
                    useGridPower={(data.livePowerData?.total_power ?? 0) > 0}
                />
                <View style={{ marginTop: 10 }} />
                <SectionHeadline text="Allgemein" />
                <SingleValueBox
                    height={30}
                    headline="Ertrag Heute"
                    value={
                        (data.liveSolarData?.total.YieldDay.v.toFixed(0) ?? "") + data.liveSolarData?.total.YieldDay.u
                    }
                />

                <SingleValueBox
                    height={30}
                    headline="Gesamtertrag"
                    value={
                        (data.liveSolarData?.total.YieldTotal.v.toFixed(1) ?? "") +
                        data.liveSolarData?.total.YieldTotal.u
                    }
                />
                <SingleValueBox height={30} headline="Peak" value={(historyData?.HighestWatt.toFixed(1) ?? "") + "W"} />

                <View style={{ marginTop: 10 }} />
                {historyData?.ConsumedWH && (
                    <SingleValueBox
                        height={30}
                        headline={"Hausverbrauch"}
                        value={historyData.ConsumedWH.toFixed(0) + " Wh"}
                    />
                )}
                {historyData?.ExportedWH && (
                    <SingleValueBox
                        height={30}
                        headline={"Netzeinspeisung"}
                        value={historyData.ExportedWH.toFixed(0) + " Wh"}
                    />
                )}
                {historyData?.SelfUsedWH && (
                    <SingleValueBox
                        height={30}
                        headline={"Umgesetzter Solarstrom"}
                        value={historyData.SelfUsedWH.toFixed(0) + " Wh"}
                    />
                )}
                {historyData?.SelfConsumptionRatio && (
                    <SingleValueBox
                        height={30}
                        headline={"Eigenverbrauchsquote"}
                        value={(historyData.SelfConsumptionRatio * 100).toFixed(0) + " %"}
                    />
                )}
                {historyData?.AutarkyRatio && (
                    <SingleValueBox
                        height={30}
                        headline={"Autarkiegrad"}
                        value={(historyData.AutarkyRatio * 100).toFixed(0) + " %"}
                    />
                )}

                <View style={{ marginTop: 10 }} />
                <SectionHeadline text="Ertrag Zellen" />
                <IndividualCellDisplay />
                {/* <SectionHeadline text="Verbrauch" />
                <SingleValueBox
                    headline="Hausverbrauch"
                    value={
                        ((data.livePowerData?.total_power ?? 0) + (data.liveSolarData?.total.Power.v ?? 0)).toFixed(2) +
                        "W"
                    }
                />
                <SingleValueBox
                    headline="Strom ins Netz"
                    value={
                        ((data.livePowerData?.total_power ?? 0) <= 0
                            ? -1 * (data.livePowerData?.total_power ?? 0)
                            : 0
                        ).toFixed(2) + "W"
                    }
                />

                <SingleValueBox
                    headline="Strom vom Netz"
                    value={
                        ((data.livePowerData?.total_power ?? 0) > 0 ? data.livePowerData?.total_power ?? 0 : 0).toFixed(
                            2
                        ) + "W"
                    }
                /> */}
                {/* 
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        position: "relative", // Important
                    }}
                >
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <HomePageOverviewComponent
                                icon="sunny-outline"
                                title={
                                    (data.liveSolarData?.total.Power.v.toFixed(2) ?? "") +
                                    data.liveSolarData?.total.Power.u
                                }
                            />{" "}
                            <Svg height="100" width="100">
                                <Path d={pathData1} stroke={colors.text} strokeWidth="2" fill="none" />
                            </Svg>
                        </View>
                        <View>
                            <HomePageOverviewComponent
                                icon="power-outline"
                                title={data.livePowerData?.total_power.toFixed(2) + "W"}
                            />{" "}
                            <Svg height="100" width="100">
                                <Path d={pathData2} stroke={colors.text} strokeWidth="2" fill="none" />
                            </Svg>
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <HomePageOverviewComponent
                            icon="home"
                            title={
                                (
                                    (data.livePowerData?.total_power ?? 0) + (data.liveSolarData?.total.Power.v ?? 0)
                                ).toFixed(2) + "W"
                            }
                        />{" "}
                    </View>
                </View> */}
            </VerticalView>
        </SimplePage>
    );
}
