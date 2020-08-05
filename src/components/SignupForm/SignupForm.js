import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Form, Item, Button, Label, Input } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

import constants from "../../constants";

import { AuthContext } from "../../store/AuthProvider";

export const SignupForm = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { signup } = useContext(AuthContext);
  return (
    <>
      <TouchableOpacity
        onPress={() => props.setSignupModalVisible(false)}
        style={styles.iconContainer}
      >
        <FontAwesome name="close" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label style={styles.label}>Email</Label>
            <Input
              style={{ color: "white" }}
              value={email}
              autoCorrent={false}
              autoCapitalize="none"
              onChangeText={(value) => setEmail(value)}
            ></Input>
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Password</Label>
            <Input
              style={styles.input}
              autoCorrent={false}
              value={password}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(value) => {
                setPassword(value);
              }}
            ></Input>
          </Item>
          <Button
            full
            rounded
            style={{
              marginTop: 20,
              backgroundColor: constants.primary.buttonColor,
            }}
            onPress={() => signup(email, password)}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </Form>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "70%",
    alignSelf: "center",
    position: "relative",
    top: -150,
  },
  label: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    padding: 5,
  },
  input: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    width: 70,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
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
    top: "23%",
    right: "15%",
    alignSelf: "flex-end",
  },
});
