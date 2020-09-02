import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";

import TracksScreen from "./TracksScreen";

afterEach(cleanup);

import { LocationProvider } from "../../store/LocationProvider";
import { GlobalContext } from "../../store/AuthProvider";

const state = {
  user: {},
};

const setUp = () => {
  const utils = render(
    <GlobalContext.Provider value={{ state }}>
      <LocationProvider>
        <TracksScreen navigation={{ addListener: () => {} }} />
      </LocationProvider>
    </GlobalContext.Provider>
  );
  return { ...utils };
};

test("it should render the Tracks screen", async () => {
  const { getByTestId } = setUp();
  const container = await waitFor(() => getByTestId("TracksScreenContainer"));
  expect(container.type).toBe("RCTScrollView");
});
