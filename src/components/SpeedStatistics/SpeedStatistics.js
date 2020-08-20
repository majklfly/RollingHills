import React from "react";

import { View, Text, Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const SpeedStatistics = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>SpeedStatistics</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: 300,
    backgroundColor: "red",
  },
});
