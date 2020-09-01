import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import { Map } from "./Map";

import { LocationStateContext } from "../../store/LocationProvider";
import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const state = {
  currentLocation: { coords: { longitude: 21, latitude: 50 } },
  recording: true,
  distance: 205,
  locations: [],
};

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <LocationStateContext.Provider value={{ state }}>
        <Map />
      </LocationStateContext.Provider>
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the map", () => {
  const { getByTestId, debug } = setUp();
  const map = getByTestId("mapView");
  expect(map.type).toBe("AIRMap");
});
