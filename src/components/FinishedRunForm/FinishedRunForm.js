import React, { useContext, useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import constants from "../../constants";

import { TimerStateContext } from "../../store/TimerProvider";
import {
  LocationStateContext,
  LocationContext,
} from "../../store/LocationProvider";

import { AuthContext, GlobalContext } from "../../store/AuthProvider";

export const FinishedRunForm = (props) => {
  const [name, setName] = useState("");
  const [locs, setLocs] = useState([]);
  const {
    state: { time },
  } = useContext(TimerStateContext);
  const {
    state: { distance, locations },
  } = useContext(LocationStateContext);
  const { submitResults } = useContext(LocationContext);

  const { dispatchErrorMessage } = useContext(AuthContext);
  const {
    state: { errorMessage, dayMode },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (locations.length > 1) {
      setLocs(locations);
    }
  }, [locations]);

  const formatTime = (time) => {
    const seconds = Math.round(time / 60);
    if (seconds < 60) {
      return seconds;
    } else {
      const minutes = Math.round(seconds / 60);
      const modulo = seconds % 60;
      const formatedTime = minutes + "m" + " " + modulo;
      return formatedTime;
    }
  };

  const formatDate = () => {
    const date = Date();
    const day = date.split(" ")[0];
    const month = date.split(" ")[1];
    const number = date.split(" ")[2];
    const year = date.split(" ")[3];
    const formatedDate = month + " " + number + " " + year;
    return formatedDate;
  };

  const submitData = () => {
    if (name.length > 1) {
      submitResults(distance, Date(), time, name, locs);
      props.setModalVisible(false);
    }
    dispatchErrorMessage("please enter name");
  };

  return (
    <View style={dayMode ? styles.containerLight : styles.container}>
      <View style={styles.dataContainer}>
        <Text style={dayMode ? styles.dataTextLight : styles.dataText}>
          Distance:{" "}
        </Text>
        <Text style={dayMode ? styles.dataTextLight : styles.dataText}>
          {distance} meters
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={dayMode ? styles.dataTextLight : styles.dataText}>
          Date:{" "}
        </Text>
        <Text style={dayMode ? styles.dataTextLight : styles.dataText}>
          {formatDate()}
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={dayMode ? styles.dataTextLight : styles.dataText}>
          Duration:{" "}
        </Text>
        <Text style={dayMode ? styles.dataTextLight : styles.dataText}>
          {formatTime(time)}s
        </Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={dayMode ? styles.dataTextLight : styles.dataText}>
          Name:{" "}
        </Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={dayMode ? styles.inputLight : styles.input}
        />
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity
        onPress={() => submitData()}
        style={dayMode ? styles.submitButtonLight : styles.submitButton}
      >
        <Text>submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.primary.containerColor,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLight: {
    flex: 1,
    backgroundColor: constants.secondary.containerColor,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: constants.primary.buttonColor,
    width: "60%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  submitButtonLight: {
    backgroundColor: constants.secondary.buttonColor,
    width: "60%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 20,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    marginVertical: 20,
  },
  dataText: {
    fontSize: 25,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  dataTextLight: {
    fontSize: 25,
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
  input: {
    width: "60%",
    height: 40,
    marginBottom: "10%",
    textAlign: "center",
    borderBottomColor: constants.primary.textColor,
    borderBottomWidth: 1,
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    textDecorationLine: "none",
    fontSize: 18,
  },
  inputLight: {
    width: "60%",
    height: 40,
    marginBottom: "10%",
    textAlign: "center",
    borderBottomColor: constants.secondary.textColor,
    borderBottomWidth: 1,
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    textDecorationLine: "none",
    fontSize: 18,
  },
  errorMessage: {
    color: "red",
    fontFamily: constants.primary.fontFamily,
    position: "relative",
    top: -30,
  },
});
