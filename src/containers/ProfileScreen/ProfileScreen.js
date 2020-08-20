import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

import { Background } from "../../components/Background/Background";

import { GlobalContext } from "../../store/AuthProvider";
import constants from "../../constants";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProfileScreen = () => {
  const {
    state: { user },
  } = useContext(GlobalContext);

  console.log(user.createdAt);

  return (
    <View>
      <Background />
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          <Text style={styles.title}>{user.displayName}</Text>
          <View style={styles.contentLine}>
            <Text style={styles.contentLabel}>last login</Text>
            <Text style={styles.contentData}>{user.lastLoginAt}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 30,
    alignSelf: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: "-10%",
    borderRadius: 100,
  },
  contentContainer: {
    width: "90%",
    height: height * 0.7,
    marginTop: height * 0.15,
    backgroundColor: constants.primary.containerColor,
    alignSelf: "center",
    borderRadius: 20,
  },
  contentLine: {
    width: "100%",
    width: "90%",
    alignSelf: "center",
    marginTop: "5%",
  },
  contentLabel: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  contentData: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
});

export default ProfileScreen;
