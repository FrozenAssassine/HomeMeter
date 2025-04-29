import SimplePage from "@/components/simplePage";
import VerticalView from "@/components/verticalView";
import { useData } from "@/contexts/dataProvider";
import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function ChartsPage() {
    const screenWidth = Dimensions.get("window").width;
    const data = useData();
    const showDataCount = 31;
    const showData = data.solarHistoryData.slice(data.solarHistoryData.length - showDataCount);
    const skipEvery = showData.length > 20 ? 7 : 1;

    return (
        <SimplePage headline="Solar" enableScroll={true}>
            <LineChart
                data={{
                    labels: showData.map((date, index) => (index % skipEvery === 0 ? date.Date : "")),
                    datasets: [
                        {
                            data: showData.map((item) => item.YieldTotal),
                        },
                    ],
                }}
                width={screenWidth - 22}
                height={240}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                    backgroundGradientFrom: "#556688",
                    backgroundGradientTo: "#4499bb",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#bb00ff",
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
            <LineChart
                data={{
                    labels: showData.map((date, index) => (index % skipEvery === 0 ? date.Date : "")),
                    datasets: [
                        {
                            data: showData.map((item) => item.YieldDay),
                        },
                    ],
                }}
                width={screenWidth - 22}
                height={240}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                    backgroundGradientFrom: "#445599",
                    backgroundGradientTo: "#445577",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ff00bb",
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
            <LineChart
                data={{
                    labels: showData.map((date, index) => (index % skipEvery === 0 ? date.Date : "")),
                    datasets: [
                        {
                            data: showData.map((item) => item.HighestWatt),
                        },
                    ],
                }}
                width={screenWidth - 22}
                height={240}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                    backgroundGradientFrom: "#994455",
                    backgroundGradientTo: "#774455",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#ffbb00",
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </SimplePage>
    );
}
