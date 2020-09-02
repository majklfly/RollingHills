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
  changePassword: () => {},
  forgotPassword: () => {},
  dispatchErrorMessage: () => {},
  setDayMode: () => {},
});

export const GlobalContext = createContext({
  user: null,
  errorMessage: null,
  successMessage: null,
  dayMode: false,
});

const initialState = {
  user: {},
  errorMessage: "",
  isLoading: false,
  successMessage: "null",
  dayMode: false,
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
    case "successMessage": {
      return {
        ...state,
        successMessage: action.payload,
      };
    }
    case "dayMode": {
      return { ...state, dayMode: action.payload };
    }
    case "cleanError": {
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
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
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const dispatchErrorMessage = (e) => {
    dispatch({ type: "error", payload: e });
    setTimeout(function () {
      dispatch({ type: "cleanError" });
    }, 2000);
  };

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
    } else if (
      (error.message =
        'updatePassword failed: First argument "password" must be a valid string.')
    ) {
      dispatch({ type: "error", payload: "Please enter your password" });
    } else if (
      (error.message =
        "Too many unsuccessful login attempts. Please try again later.")
    ) {
      dispatch({
        type: "successMessage",
        payload: "password has been changed",
      });
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

  const login = (email, password) => {
    dispatch({ type: "login" });
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => resolveUser(data))
        .catch((e) => handleLoginErrors(e));
    } catch (error) {
      handleLoginErrors(error);
    }
  };

  const signup = (email, password) => {
    try {
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => resolveUser(data))
        .catch((e) => {
          handleSignupErrors(e);
        });
    } catch (error) {
      handleSignupErrors(error);
    }
  };

  const handleChangedPassword = () => {
    dispatch({
      type: "successMessage",
      payload: "Password has been changed",
    });
    setTimeout(function () {
      dispatch({ type: "cleanError" });
    }, 2000);
  };

  const changePassword = (email, oldPassword, newPassword) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, oldPassword)
        .then((user) => {
          firebase
            .auth()
            .currentUser.updatePassword(newPassword)
            .then(() => {
              handleChangedPassword();
            })
            .catch((e) => {
              handleLoginErrors(e);
            });
        })
        .catch((e) => {
          console.log(e);
          handleLoginErrors(e);
        });
    } catch (e) {
      handleLoginErrors(e);
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
          .then((data) => resolveUser());
      }
    } catch (e) {
      console.log(error);
    }
  };

  const resolveUser = async (data) => {
    const resData = await firebase.auth().currentUser.toJSON();
    dispatch({ type: "success", payload: resData });
  };

  const signInFacebook = async () => {
    dispatch({ type: "login" });
    console.log("dispatched");
    try {
      await Facebook.initializeAsync("213144473364363");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["email", "public_profile"],
      });
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((data) => resolveUser(data))
          .catch((error) => console.log("here", error));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const handleSentEmail = () => {
    dispatch({
      type: "successMessage",
      payload: "An email has been sent",
    });
    setTimeout(function () {
      dispatch({ type: "cleanError" });
    }, 2000);
  };

  const forgotPassword = (email) => {
    try {
      return firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => handleSentEmail())
        .catch((e) => {
          handleLoginErrors(e);
        });
    } catch (e) {
      console.log(e);
      dispatch({ type: "error", payload: "Please enter your email" });
    }
  };
  const setDayMode = (value) => {
    dispatch({ type: "dayMode", payload: value });
  };

  return (
    <GlobalContext.Provider value={{ state }}>
      <AuthContext.Provider
        value={{
          login,
          logout,
          signup,
          signInGoogle,
          signInFacebook,
          changePassword,
          forgotPassword,
          dispatchErrorMessage,
          setDayMode,
        }}
      >
        {children}
      </AuthContext.Provider>
    </GlobalContext.Provider>
  );
};
