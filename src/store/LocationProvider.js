import React, { createContext, useReducer } from "react";

export const LocationContext = createContext({
  startRecording: () => {},
  stopRecording: () => {},
  addLocation: () => {},
  runFinished: () => {},
});

export const LocationStateContext = createContext({
  currentLocation: null,
  locations: [],
  recording: false,
  finished: false,
});

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
  finished: false,
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "run_finished":
      return { ...state, recording: false, finished: true };
    case "cleanup":
      return {
        ...state,
        recording: false,
        finished: false,
        locations: [],
      };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    default:
      return state;
  }
};

export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  const startRecording = () => {
    dispatch({ type: "start_recording" });
  };
  const stopRecording = () => {
    dispatch({ type: "stop_recording" });
  };

  const runFinished = () => {
    dispatch({ type: "run_finished" });
  };

  const cleanup = () => {
    dispatch({ type: "cleanup" });
  };

  const addLocation = (location, recording) => {
    dispatch({ type: "add_current_location", payload: location });
    if (recording) {
      dispatch({ type: "add_location", payload: location });
    }
  };

  return (
    <LocationStateContext.Provider value={{ state }}>
      <LocationContext.Provider
        value={{
          startRecording,
          stopRecording,
          addLocation,
          runFinished,
          cleanup,
        }}
      >
        {children}
      </LocationContext.Provider>
    </LocationStateContext.Provider>
  );
};
