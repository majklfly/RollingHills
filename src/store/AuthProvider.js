import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";
import Firebase from "../../firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
const firebase = require("firebase");

const ANDROID_CLIENT_ID =
  "336140000042-nr0ujm74ie18vtdjop0btpglgcttnfub.apps.googleusercontent.com";

export const AuthContext = createContext({
  user: null,
  errorMessage: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  signInGoogle: () => {},
  singInFacebook: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem("user");
  };

  const handleLogin = (user) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const handleError = (error) => {
    if (
      error.message ===
      'signInWithEmailAndPassword failed: First argument "email" must be a valid string.'
    ) {
      setErrorMessage("Please enter valid email");
    } else if (
      error.message ===
      'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.'
    ) {
      setErrorMessage("Please enter your password");
    } else if (error.message === "The email address is badly formatted.") {
      setErrorMessage("Please enter valid email");
    } else if (
      error.message ===
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      setErrorMessage("Provided credentials don't match.");
    } else {
      console.log(error);
    }
    setTimeout(function () {
      setErrorMessage(null);
    }, 2000);
  };

  const login = (email, password) => {
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => handleLogin(user))
        .catch((e) => handleError(e));
    } catch (error) {
      handleError(error);
    }
  };

  const signup = (email, password) => {
    try {
      password.length < 6 && alert("Please enter at least 6 characters");
      Firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  };

  const signInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );
        Firebase.auth()
          .signInWithCredential(credential)
          .then((data) => console.log(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signInFacebook = async () => {
    await Facebook.initializeAsync("213144473364363");
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      console.log(type);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setUser,
        errorMessage,
        user,
        login,
        logout,
        signup,
        signInGoogle,
        signInFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
