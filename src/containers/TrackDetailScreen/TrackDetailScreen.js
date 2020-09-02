import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, AsyncStorage } from "react-native";

import constants from "../../constants";

import { TrackDetailFlatList } from "../../components/TrackDetailFlatList/TrackDetailFlatList";

const TrackDetailScreen = ({ route }) => {
  const [dayMode, setDayModeLocal] = useState(null);
  const formatTime = (time) => {
    const seconds = Math.round(time / 60);
    if (seconds < 60) {
      return seconds;
    } else {
      const minutes = Math.round(seconds / 60);
      const modulo = seconds % 60;
      const formatedTime = minutes + "m" + " " + modulo;
      return formatedTime;
    }
  };

  useEffect(() => {
    let mounted = true;
    const retrieveDayMode = async () => {
      const result = await AsyncStorage.getItem("dayMode");
      const value = result === "true" ? true : false;
      setDayModeLocal(value);
    };
    if (mounted) {
      retrieveDayMode();
    }
    return () => (mounted = false);
  });

  return (
    <View
      key={route.params.data.time.integerValue}
      style={dayMode ? styles.mainContainerLight : styles.mainContainer}
      testID="trackDetailContainer"
    >
      <View>
        <Text style={dayMode ? styles.titleLight : styles.title}>
          {route.params.data.name.stringValue}
        </Text>
        <TrackDetailFlatList route={route} />
        <View style={styles.dataContainer}>
          <Text style={dayMode ? styles.datalabelLight : styles.datalabel}>
            Date:
          </Text>
          <Text style={dayMode ? styles.dataContentLight : styles.dataContent}>
            {route.params.data.date.stringValue.split("GMT")[0]}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={dayMode ? styles.datalabelLight : styles.datalabel}>
            Distance:
          </Text>
          <Text style={dayMode ? styles.dataContentLight : styles.dataContent}>
            {route.params.data.distance.integerValue} meters
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={dayMode ? styles.datalabelLight : styles.datalabel}>
            Time:
          </Text>
          <Text style={dayMode ? styles.dataContentLight : styles.dataContent}>
            {formatTime(route.params.data.time.integerValue)} seconds
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: constants.primary.containerColor,
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  mainContainerLight: {
    backgroundColor: constants.secondary.containerColor,
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    marginTop: "20%",
  },
  titleLight: {
    alignSelf: "center",
    fontSize: 30,
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    marginTop: "20%",
  },
  dataContainer: {
    width: "95%",
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  datalabel: {
    fontSize: 20,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  datalabelLight: {
    fontSize: 20,
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
  dataContent: {
    fontSize: 20,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  dataContentLight: {
    fontSize: 20,
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
});

export default TrackDetailScreen;
