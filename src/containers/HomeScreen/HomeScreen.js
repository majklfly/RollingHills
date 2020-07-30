import React, { useContext } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../store/AuthProvider";

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
