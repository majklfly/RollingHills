// import "../../_mockLocation";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { watchPositionAsync, Accuracy } from "expo-location";

export const Map = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          console.log(location);
        }
      );
    })();
  }, []);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 51.473506,
        longitude: -0.205746,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    ></MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: "90%",
    elevation: 10,
  },
});
