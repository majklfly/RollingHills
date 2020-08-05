import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Form, Item, Button, Label, Input } from "native-base";

import { FontAwesome } from "@expo/vector-icons";

import constants from "../../constants";

export const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState(null);
  return (
    <View>
      <Form style={styles.form}>
        <TouchableOpacity onPress={() => props.setModalVisible(false)}>
          <FontAwesome name="close" style={styles.icon} />
        </TouchableOpacity>
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
        <Button
          full
          rounded
          style={{
            marginTop: 20,
            backgroundColor: constants.primary.buttonColor,
            marginTop: 50,
          }}
          onPress={() => console.log(email)}
        >
          <Text style={styles.buttonText}>Reset my password</Text>
        </Button>
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
  icon: {
    fontSize: 40,
    alignSelf: "flex-end",
    color: "white",
  },
});
