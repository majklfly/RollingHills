import React, { createContext, useReducer, useContext, useState } from "react";
import Firebase from "../../firebase";
import { GlobalContext } from "../store/AuthProvider";
import { getDistance } from "geolib";

const db = Firebase.firestore();

export const LocationContext = createContext({
  startRecording: () => {},
  stopRecording: () => {},
  addLocation: () => {},
  runFinished: () => {},
  calculateDistance: () => {},
  submitResults: () => {},
  fetchData: () => {},
});

export const LocationStateContext = createContext({
  currentLocation: null,
  error: undefined,
  locations: [],
  distance: null,
  recording: false,
  finished: false,
  tracks: [],
});

const initialState = {
  recording: false,
  error: undefined,
  locations: [],
  distance: null,
  currentLocation: null,
  finished: false,
  tracks: [],
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
    case "update_trackslist":
      return { ...state, tracks: action.payload };
    case "error":
      return { ...state, error: action.payload };
    case "add_distance":
      return { ...state, distance: action.payload };
    default:
      return state;
  }
};

export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  const {
    state: { user },
  } = useContext(GlobalContext);

  const startRecording = () => {
    dispatch({ type: "start_recording" });
  };
  const stopRecording = () => {
    dispatch({ type: "stop_recording" });
  };

  const runFinished = (locations) => {
    dispatch({ type: "run_finished" });
    const distance = calculateDistance(locations);
    dispatch({ type: "add_distance", payload: distance });
  };

  const submitResults = (distance, date, time, name) => {
    try {
      db.collection("userdata")
        .doc(user.uid)
        .collection("performaces")
        .doc(date)
        .set({
          distance: distance,
          date: date,
          time: time,
          name: name,
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchData = async () => {
    try {
      const data = await db
        .collection("userdata")
        .doc(user.uid)
        .collection("performaces")
        .get();
      data.Dd.docChanges.length === 0 &&
        dispatch({ type: "error", payload: "Haven't found any tracks" });
      dispatch({ type: "update_trackslist", payload: data.Dd.docChanges });
    } catch (e) {
      dispatch({ type: "error", payload: "Haven't found any tracks" });
    }
  };

  const cleanup = () => {
    dispatch({ type: "cleanup" });
  };

  const calculateDistance = (locations) => {
    let latitude1;
    let longitude1;
    let totalDistance = 0;
    locations.map((location) => {
      if (latitude1 === undefined && longitude1 === undefined) {
        latitude1 = location.coords.latitude;
        longitude1 = location.coords.longitude;
      } else {
        const distance = getDistance(
          { latitude: latitude1, longitude: longitude1 },
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
        );
        latitude1 = location.coords.latitude;
        longitude1 = location.coords.longitude;
        totalDistance = totalDistance + distance;
      }
    });
    return totalDistance;
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
          calculateDistance,
          submitResults,
          fetchData,
          cleanup,
        }}
      >
        {children}
      </LocationContext.Provider>
    </LocationStateContext.Provider>
  );
};
