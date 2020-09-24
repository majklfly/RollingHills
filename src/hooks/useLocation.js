import { useState, useEffect, useContext, useRef } from "react";
import * as Location from "expo-location";

import { Alert } from "react-native";

import { Accuracy, watchPositionAsync } from "expo-location";

import { LocationContext } from "../store/LocationProvider";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(false);
  const { addLocation } = useContext(LocationContext);
  const isMounted = useRef(false);

  const startWatching = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }
      let position = await Location.getCurrentPositionAsync({});
      if (position) {
        addLocation(position, false);
      }
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        callback
      );
      setSubscriber(sub);
    } catch (e) {
      Alert.alert("Problem with useLocation");
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      startWatching();
    } else {
      subscriber.remove();
    }
    return () => {
      isMounted.current = true;
    };
  }, []);

  return [err];
};
