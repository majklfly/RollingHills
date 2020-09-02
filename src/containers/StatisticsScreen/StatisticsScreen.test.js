import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";

import StatisticsScreen from "./StatisticsScreen";

import { LocationProvider } from "../../store/LocationProvider";
import { GlobalContext } from "../../store/AuthProvider";

afterEach(cleanup);

const state = {
  user: {},
};

const setUp = () => {
  const utils = render(
    <GlobalContext.Provider value={{ state }}>
      <LocationProvider>
        <StatisticsScreen navigation={{ addListener: () => {} }} />
      </LocationProvider>
    </GlobalContext.Provider>
  );
  return { ...utils };
};

test("it should render the statistics screen", async () => {
  const { getByTestId } = setUp();
  const container = await waitFor(() => getByTestId("statisticsContainer"));
  expect(container.type).toBe("View");
});
