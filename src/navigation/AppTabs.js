import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import { HomeStack } from "./HomeStack";
import { TracksStack } from "./TracksStack";
import ProfileScreen from "../containers/ProfileScreen/ProfileScreen";
import StatisticsScreen from "../containers/StatisticsScreen/StatisticsScreen";

import constants from "../constants";

const Tabs = createBottomTabNavigator();

import { GlobalContext } from "../store/AuthProvider";

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
    </Tabs.Navigator>
  );
};
