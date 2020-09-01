import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import constants from "../../constants";
import { AsyncStorage } from "@react-native-community/async-storage";

import {
  LocationStateContext,
  LocationContext,
} from "../../store/LocationProvider";
import { TimerActionContext } from "../../store/TimerProvider";

export const Timer = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [totalTime, setTotalTime] = useState({ total: 0 });
  const [totalInterv, setTotalInterv] = useState();
  const [dayMode, setDayModeLocal] = useState(false);
  const [interv, setInterv] = useState();
  const {
    state: { recording, finished },
  } = useContext(LocationStateContext);
  const { cleanup } = useContext(LocationContext);
  const { timerFinished } = useContext(TimerActionContext);

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  var updatedTotalTime = totalTime.total;

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
    setTotalInterv(setInterval(countTotal, 10));
  };

  const stop = () => {
    clearInterval(interv);
    clearInterval(totalInterv);
  };

  const reset = () => {
    clearInterval(interv);
    clearInterval(totalInterv);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setTotalTime({ total: 0 });
  };

  const countTotal = () => {
    updatedTotalTime++;
    setTotalTime({ total: updatedTotalTime });
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
      timerFinished(totalTime.total);
      reset();
    }
    return function cleanupie() {
      cleanup();
    };
  }, [finished]);

  useEffect(() => {
    const retrieveDayMode = async () => {
      const result = await AsyncStorage.getItem("dayMode");
      const value = result === "true" ? true : false;
      setDayModeLocal(value);
    };
    retrieveDayMode();
  });

  return (
    <View
      style={dayMode ? styles.timeContainerLight : styles.timeContainer}
      testID="timerContainer"
    >
      <Text style={dayMode ? styles.timeLight : styles.time}>
        {time.h >= 10 ? time.h : "0" + time.h} :
      </Text>
      <Text style={dayMode ? styles.timeLight : styles.time}>
        {time.m >= 10 ? time.m : "0" + time.m} :
      </Text>
      <Text style={dayMode ? styles.timeLight : styles.time}>
        {time.s >= 10 ? time.s : "0" + time.s} :
      </Text>
      <Text style={dayMode ? styles.timeLight : styles.time}>
        {time.ms >= 10 ? time.ms : "0" + time.ms}
      </Text>
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
  timeContainerLight: {
    backgroundColor: constants.secondary.containerColor,
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
  timeLight: {
    padding: "2%",
    color: constants.secondary.textColor,
    fontSize: 45,
  },
});
