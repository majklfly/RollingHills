import React, { useState, useEffect } from "react";

import { View, Dimensions, StyleSheet, AsyncStorage } from "react-native";

import { LineChart } from "react-native-chart-kit";
import constants from "../../constants";

import { GlobalContext } from "../../store/AuthProvider";

const { width } = Dimensions.get("window");

export const SpeedStatistics = (props) => {
  const {
    state: { dayMode },
  } = useContext(GlobalContext);

  const formatDataset = () => {
    let localDataset = [];
    props.data.locations.arrayValue.values.map((item) => {
      localDataset.push(
        item.mapValue.fields.coords.mapValue.fields.speed.doubleValue
      );
    });
    return [{ data: localDataset }];
  };

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
            r: "0",
            strokeWidth: "0",
            stroke: "#ffa726",
          },
          propsForBackgroundLines: {
            stroke: "transparent",
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
