import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  AsyncStorage,
} from "react-native";
import moment from "moment";

import { Background } from "../../components/Background/Background";
import { UpdatePasswordForm } from "../../components/UpdatePasswordForm/UpdatePasswordForm";

import { GlobalContext } from "../../store/AuthProvider";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    state: { user, dayMode },
  } = useContext(GlobalContext);

  const formatDate = (date) => {
    return moment(new Date(parseInt(date))).format("DD/MM/YYYY");
  };

  return (
    <View testID="profileContainer">
      <Background />
      <View style={styles.mainContainer}>
        <View
          style={
            dayMode ? styles.contentContainerLight : styles.contentContainer
          }
        >
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          <Text style={dayMode ? styles.titleLight : styles.title}>
            {user.displayName}
          </Text>
          <View style={styles.contentLine}>
            <Text
              style={dayMode ? styles.contentLabelLight : styles.contentLabel}
            >
              Joined us
            </Text>
            <Text
              style={dayMode ? styles.contentDataLight : styles.contentData}
            >
              {formatDate(user.createdAt)}
            </Text>
          </View>
          <View style={styles.contentLine}>
            <Text
              style={dayMode ? styles.contentLabelLight : styles.contentLabel}
            >
              last login
            </Text>
            <Text
              style={dayMode ? styles.contentDataLight : styles.contentData}
            >
              {formatDate(user.lastLoginAt)}
            </Text>
          </View>
          <View style={styles.contentLine}>
            <TouchableOpacity
              style={
                dayMode ? styles.passwordButtonLight : styles.passwordButton
              }
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={
                  dayMode
                    ? styles.passwordButtonTextLight
                    : styles.passwordButtonText
                }
              >
                update Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <UpdatePasswordForm setModalVisible={setModalVisible} />
      </Modal>
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
  titleLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
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
  contentContainerLight: {
    width: "90%",
    height: height * 0.7,
    marginTop: height * 0.15,
    backgroundColor: constants.secondary.containerColor,
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
  contentLabelLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
  contentData: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 25,
  },
  contentDataLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 25,
  },
  passwordButton: {
    backgroundColor: constants.primary.buttonColor,
    width: "80%",
    alignSelf: "center",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  passwordButtonLight: {
    backgroundColor: constants.secondary.buttonColor,
    width: "80%",
    alignSelf: "center",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  passwordButtonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 16,
  },
  passwordButtonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 16,
  },
});

export default ProfileScreen;
