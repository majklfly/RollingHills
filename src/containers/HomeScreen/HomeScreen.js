import React, { useContext, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AuthContext, GlobalContext } from "../../store/AuthProvider";
import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";
import useLocation from "../../hooks/useLocation";

import { Background } from "../../components/Background/Background";
import { Map } from "../../components/Map/Map";
import { Timer } from "../../components/Timer/Timer";
import constants from "../../constants";

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const {
    state: { user },
  } = useContext(GlobalContext);
  const {
    addLocation,
    startRecording,
    stopRecording,
    runFinished,
  } = useContext(LocationContext);
  const {
    state: { recording },
  } = useContext(LocationStateContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(true, callback);

  return (
    <>
      <Background />
      <View style={styles.container}>
        {user.displayName ? (
          <Text style={styles.greeting}>Hello, {user.displayName}</Text>
        ) : (
          <>{logout()}</>
        )}
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <Timer />
        {recording ? (
          <View style={styles.pauseContainer}>
            <TouchableOpacity
              onPress={() => runFinished()}
              style={styles.pauseButton}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stopRecording()}
              style={styles.pauseButton}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => startRecording()}
            style={styles.recordButton}
          >
            <Text style={styles.buttonText}>Run</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logout: {
    alignSelf: "center",
    marginTop: "50%",
    backgroundColor: "red",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    elevation: 100,
  },
  greeting: {
    fontSize: 30,
    color: constants.primary.textColor,
    width: "100%",
    left: "10%",
    marginTop: "30%",
    fontFamily: constants.primary.fontFamily,
  },
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mapContainer: {
    width: "95%",
    height: "40%",
    backgroundColor: constants.primary.containerColor,
    borderRadius: 10,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    marginTop: "10%",
    width: 300,
    height: 50,
    backgroundColor: constants.primary.buttonColor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 17,
  },
  pauseContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    marginTop: "10%",
  },
  pauseButton: {
    width: 150,
    height: 50,
    backgroundColor: constants.primary.buttonColor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
});

export default HomeScreen;
