import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import TracksScreen from "../containers/TracksScreen/TracksScreen";
import TrackDetailScreen from "../containers/TrackDetailScreen/TrackDetailScreen";

const Stack = createStackNavigator();

export const TracksStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tracksListScreen"
        component={TracksScreen}
        options={{ headerTransparent: true, headerTitle: false }}
      />
      <Stack.Screen
        name="trackDetailScreen"
        component={TrackDetailScreen}
        options={{ headerTransparent: true, headerTitle: false }}
      />
    </Stack.Navigator>
  );
};
