import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./AuthStack";
import { AppTabs } from "./AppTabs";

import { AsyncStorage } from "react-native";
import { GlobalContext } from "../store/AuthProvider";

export const Routes = ({}) => {
  const { state } = useContext(GlobalContext);
  const { user } = state;

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
