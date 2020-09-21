import { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";

import { Alert } from "react-native";

import { Accuracy, watchPositionAsync } from "expo-location";

import { LocationContext } from "../store/LocationProvider";

const LOCATION_TASK_NAME = "background-location-task";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(false);
  const { addLocation } = useContext(LocationContext);

  const startWatching = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErr("Permission to access location was denied");
      }
      let position = await Location.getCurrentPositionAsync({});
      if (position) {
        addLocation(position, false);
      }
    } catch (e) {
      Alert.alert("Problem with useLocation hook");
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    }
  }, [shouldTrack, callback]);

  return [err];
};
