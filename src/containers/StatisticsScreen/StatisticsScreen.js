import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  AsyncStorage,
} from "react-native";

import { Background } from "../../components/Background/Background";
import constants from "../../constants";

import { BarChart } from "react-native-chart-kit";

import { GlobalContext } from "../../store/AuthProvider";

import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";

import {
  calculateTotalDistance,
  calculateAverageSpeed,
  calculateTotalTime,
  displayDistanceChart,
  displayAverageSpeed,
  displayTimeChart,
} from "./utils";

const { width, height } = Dimensions.get("window");

const StatisticsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { fetchData } = useContext(LocationContext);
  const { state } = useContext(LocationStateContext);
  const {
    state: { dayMode },
  } = useContext(GlobalContext);

  useEffect(() => {
    formatTracks(state.tracks);
  }, [state.tracks]);

  const formatTracks = (tracks) => {
    let dataLocal = [];
    if (tracks) {
      tracks.map((track) => {
        const data = track.doc.Xe.proto.mapValue.fields;
        dataLocal.push(data);
      });
    }
    setData(dataLocal);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View testID="statisticsContainer">
      <Background />
      <View style={styles.mainContainer}>
        <Text style={dayMode ? styles.titleLight : styles.title}>
          Your statistics
        </Text>
        <ScrollView>
          <View
            style={dayMode ? styles.chartContainerLight : styles.chartContainer}
          >
            <View style={styles.contentLine}>
              <Text
                style={dayMode ? styles.contentLabelLight : styles.contentLabel}
              >
                Total distance
              </Text>
              <Text
                style={dayMode ? styles.contentDataLight : styles.contentData}
              >
                {data.length > 0 && calculateTotalDistance(data)} metres
              </Text>
            </View>
            <View style={styles.contentLine}>
              <Text
                style={dayMode ? styles.contentLabelLight : styles.contentLabel}
              >
                Total time
              </Text>
              <Text
                style={dayMode ? styles.contentDataLight : styles.contentData}
              >
                {data.length > 0 && calculateTotalTime(data)} seconds
              </Text>
            </View>
            <View style={styles.contentLine}>
              <Text
                style={dayMode ? styles.contentLabelLight : styles.contentLabel}
              >
                Average speed
              </Text>
              <Text
                style={dayMode ? styles.contentDataLight : styles.contentData}
              >
                {data.length > 0 && calculateAverageSpeed(data)} km/h
              </Text>
            </View>
          </View>

          <View
            style={dayMode ? styles.chartContainerLight : styles.chartContainer}
          >
            <Text style={dayMode ? styles.chartTitleLight : styles.chartTitle}>
              Distance
            </Text>
            <BarChart
              data={displayDistanceChart(data)}
              width={Dimensions.get("window").width * 0.86}
              height={220}
              yAxisSuffix="m"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                backgroundGradientFrom: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                backgroundGradientTo: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) =>
                  dayMode
                    ? constants.secondary.textColor
                    : constants.primary.textColor,
                labelColor: (opacity = 1) =>
                  dayMode
                    ? constants.secondary.textColor
                    : constants.primary.textColor,
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
          <View
            style={dayMode ? styles.chartContainerLight : styles.chartContainer}
          >
            <Text style={dayMode ? styles.chartTitleLight : styles.chartTitle}>
              Average Speed
            </Text>
            <BarChart
              data={displayAverageSpeed(data)}
              width={Dimensions.get("window").width * 0.86}
              height={220}
              yAxisSuffix="km/h"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                backgroundGradientFrom: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                backgroundGradientTo: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) =>
                  dayMode
                    ? constants.secondary.textColor
                    : constants.primary.textColor,
                labelColor: (opacity = 1) =>
                  dayMode
                    ? constants.secondary.textColor
                    : constants.primary.textColor,
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
          <View
            style={dayMode ? styles.chartContainerLight : styles.chartContainer}
          >
            <Text style={dayMode ? styles.chartTitleLight : styles.chartTitle}>
              Time
            </Text>
            <BarChart
              data={displayTimeChart(data)}
              width={Dimensions.get("window").width * 0.86}
              height={220}
              yAxisSuffix="s"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                backgroundGradientFrom: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                backgroundGradientTo: dayMode
                  ? constants.secondary.containerColor
                  : constants.primary.containerColor,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) =>
                  dayMode
                    ? constants.secondary.textColor
                    : constants.primary.textColor,
                labelColor: (opacity = 1) =>
                  dayMode
                    ? constants.secondary.textColor
                    : constants.primary.textColor,
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
  chartContainerLight: {
    width: "90%",
    backgroundColor: constants.secondary.containerColor,
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
  titleLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
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
  contentLabelLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
  contentData: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 25,
  },
  contentDataLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 25,
  },
  chartTitle: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 25,
    marginLeft: 20,
    marginTop: 10,
  },
  chartTitleLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 25,
    marginLeft: 20,
    marginTop: 10,
  },
});

export default StatisticsScreen;
