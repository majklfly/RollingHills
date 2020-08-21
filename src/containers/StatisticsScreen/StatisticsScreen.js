import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

import { Background } from "../../components/Background/Background";
import constants from "../../constants";

import { BarChart } from "react-native-chart-kit";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const StatisticsScreen = () => {
  return (
    <View>
      <Background />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Your statistics</Text>
        <ScrollView>
          <View style={styles.chartContainer}>
            <View style={styles.contentLine}>
              <Text style={styles.contentLabel}>Total distance</Text>
              <Text style={styles.contentData}>some data</Text>
            </View>
            <View style={styles.contentLine}>
              <Text style={styles.contentLabel}>Total time</Text>
              <Text style={styles.contentData}>some data</Text>
            </View>
            <View style={styles.contentLine}>
              <Text style={styles.contentLabel}>Average speed</Text>
              <Text style={styles.contentData}>some data</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Distance</Text>
            <BarChart
              data={{
                labels: ["15/6", "12/6", "14/6", "8/6", "4/6", "2/6"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.86}
              height={220}
              yAxisSuffix="m"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: constants.primary.containerColor,
                backgroundGradientFrom: constants.primary.containerColor,
                backgroundGradientTo: constants.primary.containerColor,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 5,
                padding: 5,
                alignSelf: "center",
              }}
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Average Speed</Text>
            <BarChart
              data={{
                labels: ["15/6", "12/6", "14/6", "8/6", "4/6", "2/6"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.86}
              height={220}
              yAxisSuffix="km/h"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: constants.primary.containerColor,
                backgroundGradientFrom: constants.primary.containerColor,
                backgroundGradientTo: constants.primary.containerColor,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 5,
                padding: 5,
                alignSelf: "center",
              }}
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Time</Text>
            <BarChart
              data={{
                labels: ["15/6", "12/6", "14/6", "8/6", "4/6", "2/6"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width * 0.86}
              height={220}
              yAxisSuffix="s"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: constants.primary.containerColor,
                backgroundGradientFrom: constants.primary.containerColor,
                backgroundGradientTo: constants.primary.containerColor,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 5,
                padding: 5,
                alignSelf: "center",
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height * 0.85,
    top: "3%",
    alignSelf: "center",
    position: "absolute",
  },
  chartContainer: {
    width: "90%",
    backgroundColor: constants.primary.containerColor,
    height: 300,
    alignSelf: "center",
    borderRadius: 15,
    marginVertical: 10,
  },
  title: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 35,
    alignSelf: "center",
    marginBottom: "5%",
  },
  contentLine: {
    width: "100%",
    width: "90%",
    alignSelf: "center",
    marginTop: "5%",
  },
  contentLabel: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  contentData: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 25,
  },
  chartTitle: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 25,
    marginLeft: 20,
    marginTop: 10,
  },
});

export default StatisticsScreen;
