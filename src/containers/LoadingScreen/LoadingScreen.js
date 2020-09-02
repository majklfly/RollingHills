import React from "react";

import { View, Text, StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.mainContainer} testID="loadingScreen">
      <Text>LoadingScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default LoadingScreen;
