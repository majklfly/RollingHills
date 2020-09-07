import React from "react";

import { View, ScrollView, StyleSheet, Dimensions } from "react-native";

import { Background } from "../../components/Background/Background";
import { BadgeButton } from "../../components/BadgeButton/BadgeButton";

import constants from "../../constants";

const { width, height } = Dimensions.get("window");

const ProgressScreen = () => {
  return (
    <View>
      <Background />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.row}>
          <BadgeButton title="downloaded App" />
          <BadgeButton title="run 1 hour" />
        </View>
        <View style={styles.row}>
          <BadgeButton title="run once per week" />
          <BadgeButton title="run 3 hours" />
        </View>
        <View style={styles.row}>
          <BadgeButton title="run 5km" />
          <BadgeButton title="run twice per week" />
        </View>
        <View style={styles.row}>
          <BadgeButton title="run 10km" />
          <BadgeButton title="run everyday for one week" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width * 0.9,
    height: height * 0.8,
    position: "absolute",
    alignSelf: "center",
    marginTop: "20%",
    borderRadius: 20,
    backgroundColor: constants.primary.containerColor,
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
  },
});

export default ProgressScreen;
