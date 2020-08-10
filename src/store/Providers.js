import React from "react";
import { AuthProvider } from "./AuthProvider";
import { LocationProvider } from "./LocationProvider";
import { Routes } from "../navigation/Routes";

export const Providers = () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <Routes />
      </LocationProvider>
    </AuthProvider>
  );
};
