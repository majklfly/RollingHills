import React, { createContext, useReducer } from "react";

export const LocationContext = createContext({
  startRecording: () => {},
  stopRecording: () => {},
  addLocation: () => {},
});

export const LocationStateContext = createContext({
  currentLocation: null,
  locations: [],
  recording: false,
});

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
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
  const addLocation = (location) => {
    dispatch({ type: "add_current_location", payload: location });
  };

  return (
    <LocationStateContext.Provider value={{ state }}>
      <LocationContext.Provider
        value={{ startRecording, stopRecording, addLocation }}
      >
        {children}
      </LocationContext.Provider>
    </LocationStateContext.Provider>
  );
};
