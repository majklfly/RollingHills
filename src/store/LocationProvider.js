import React, { createContext, useReducer } from "react";

export const LocationContext = createContext({
  startRecording: () => {},
  stopRecording: () => {},
  addLocation: () => {},
});

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
};

const locationReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  const startRecording = () => {
    console.log("startRecording triggered");
  };
  const stopRecording = () => {};
  const addLocation = () => {};

  return (
    <LocationContext.Provider
      value={{ startRecording, stopRecording, addLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};
