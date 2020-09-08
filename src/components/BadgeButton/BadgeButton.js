import React, { useContext } from "react";

import { AnimatedCircularProgress } from "react-native-circular-progress";

import { GlobalState, GlobalContext } from "../../store/AuthProvider";

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import constants from "../../constants";

const { width } = Dimensions.get("window");

export const BadgeButton = (props) => {
  const {
    state: { dayMode },
  } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={dayMode ? styles.mainContainerLight : styles.mainContainer}
      testID="BadgeButton"
    >
      <Text style={dayMode ? styles.buttonTitleLight : styles.buttonTitle}>
        {props.title}
      </Text>
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
  mainContainerLight: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: constants.secondary.containerColor,
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
  buttonTitleLight: {
    color: constants.secondary.textColor,
    marginTop: "10%",
    fontFamily: constants.secondary.fontFamily,
    paddingHorizontal: "10%",
    textAlign: "center",
  },
  progressCircle: {
    position: "absolute",
    bottom: "20%",
  },
});
