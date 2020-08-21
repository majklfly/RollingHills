import React, { useContext, useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Switch } from "react-native";
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
import { FinishedRunForm } from "../../components/FinishedRunForm/FinishedRunForm";
import constants from "../../constants";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [latitude1, setLatitude1] = useState(null);
  const [longitude1, setLongitude1] = useState(null);
  const [latitude2, setLatitude2] = useState(null);
  const [longitude2, setLongitude2] = useState(null);
  const [status, setStatus] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { logout } = useContext(AuthContext);
  const {
    state: { user },
  } = useContext(GlobalContext);
  const {
    addLocation,
    startRecording,
    stopRecording,
    runFinished,
    mockMovement,
  } = useContext(LocationContext);
  const {
    state: { recording, locations },
  } = useContext(LocationStateContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording, status]
  );

  useEffect(() => {
    mockMovement(isEnabled);
  }, [isEnabled]);

  const [err] = useLocation(true, callback);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <Background />
      <View style={styles.container}>
        {user.displayName ? (
          <Text style={styles.greeting}>Hello, {user.displayName}</Text>
        ) : (
          <Text style={styles.greeting}>{logout()}</Text>
        )}
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <View style={styles.mockContainer}>
          <Text style={styles.mockText}>Mock movement</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={isEnabled}
            thumbColor={isEnabled ? constants.primary.buttonColor : "#f4f3f4"}
          />
        </View>
        <Timer />
        {recording ? (
          <View style={styles.pauseContainer}>
            <TouchableOpacity
              onPress={() => (setModalVisible(true), runFinished(locations))}
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
        {modalVisible && (
          <Modal animationType="fade" transparent={true}>
            <FinishedRunForm setModalVisible={setModalVisible} />
          </Modal>
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
  mockContainer: {
    width: "90%",
    height: 50,
    marginTop: "5%",
    backgroundColor: constants.primary.containerColor,
    borderRadius: 5,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  mockText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 18,
    alignSelf: "center",
  },
  recordButton: {
    marginTop: "5%",
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
    marginTop: "5%",
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
