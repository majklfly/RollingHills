import React, { useContext, useEffect, useState, useCallback } from "react";
import { StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { LocationStateContext } from "../../store/LocationProvider";
import { mapStyle } from "./MapStyle";

import * as TaskManager from "expo-task-manager";

export const Map = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    state: { currentLocation, locations, mockRunning },
  } = useContext(LocationStateContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 150 }} />;
  }

  const onRefresh = useCallback(() => {
    console.log("triggered");
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [mockRunning]);

  console.log(mockRunning);

  useEffect(() => {
    mockRunning ? (
      require("../../_mockLocation")
    ) : (
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    );
  }, [mockRunning]);

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
