import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Form, Item, Button, Label, Input } from "native-base";
import constants from "../../constants";

import { AuthContext, GlobalContext } from "../../store/AuthProvider";

export const UpdatePasswordForm = (props) => {
  const [email, setEmail] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [dayMode, setDayModeLocal] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const { changePassword } = useContext(AuthContext);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const retrieveDayMode = async () => {
      const result = await AsyncStorage.getItem("dayMode");
      const value = result === "true" ? true : false;
      setDayModeLocal(value);
    };
    retrieveDayMode();
  });

  return (
    <View
      style={dayMode ? styles.mainContainerLight : styles.mainContainer}
      testID="updateForm"
    >
      <TouchableOpacity
        onPress={() => props.setModalVisible(false)}
        style={styles.closeIcon}
      >
        <AntDesign
          name="closecircleo"
          size={35}
          color={
            dayMode
              ? constants.secondary.textColor
              : constants.primary.textColor
          }
        />
      </TouchableOpacity>
      <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      {state.successMessage !== "null" && (
        <Text
          style={dayMode ? state.successMessageLight : styles.successMessage}
        >
          {state.successMessage}
        </Text>
      )}
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label style={dayMode ? styles.labelLight : styles.label}>
            Your Email
          </Label>
          <Input
            style={dayMode ? styles.inputLight : styles.input}
            value={email}
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
          ></Input>
        </Item>
        <Item floatingLabel>
          <Label style={dayMode ? styles.labelLight : styles.label}>
            Current Password
          </Label>
          <Input
            style={dayMode ? styles.inputLight : styles.input}
            value={currentPassword}
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setCurrentPassword(value)}
          ></Input>
        </Item>
        <Item floatingLabel>
          <Label style={dayMode ? styles.labelLight : styles.label}>
            {" "}
            New Password
          </Label>
          <Input
            style={dayMode ? styles.inputLight : styles.input}
            autoCorrent={false}
            value={newPassword}
            autoCapitalize="none"
            onChangeText={(value) => {
              setNewPassword(value);
            }}
          ></Input>
        </Item>
        <Button
          full
          style={{
            marginTop: 20,
            width: "86%",
            borderRadius: 10,
            height: 50,
            alignSelf: "center",
            backgroundColor: dayMode
              ? constants.secondary.buttonColor
              : constants.primary.buttonColor,
          }}
          onPress={() => changePassword(email, currentPassword, newPassword)}
        >
          <Text style={dayMode ? styles.buttonTextLight : styles.buttonText}>
            Update Password
          </Text>
        </Button>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: constants.primary.containerColor,
    flex: 1,
  },
  mainContainerLight: {
    backgroundColor: constants.secondary.containerColor,
    flex: 1,
  },
  closeIcon: {
    alignSelf: "flex-end",
    marginRight: 30,
    marginTop: 30,
  },
  form: {
    width: "75%",
    alignSelf: "center",
    position: "relative",
    top: "17%",
  },
  label: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    padding: 5,
  },
  labelLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    padding: 5,
  },
  input: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    width: 70,
  },
  inputLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    width: 70,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 16,
  },
  buttonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    fontFamily: constants.primary.fontFamily,
    fontSize: 16,
    alignSelf: "center",
    marginTop: "30%",
    position: "absolute",
  },
  successMessage: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 16,
    alignSelf: "center",
    marginTop: "30%",
    position: "absolute",
  },
  successMessageLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 16,
    alignSelf: "center",
    marginTop: "30%",
    position: "absolute",
  },
});
