import React, { createContext, useReducer } from "react";
import { AsyncStorage } from "react-native";
import Firebase from "../../firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
const firebase = require("firebase");
import { ANDROID_CLIENT_ID } from "@env";

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  signup: () => {},
  signInGoogle: () => {},
  signInFacebook: () => {},
});

export const GlobalContext = createContext({
  user: null,
  errorMessage: null,
});

const initialState = {
  user: {},
  errorMessage: "",
  isLoading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "success": {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }
    case "error": {
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false,
      };
    }
    case "cleanError": {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case "logout": {
      return {
        ...state,
        error: "",
        user: null,
        loading: false,
      };
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleLoginErrors = (error) => {
    if (
      error.message ===
      'signInWithEmailAndPassword failed: First argument "email" must be a valid string.'
    ) {
      dispatch({ type: "error", payload: "Please enter valid email" });
    } else if (
      error.message ===
      'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.'
    ) {
      dispatch({ type: "error", payload: "Please enter your password" });
    } else if (error.message === "The email address is badly formatted.") {
      dispatch({ type: "error", payload: "Please enter valid email" });
    } else if (
      error.message ===
      "There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      dispatch({ type: "error", payload: "Email address is not recognized." });
    } else if (
      error.message ===
      "The password is invalid or the user does not have a password."
    ) {
      dispatch({ type: "error", payload: "Please enter correct password." });
    } else {
      console.log(error);
    }
    setTimeout(function () {
      dispatch({ type: "cleanError" });
    }, 2000);
  };

  const handleSignupErrors = (error) => {
    error.message ===
      'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.' &&
      dispatch({ type: "error", payload: "Please enter your email" });
    error.message ===
      'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.' &&
      dispatch({ type: "error", payload: "Please enter your password" });
    error.message === "The email address is badly formatted." &&
      dispatch({ type: "error", payload: "Your email is incorrect." });
    error.message === "Password should be at least 6 characters" &&
      dispatch({ type: "error", payload: "Please provide longer password" });
    setTimeout(function () {
      dispatch({ type: "cleanError" });
    }, 2000);
  };

  const logout = () => {
    dispatch({ type: "logout" });
    AsyncStorage.removeItem("user");
  };

  const handleLogin = (user) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "success", payload: user });
  };

  const login = (email, password) => {
    dispatch({ type: "login" });
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => handleLogin(user))
        .catch((e) => handleLoginErrors(e));
    } catch (error) {
      handleLoginErrors(error);
    }
  };

  const signup = (email, password) => {
    try {
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => handleLogin(user))
        .catch((e) => {
          handleSignupErrors(e);
        });
    } catch (error) {
      handleSignupErrors(error);
    }
  };

  const signInGoogle = async () => {
    dispatch({ type: "login" });
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
          .then((data) => dispatch({ type: "success", payload: data }));
      }
    } catch (e) {
      console.log(error);
    }
  };

  const signInFacebook = async () => {
    dispatch({ type: "login" });
    try {
      await Facebook.initializeAsync("213144473364363");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((data) => dispatch({ type: "success", payload: data.user }))
          .catch((error) => console.log("here", error));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const forgotPassword = (email) => {
    try {
      return firebase.auth().sendPasswordResetEmail(email);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <AuthContext.Provider
        value={{ login, logout, signup, signInGoogle, signInFacebook }}
      >
        {children}
      </AuthContext.Provider>
    </GlobalContext.Provider>
  );
};
