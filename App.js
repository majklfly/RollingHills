import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./containers/LoginScreen";

export default function App() {
  return (
    <View>
      <LoginScreen />
    </View>
  );
}
