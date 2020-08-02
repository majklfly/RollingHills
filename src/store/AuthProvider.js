import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";
import Firebase from "../../firebase";
import * as GoogleSignIn from "expo-google-sign-in";

const ANDROID_CLIENT_ID =
  "336140000042-nr0ujm74ie18vtdjop0btpglgcttnfub.apps.googleusercontent.com";

export const AuthContext = createContext({
  user: null,
  errorMessage: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  signInGoogle: () => {},
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
      await GoogleSignIn.initAsync({
        clientId: ANDROID_CLIENT_ID,
      });
      const user = await GoogleSignIn.signInWithGoogle();
      console.log(user);
    } catch (e) {
      console.log(e);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
