import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../containers/HomeScreen/HomeScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../store/AuthProvider";
import constants from "../constants";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => logout()}
              >
                <FontAwesome name="sign-out-alt" size={30} color="white" />
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => logout()}
              >
                <FontAwesome name="ellipsis-v" size={30} color="white" />
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: constants.primary.containerColor,
            opacity: 0.6,
          },
          headerTransparent: true,
          headerTitle: false,
        }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
