import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Switch,
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
  const [isEnabled, setIsEnabled] = useState(false);
  const {
    state: { user },
  } = useContext(GlobalContext);

  const formatDate = (date) => {
    return moment(new Date(parseInt(date))).format("DD/MM/YYYY");
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <Background />
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          <Text style={styles.title}>{user.displayName}</Text>
          <View style={styles.contentLine}>
            <Text style={styles.contentLabel}>Joined us</Text>
            <Text style={styles.contentData}>{formatDate(user.createdAt)}</Text>
          </View>
          <View style={styles.contentLine}>
            <Text style={styles.contentLabel}>last login</Text>
            <Text style={styles.contentData}>
              {formatDate(user.lastLoginAt)}
            </Text>
          </View>
          <View style={styles.contentLine}>
            <TouchableOpacity
              style={styles.passwordButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.passwordButtonText}>update Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentLine}>
            <Text style={styles.contentLabel}>
              {isEnabled ? "Switch to Night Mode" : "Switch to Day Mode"}
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
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
  passwordButtonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 16,
  },
});

export default ProfileScreen;
