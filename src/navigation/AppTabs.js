import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import { HomeStack } from "./HomeStack";
import { TracksStack } from "./TracksStack";
import ProfileScreen from "../containers/ProfileScreen/ProfileScreen";
import StatisticsScreen from "../containers/StatisticsScreen/StatisticsScreen";
import ProgressScreen from "../containers/ProgressScreen/ProgressScreen";

import constants from "../constants";

import { GlobalContext } from "../store/AuthProvider";

const Tabs = createBottomTabNavigator();

export const AppTabs = () => {
  const {
    state: { dayMode },
  } = useContext(GlobalContext);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "homeScreen") {
            iconName = "home";
          } else if (route.name === "profileScreen") {
            iconName = focused ? "user-alt" : "user";
          } else if (route.name === "Tracks") {
            iconName = "running";
          } else if (route.name === "Statistics") {
            iconName = "clipboard-list";
          } else if (route.name === "progressScreen") {
            iconName = focused ? "star-half" : "star-half-alt";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: dayMode
          ? constants.secondary.activeTextColor
          : constants.primary.activeTextColor,
        inactiveTintColor: dayMode
          ? constants.secondary.textColor
          : constants.primary.textColor,
        showLabel: false,
        style: {
          opacity: 0.5,
          position: "absolute",
          backgroundColor: dayMode
            ? constants.secondary.containerColor
            : constants.primary.containerColor,
          border: "none",
          borderRadius: 15,
          marginBottom: "5%",
          width: "96%",
          marginLeft: "2%",
        },
      }}
    >
      <Tabs.Screen name="homeScreen" component={HomeStack} />
      <Tabs.Screen name="Tracks" component={TracksStack} />
      <Tabs.Screen name="Statistics" component={StatisticsScreen} />
      <Tabs.Screen name="profileScreen" component={ProfileScreen} />
      <Tabs.Screen name="progressScreen" component={ProgressScreen} />
    </Tabs.Navigator>
  );
};
