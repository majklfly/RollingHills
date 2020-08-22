import React, { useContext, useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import {
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Button,
} from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { LocationStateContext } from "../../store/LocationProvider";
import { mapStyle } from "./MapStyle";

import * as TaskManager from "expo-task-manager";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Map = () => {
  const {
    state: { currentLocation, locations, mockRunning },
  } = useContext(LocationStateContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 150 }} />;
  }

  const tenMetersWithDegrees = 0.0001;

  let getLocation = (increment) => {
    return {
      timestamp: 1000000,
      coords: {
        speed: Math.random() * 20,
        heading: 0,
        accuracy: 5,
        altitudeAccuracy: 5,
        altitude: 5,
        longitude: -0.205746 + increment * tenMetersWithDegrees,
        latitude: 51.473506 + increment * tenMetersWithDegrees,
      },
    };
  };

  let counter = 0;

  let timer = () => {
    Location.EventEmitter.emit("Expo.locationChanged", {
      watchId: Location._getCurrentWatchId(),
      location: getLocation(counter),
    });
    counter++;
  };

  useEffect(() => {
    const interval = setInterval(timer, 1000);
    if (mockRunning === false) {
      console.log(window);
      clearInterval(interval);
    }
  }, [mockRunning]);

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: "90%",
    elevation: 10,
  },
});
