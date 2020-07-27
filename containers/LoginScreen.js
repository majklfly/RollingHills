import React, { useState } from "react";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
} from "native-base";
import { StyleSheet, Text, View } from "react-native";
import Firebase from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignup = (email, password) => {
    try {
      password.length < 6 && alert("Please enter at least 6 characters");
      Firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  };
  const handleLogin = (email, password) => {
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => console.log(user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setEmail(value)}
          ></Input>
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
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
          onPress={() => handleLogin(email, password)}
        >
          <Text>Login</Text>
        </Button>
        <Button
          full
          rounded
          primary
          style={{ marginTop: 40 }}
          onPress={() => handleSignup(email, password)}
        >
          <Text>Sign in</Text>
        </Button>
      </Form>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 30,
  },
});

export default LoginScreen;
