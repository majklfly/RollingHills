import { useState, useEffect } from "react";
import * as Location from "expo-location";

import { Accuracy, watchPositionAsync } from "expo-location";

export default (callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    try {
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
          callback
        );
      })();
    } catch (e) {
      setErr(e);
    }
  }, []);

  return [err];
};
