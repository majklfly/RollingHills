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
import Firebase from "../../firebase";

import { Background } from "../../components/Background/Background";

const LoginScreen = ({ navigation }) => {
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
    <View style={styles.mainContainer}>
      <Background />
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label style={styles.label}>Email</Label>
            <Input
              autoCorrent={false}
              autoCapitalize="none"
              onChangeText={(value) => setEmail(value)}
            ></Input>
          </Item>
          <Item floatingLabel>
            <Label style={styles.label}>Password</Label>
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
    color: "white",
    padding: 5,
  },
  terms: {
    color: "white",
    alignSelf: "center",
    paddingTop: 20,
  },
});

export default LoginScreen;
