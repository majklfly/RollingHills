import React from "react";

import { View, Text, StyleSheet } from "react-native";

import constants from "../../constants";

import { TrackDetailFlatList } from "../../components/TrackDetailFlatList/TrackDetailFlatList";

const TrackDetailScreen = ({ route }) => {
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

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{route.params.data.name.stringValue}</Text>
        <TrackDetailFlatList route={route} />
        <View style={styles.dataContainer}>
          <Text style={styles.datalabel}>Date:</Text>
          <Text style={styles.dataContent}>
            {route.params.data.date.stringValue.split("GMT")[0]}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.datalabel}>Distance:</Text>
          <Text style={styles.dataContent}>
            {route.params.data.distance.integerValue} meters
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.datalabel}>Time:</Text>
          <Text style={styles.dataContent}>
            {formatTime(route.params.data.time.integerValue)} seconds
          </Text>
        </View>
      </View>
    </>
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
  title: {
    alignSelf: "center",
    fontSize: 30,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    marginTop: "20%",
  },

  dataContainer: {
    width: "100%",
    height: "6%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datalabel: {
    fontSize: 20,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  dataContent: {
    fontSize: 20,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
});

export default TrackDetailScreen;
