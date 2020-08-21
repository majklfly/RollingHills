import React, { useState, useEffect } from "react";

import { View, Dimensions, StyleSheet } from "react-native";

import { LineChart } from "react-native-chart-kit";
import constants from "../../constants";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const SpeedStatistics = (props) => {
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
    <View style={styles.mainContainer}>
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
          backgroundGradientFrom: constants.primary.containerColor,
          backgroundGradientTo: constants.primary.containerColor,
          decimalPlaces: 0,
          color: (opacity = 0.4) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
