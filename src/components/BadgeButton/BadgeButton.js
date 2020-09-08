import React from "react";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";

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
      <AnimatedCircularProgress
        size={60}
        width={15}
        fill={props.percentage}
        tintColor="#00e0ff"
        onAnimationComplete={() => {}}
        backgroundColor="#3d5875"
        style={styles.progressCircle}
      />
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
  progressCircle: {
    position: "absolute",
    bottom: "20%",
  },
});
