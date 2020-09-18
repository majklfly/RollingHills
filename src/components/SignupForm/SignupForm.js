import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from "react-native";
import { Form, Item, Button, Label, Input } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

import constants from "../../constants";

import { AuthContext } from "../../store/AuthProvider";

export const SignupForm = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [dayMode, setDayModeLocal] = useState(null);
  const { signup } = useContext(AuthContext);

  const retrieveDayMode = async () => {
    const result = await AsyncStorage.getItem("dayMode");
    const value = result === "true" ? true : false;
    setDayModeLocal(value);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      retrieveDayMode();
    }
    return () => (mounted = false);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => props.setSignupModalVisible(false)}
        style={styles.iconContainer}
      >
        <FontAwesome name="close" style={styles.icon} />
      </TouchableOpacity>
      <Form style={styles.form} testID="form">
        <Item stackedLabel>
          <Label style={dayMode ? styles.labelLight : styles.label}>
            Email
          </Label>
          <Input
            style={dayMode ? styles.inputLight : styles.input}
            value={email}
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
            testID="emailInput"
          ></Input>
        </Item>
        <Item stackedLabel>
          <Label style={dayMode ? styles.labelLight : styles.label}>
            Password
          </Label>
          <Input
            style={dayMode ? styles.inputLight : styles.input}
            autoCorrent={false}
            value={password}
            autoCapitalize="none"
            secureTextEntry
            testID="passwordInput"
            onChangeText={(value) => {
              setPassword(value);
            }}
          ></Input>
        </Item>
      </Form>
      <Button
        full
        rounded
        style={{
          marginTop: "30%",
          width: "80%",
          alignSelf: "center",
          backgroundColor: dayMode
            ? constants.secondary.buttonColor
            : constants.primary.buttonColor,
        }}
        onPress={() => signup(email, password)}
      >
        <Text style={dayMode ? styles.buttonTextLight : styles.buttonText}>
          Sign Up
        </Text>
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: "40%",
  },
  form: {
    width: "70%",
    alignSelf: "center",
    position: "relative",
    top: "30%",
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
    width: "90%",
  },
  inputLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    width: "90%",
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  buttonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    width: "100%",
    top: "45%",
    flexDirection: "column",
  },
  icon: {
    fontSize: 40,

    color: "white",
  },
  iconContainer: {
    position: "absolute",
    top: "2%",
    right: "15%",
    alignSelf: "flex-end",
  },
});
