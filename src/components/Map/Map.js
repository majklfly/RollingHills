import "../../_mockLocation";
import React, { useState, useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { LocationStateContext } from "../../store/LocationProvider";

import * as TaskManager from "expo-task-manager";

export const Map = () => {
  const [location, setLocation] = useState(null);
  const {
    state: { currentLocation },
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
    >
      <Circle
        center={currentLocation.coords}
        radius={10}
        strokeColor="rgba(158,158,255,1)"
        fillColor="rgba(158,158,255,0.3)"
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
