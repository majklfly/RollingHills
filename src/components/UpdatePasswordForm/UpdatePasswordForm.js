import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Form, Item, Button, Label, Input } from "native-base";
import constants from "../../constants";

import { AuthContext, GlobalContext } from "../../store/AuthProvider";

export const UpdatePasswordForm = (props) => {
  const [email, setEmail] = useState(null);
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const { changePassword } = useContext(AuthContext);
  const { state } = useContext(GlobalContext);

  console.log(state.errorMessage);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => props.setModalVisible(false)}
        style={styles.closeIcon}
      >
        <AntDesign
          name="closecircleo"
          size={35}
          color={constants.primary.textColor}
        />
      </TouchableOpacity>
      <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label style={styles.label}>Your Email</Label>
          <Input
            style={{ color: "white" }}
            value={email}
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
          ></Input>
        </Item>
        <Item floatingLabel>
          <Label style={styles.label}>Current Password</Label>
          <Input
            style={{ color: "white" }}
            value={currentPassword}
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setCurrentPassword(value)}
          ></Input>
        </Item>
        <Item floatingLabel>
          <Label style={styles.label}> New Password</Label>
          <Input
            style={styles.input}
            autoCorrent={false}
            value={newPassword}
            autoCapitalize="none"
            secureTextEntry
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
            backgroundColor: constants.primary.buttonColor,
          }}
          onPress={() => changePassword(email, currentPassword, newPassword)}
        >
          <Text style={styles.buttonText}>Update Password</Text>
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
  input: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    width: 70,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
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
});
