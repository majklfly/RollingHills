import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../containers/HomeScreen/HomeScreen";
import ProfileScreen from "../containers/ProfileScreen/ProfileScreen";

const Tabs = createBottomTabNavigator();

export const AppTabs = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="homeScreen" component={HomeScreen} />
      <Tabs.Screen name="profileScreen" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};
