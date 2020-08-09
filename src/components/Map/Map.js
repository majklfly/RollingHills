import React, { useState, useEffect } from "react";

import { StyleSheet } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

export const Map = () => {
  const [location, setLocation] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.33233,
        longitude: -122.03121,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Polyline />
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
