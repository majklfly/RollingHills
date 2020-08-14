import { useState, useEffect } from "react";
import * as Location from "expo-location";

import { Accuracy, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(false);

  const startWatching = () => {
    try {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
        setSubscriber(sub);
      })();
    } catch (e) {
      setErr(e);
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
