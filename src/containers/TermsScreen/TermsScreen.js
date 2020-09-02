import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const TermsScreen = () => {
  return (
    <View testID="termsContainer">
      <Text>TermsScreen</Text>
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#eee",
          }}
          source={require("../../../assets/28141-sate-traveling.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    width: 500,
    height: 500,
    backgroundColor: "blue",
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default TermsScreen;
