import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import constants from "../../constants";

import {
  LocationStateContext,
  LocationContext,
} from "../../store/LocationProvider";
import { set } from "react-native-reanimated";

export const Timer = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const {
    state: { recording, finished },
  } = useContext(LocationStateContext);
  const { cleanup } = useContext(LocationContext);

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
  };

  const stop = () => {
    clearInterval(interv);
  };

  const reset = () => {
    clearInterval(interv);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  useEffect(() => {
    if (recording) {
      start();
    } else {
      stop();
    }
  }, [recording]);

  useEffect(() => {
    if (finished) {
      reset();
    }
    return function cleanupie() {
      cleanup();
    };
  }, [finished]);

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.time}>{time.h >= 10 ? time.h : "0" + time.h} :</Text>
      <Text style={styles.time}>{time.m >= 10 ? time.m : "0" + time.m} :</Text>
      <Text style={styles.time}>{time.s >= 10 ? time.s : "0" + time.s} :</Text>
      <Text style={styles.time}>{time.ms >= 10 ? time.ms : "0" + time.ms}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeContainer: {
    backgroundColor: constants.primary.containerColor,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    borderRadius: 10,
    flexDirection: "row",
  },
  time: {
    padding: "2%",
    color: constants.primary.textColor,
    fontSize: 45,
  },
});
