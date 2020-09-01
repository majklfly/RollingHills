import React, { useState, useEffect } from "react";

import { View, Dimensions, StyleSheet, AsyncStorage } from "react-native";

import { LineChart } from "react-native-chart-kit";
import constants from "../../constants";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const SpeedStatistics = (props) => {
  const [dayMode, setDayModeLocal] = useState(null);
  const formatDataset = () => {
    let localDataset = [];
    props.data.locations.arrayValue.values.map((item) => {
      localDataset.push(
        item.mapValue.fields.coords.mapValue.fields.speed.doubleValue
      );
    });
    return [{ data: localDataset }];
  };

  useEffect(() => {
    const retrieveDayMode = async () => {
      const result = await AsyncStorage.getItem("dayMode");
      const value = result === "true" ? true : false;
      setDayModeLocal(value);
    };
    retrieveDayMode();
  });

  const dataset = formatDataset();

  return (
    <View style={styles.mainContainer} testID="mainContainer">
      <LineChart
        data={{
          labels: [
            "10%",
            "20%",
            "30%",
            "40%",
            "50%",
            "60%",
            "70%",
            "80%",
            "90%",
            "100%",
          ],
          datasets: dataset,
        }}
        width={Dimensions.get("window").width - 50}
        height={300}
        yAxisSuffix=" km/h"
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: dayMode
            ? constants.secondary.containerColor
            : constants.primary.containerColor,
          backgroundGradientTo: dayMode
            ? constants.secondary.containerColor
            : constants.primary.containerColor,
          decimalPlaces: 0,
          color: (opacity = 0.4) =>
            dayMode
              ? constants.secondary.textColor
              : constants.primary.textColor,
          labelColor: (opacity = 1) =>
            dayMode
              ? constants.secondary.textColor
              : constants.primary.textColor,
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  chart: {
    marginTop: 0,
  },
});
