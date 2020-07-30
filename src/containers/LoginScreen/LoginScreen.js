import React, { useState, useContext } from "react";
import { Container, Form, Input, Item, Button, Label } from "native-base";
import { StyleSheet, Text, View } from "react-native";

import constants from "../../constants";

import { Background } from "../../components/Background/Background";
import { AuthContext } from "../../store/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { login, signup } = useContext(AuthContext);

  return (
    <View style={styles.mainContainer}>
      <Background />
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label style={styles.label}>Email</Label>
            <Input
              style={styles.input}
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
            success
            style={{ marginTop: 40 }}
            onPress={() => login(email, password)}
          >
            <Text style={styles.terms}>Login</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 40 }}
            onPress={() => signup(email, password)}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </Button>
        </Form>
        <Text style={styles.terms} onPress={() => navigation.navigate("Terms")}>
          Terms
        </Text>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 128, 0.8)",
    height: 500,
    width: "80%",
    alignSelf: "center",
    marginTop: "40%",
    borderRadius: 20,
    padding: 30,
    position: "absolute",
  },
  label: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    padding: 5,
  },
  input: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  terms: {
    color: constants.primary.textColor,
    alignSelf: "center",
    paddingTop: 20,
    fontFamily: constants.primary.fontFamily,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
});

export default LoginScreen;
