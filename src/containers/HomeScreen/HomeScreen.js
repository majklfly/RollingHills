import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../store/AuthProvider";

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => logout()} style={styles.logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    alignSelf: "center",
    marginTop: "50%",
    backgroundColor: "red",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
