import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../containers/LoginScreen/LoginScreen";
import TermsScreen from "../containers/TermsScreen/TermsScreen";

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
