import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";

import { GlobalContext } from "../../store/AuthProvider";

import ProgressScreen from "./ProgressScreen";

afterEach(cleanup);

const state = {
  user: {},
};

const setUp = () => {
  const utils = render(
    <GlobalContext.Provider value={{ state }}>
      <ProgressScreen />
    </GlobalContext.Provider>
  );
  return { ...utils };
};

test("it should render the progress screen", async () => {
  const { getByTestId } = setUp();
  const container = await waitFor(() => getByTestId("ProgressScreenContainer"));
  expect(container.type).toBe("View");
});
