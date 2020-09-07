import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import constants from "../../constants";

const { width, height } = Dimensions.get("window");

export const BadgeButton = (props) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <Text style={styles.buttonTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: constants.primary.containerColor,
    margin: "3%",
    borderRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  buttonTitle: {
    color: constants.primary.textColor,
    marginTop: "10%",
    fontFamily: constants.primary.fontFamily,
    paddingHorizontal: "10%",
    textAlign: "center",
  },
});
