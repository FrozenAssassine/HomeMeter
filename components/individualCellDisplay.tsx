import { useData } from "@/contexts/dataProvider";
import React from "react";
import { View } from "react-native";
import SimpleText from "./simpleText";
import Compass from "./compass";

export default function IndividualCellDisplay() {
  const data = useData();

  const solarCells = data.liveSolarData?.inverters[0].DC;

  if (solarCells === undefined) return;

  const makeCell = (width: number, index: number) => {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "white",
          borderWidth: 2,
          width: width - 20,
          height: width,
          margin: 8,
          backgroundColor: "#7079d1ff",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            borderEndEndRadius: 8,
            borderStartEndRadius: 8,
            height: `${solarCells[index].Irradiation?.v ?? 0}%`,
            width: "100%",
            backgroundColor: "#ffc400ff",
          }}
        ></View>
        <SimpleText
          fontsize={20}
          style={{ color: "black", fontWeight: "bold" }}
        >{`${solarCells[index].Power.v.toFixed(1)}W`}</SimpleText>
        <SimpleText
          style={{
            position: "absolute",
            bottom: 5,
            color: "black",
            fontWeight: "bold",
          }}
          fontsize={8}
        >{`${solarCells[index].name.u}`}</SimpleText>
      </View>
    );
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          {makeCell(130, 3)}
          <Compass />
          {makeCell(110, 2)}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {makeCell(120, 0)}
          {makeCell(120, 1)}
        </View>
      </View>
    </View>
  );
}
