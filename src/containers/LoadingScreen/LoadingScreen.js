import React from "react";

import { View, Text, Stylesheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.mainContainer}>
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
