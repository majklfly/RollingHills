import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthStack } from "./AuthStack";
import { AppTabs } from "./AppTabs";

import { ActivityIndicator, AsyncStorage } from "react-native";
import { AuthContext } from "../store/AuthProvider";

export const Routes = ({}) => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      setLoading(false);
      setUser(user);
    });
  });

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
