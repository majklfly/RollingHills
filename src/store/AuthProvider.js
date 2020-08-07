import React, { createContext, useReducer } from "react";
import { AsyncStorage } from "react-native";
import Firebase from "../../firebase";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
const firebase = require("firebase");
import { ANDROID_CLIENT_ID } from "@env";

export const AuthContext = createContext({
  user: null,
  errorMessage: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  signInGoogle: () => {},
  singInFacebook: () => {},
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
        error: action.payload,
      };
    }
    case "cleanError": {
      return {
        ...state,
        error: "",
      };
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem("user");
  };

  const handleError = (error) => {
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
      dispatch({ type: "error", payload: "Provided credentials don't match." });
    } else {
      console.log(error);
    }
    setTimeout(function () {
      dispatch({ type: "cleanError" });
    }, 2000);
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
          .then((data) => console.log("data", data))
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
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
