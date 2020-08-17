import React from "react";

import { View, Text, StyleSheet } from "react-native";

import MapView, { Polyline } from "react-native-maps";

import { mapStyle } from "../../components/Map/MapStyle";

import constants from "../../constants";

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

  const formatCoordinates = (loc) => {
    const latitude =
      loc.mapValue.fields.coords.mapValue.fields.latitude.doubleValue;
    const longitude =
      loc.mapValue.fields.coords.mapValue.fields.longitude.doubleValue;
    return { latitude: latitude, longitude: longitude };
  };

  const initialCoords = route.params.data.locations.arrayValue.values[0];
  const initialLatitude =
    initialCoords.mapValue.fields.coords.mapValue.fields.latitude.doubleValue;
  const initialLongitude =
    initialCoords.mapValue.fields.coords.mapValue.fields.longitude.doubleValue;

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{route.params.data.name.stringValue}</Text>
        {route.params.data.locations.arrayValue.values.length > 0 ? (
          <MapView
            style={styles.map}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: initialLatitude,
              longitude: initialLongitude,
              longitudeDelta: 0.01,
              latitudeDelta: 0.01,
            }}
          >
            {route.params.data.locations.arrayValue.values && (
              <Polyline
                coordinates={route.params.data.locations.arrayValue.values.map(
                  (loc) => formatCoordinates(loc)
                )}
                strokeWidth={4}
                strokeColor="rgba(158,158,255,1)"
              />
            )}
          </MapView>
        ) : null}

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
  map: {
    width: "80%",
    height: "40%",
    alignSelf: "center",
    marginTop: "5%",
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
