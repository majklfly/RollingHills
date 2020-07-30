import React, { createContext, useState } from "react";
import { AsyncStorage } from "react-native";
import Firebase from "../../firebase";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem("user");
  };

  const handleLogin = (user) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const login = (email, password) => {
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => handleLogin(user));
    } catch (error) {
      console.log(error);
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

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
