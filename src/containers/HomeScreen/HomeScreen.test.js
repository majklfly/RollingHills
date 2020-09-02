import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import HomeScreen from "./HomeScreen";

import { GlobalContext } from "../../store/AuthProvider";
import { LocationProvider } from "../../store/LocationProvider";

afterEach(cleanup);

const state = {
  user: {
    displayName: "Peter",
  },
};

const setUp = () => {
  const utils = render(
    <GlobalContext.Provider value={{ state }}>
      <LocationProvider>
        <HomeScreen />
      </LocationProvider>
    </GlobalContext.Provider>
  );
  return { ...utils };
};

test("it should render the main container for the home screen", () => {
  const { getByTestId } = setUp();
  const container = getByTestId("homescreenContainer");
  expect(container.type).toBe("View");
});
