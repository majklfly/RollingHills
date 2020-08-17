import React from "react";

import { View, Text, StyleSheet } from "react-native";

import MapView, { Polyline } from "react-native-maps";

import { mapStyle } from "../../components/Map/MapStyle";

import constants from "../../constants";

const TrackDetailScreen = ({ route }) => {
  console.log(route.params);
  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{route.params.data.name.stringValue}</Text>
        <MapView style={styles.map} customMapStyle={mapStyle} />
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
  map: {
    width: "80%",
    height: "40%",
    alignSelf: "center",
    marginTop: "5%",
  },
});

export default TrackDetailScreen;
