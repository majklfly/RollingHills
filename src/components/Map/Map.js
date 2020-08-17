import "../../_mockLocation";
import React, { useState, useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { LocationStateContext } from "../../store/LocationProvider";
import { mapStyle } from "./MapStyle";

import * as TaskManager from "expo-task-manager";

export const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationStateContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 150 }} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }}
      region={{
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }}
      customMapStyle={mapStyle}
    >
      <Circle
        center={currentLocation.coords}
        radius={10}
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,0.3)"
      />
      <Polyline
        coordinates={locations.map((loc) => loc.coords)}
        strokeWidth={4}
        strokeColor="rgba(158,158,255,1)"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: "90%",
    elevation: 10,
  },
});
