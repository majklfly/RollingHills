import React, { useState, useContext } from "react";
import { Form, Item, Button, Label, CheckBox, Input } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import constants from "../../constants";

import Svg, { Path } from "react-native-svg";

import { Background } from "../../components/Background/Background";
import { AuthContext, GlobalContext } from "../../store/AuthProvider";

import { GoogleLogin } from "../../components/GoogleLogin/GoogleLogin";
import { FacebookLogin } from "../../components/FacebookLogin/FacebookLogin";
import { ForgotPasswordForm } from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import { SignupForm } from "../../components/SignupForm/SignupForm";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const { login, signInGoogle, signInFacebook } = useContext(AuthContext);
  const { state } = useContext(GlobalContext);
  const { isLoading, errorMessage } = state;

  const renderLoginForm = () => {
    if (modalVisible === true || signupModalVisible === true) {
      return null;
    } else {
      return (
        <>
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
                marginTop: 40,
                backgroundColor: constants.primary.buttonColor,
              }}
              onPress={() => login(email, password)}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Button>
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => signInGoogle()}>
                <GoogleLogin />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => signInFacebook()}>
                <FacebookLogin />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={styles.terms}
                onPress={() => navigation.navigate("Terms")}
              >
                Terms
              </Text>
              <Text style={styles.terms} onPress={() => setModalVisible(true)}>
                Forgot Password
              </Text>
              <Text
                style={styles.terms}
                onPress={() => setSignupModalVisible(true)}
              >
                Signup
              </Text>
            </View>
          </Form>

          <View style={{ flexDirection: "row" }}>
            <Svg
              height={200}
              width={200}
              viewBox="0 0 100 100"
              style={{ position: "relative", top: "-13.8%" }}
            >
              <Path
                d="M0 0 L0 60 Q0 15 40 0 L0 0"
                fill={constants.primary.containerColor}
                stroke={constants.primary.containerColor}
              />
            </Svg>
          </View>
        </>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Background />
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Svg
            height={200}
            width={200}
            viewBox="0 0 100 100"
            style={{ position: "relative", top: "-34.2%" }}
          >
            <Path
              d="M0 0 Q0 55 50 70 L0 70 L0 18"
              fill={constants.primary.containerColor}
              stroke={constants.primary.containerColor}
            />
          </Svg>
          {errorMessage ? (
            <View style={styles.errorMessage}>
              <Text style={styles.buttonText}>{errorMessage}</Text>
            </View>
          ) : null}
        </View>
        {isLoading ? <ActivityIndicator size="large" /> : renderLoginForm()}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => Alert.alert("Email has been sent")}
        style={styles.modal}
      >
        <ForgotPasswordForm setModalVisible={setModalVisible} />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={signupModalVisible}
        onRequestClose={() => Alert.alert("Email has been sent")}
        style={styles.modal}
      >
        <SignupForm setSignupModalVisible={setSignupModalVisible} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    backgroundColor: constants.primary.containerColor,
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    position: "absolute",
    width: "100%",
    height: 500,
    top: "20%",
  },
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
  terms: {
    color: constants.primary.textColor,
    alignSelf: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    fontFamily: constants.primary.fontFamily,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  footer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: constants.primary.containerColor,
    marginTop: "50%",
    marginBottom: "-68%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  errorMessage: {
    width: "80%",
    height: 50,
    backgroundColor: constants.primary.errorMessageColor,
    top: "-20%",
    left: "-75%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  modal: {
    backgroundColor: "red",
    width: 100,
    height: 100,
  },
});

export default LoginScreen;
