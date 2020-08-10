import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext, GlobalContext } from "../../store/AuthProvider";
import { LocationContext } from "../../store/LocationProvider";
import { Background } from "../../components/Background/Background";
import constants from "../../constants";
import { Map } from "../../components/Map/Map";

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const { state } = useContext(GlobalContext);
  const { startRecording } = useContext(LocationContext);
  const { user } = state;

  return (
    <>
      <Background />
      <View style={styles.container}>
        {user.displayName ? (
          <Text style={styles.greeting}>Hello, {user.displayName}</Text>
        ) : (
          <Text style={styles.greeting}>Please login</Text>
        )}
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <Text>00.00.00.00</Text>
        <TouchableOpacity
          onPress={() => startRecording()}
          style={styles.recordButton}
        >
          <Text>Start recording</Text>
        </TouchableOpacity>
      </View>
    </>
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
    zIndex: 100,
    elevation: 100,
  },
  greeting: {
    fontSize: 30,
    color: constants.primary.textColor,
    width: "100%",
    left: "10%",
    marginTop: "30%",
    fontFamily: constants.primary.fontFamily,
  },
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mapContainer: {
    width: "95%",
    height: "40%",
    backgroundColor: constants.primary.containerColor,
    borderRadius: 10,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    width: 200,
    height: 100,
    backgroundColor: "red",
  },
});

export default HomeScreen;
