import React, { useContext, useState, useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../containers/HomeScreen/HomeScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { AuthContext, GlobalContext } from "../store/AuthProvider";
import constants from "../constants";

import { Switch, View, AsyncStorage } from "react-native";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const { logout, setDayMode } = useContext(AuthContext);
  const {
    state: { dayMode },
  } = useContext(GlobalContext);
  const [isEnabled, setIsEnabled] = useState(null);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    if (isEnabled !== null) {
      AsyncStorage.setItem("dayMode", isEnabled.toString());
      setDayMode(isEnabled);
    }
  }, [isEnabled]);

  useEffect(() => {
    dayMode ? setIsEnabled(true) : setIsEnabled(false);
  }, [dayMode]);

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
                <FontAwesome
                  name="sign-out-alt"
                  size={30}
                  color={
                    dayMode
                      ? constants.secondary.textColor
                      : constants.primary.textColor
                  }
                />
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <View style={{ marginLeft: 10 }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            );
          },
          headerTransparent: true,
          headerTitle: false,
        }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
