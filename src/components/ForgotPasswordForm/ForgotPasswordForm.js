import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Form, Item, Button, Label, Input } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

import constants from "../../constants";

import { AuthContext, GlobalContext } from "../../store/AuthProvider";

export const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState(null);
  const [dayMode, setDayModeLocal] = useState(null);
  const { forgotPassword } = useContext(AuthContext);
  const {
    state: { successMessage },
  } = useContext(GlobalContext);

  const retrieveDayMode = async () => {
    const result = await AsyncStorage.getItem("dayMode");
    const value = result === "true" ? true : false;
    setDayModeLocal(value);
  };

  useEffect(() => {
    retrieveDayMode();
  });

  return (
    <View testID="container">
      <Form style={styles.form}>
        <TouchableOpacity onPress={() => props.setModalVisible(false)}>
          <FontAwesome name="close" style={styles.icon} />
        </TouchableOpacity>
        <Item floatingLabel>
          <Label style={dayMode ? styles.labelLight : styles.label}>
            Email
          </Label>
          <Input
            style={{
              color: dayMode
                ? constants.secondary.textColor
                : constants.primary.textColor,
            }}
            value={email}
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
            testID="input"
          ></Input>
        </Item>
        <Button
          full
          rounded
          style={{
            marginTop: 20,
            backgroundColor: dayMode
              ? constants.secondary.buttonColor
              : constants.primary.buttonColor,
            marginTop: 50,
          }}
          onPress={() => forgotPassword(email)}
        >
          <Text style={dayMode ? styles.buttonTextLight : styles.buttonText}>
            Reset my password
          </Text>
        </Button>
        {successMessage !== "null" ? (
          <Text
            style={dayMode ? styles.successMessageLight : styles.successMessage}
          >
            {successMessage}
          </Text>
        ) : null}
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
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
  form: {
    width: "70%",
    alignSelf: "center",
    position: "relative",
    flexDirection: "column",
    top: 200,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  buttonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
  icon: {
    fontSize: 40,
    alignSelf: "flex-end",
    color: "white",
  },
  successMessage: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  successMessageLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 15,
    alignSelf: "center",
    marginTop: 20,
  },
});
