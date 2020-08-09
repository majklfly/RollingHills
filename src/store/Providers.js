import React from "react";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "../navigation/Routes";
import { Background } from "../components/Background/Background";

export const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
