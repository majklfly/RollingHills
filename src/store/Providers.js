import React from "react";
import { AuthProvider } from "./AuthProvider";
import { LocationProvider } from "./LocationProvider";
import { TimerProvider } from "./TimerProvider";
import { QuotesProvider } from "./QuotesProvider";
import { Routes } from "../navigation/Routes";

export const Providers = () => {
  return (
    <AuthProvider>
      <TimerProvider>
        <LocationProvider>
          <QuotesProvider>
            <Routes />
          </QuotesProvider>
        </LocationProvider>
      </TimerProvider>
    </AuthProvider>
  );
};
