import React, { useContext, useState } from "react";

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

export const FinishedRunForm = (props) => {
  const [name, setName] = useState("");
  const {
    state: { time },
  } = useContext(TimerStateContext);
  const {
    state: { distance },
  } = useContext(LocationStateContext);
  const { submitResults } = useContext(LocationContext);

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
    submitResults(distance, Date(), time, name);
    props.setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Distance: </Text>
        <Text style={styles.dataText}>{distance} meters</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Date: </Text>
        <Text style={styles.dataText}>{formatDate()}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Duration: </Text>
        <Text style={styles.dataText}>{formatTime(time)}s</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Name: </Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        onPress={() => submitData()}
        style={styles.submitButton}
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
  submitButton: {
    backgroundColor: constants.primary.buttonColor,
    width: "60%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
});
