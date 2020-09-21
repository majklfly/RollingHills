import { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";

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
      addLocation(position, false);
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 10,
      });
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        callback
      );
      setSubscriber(sub);
    } catch (e) {
      setErr(e.message);
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
