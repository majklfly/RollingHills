import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import LoadingScreen from "./LoadingScreen";

afterEach(cleanup);

const setUp = () => {
  const utils = render(<LoadingScreen />);
  return { ...utils };
};

test("it renders the loading screen", () => {
  const { getByTestId } = setUp();
  const container = getByTestId("loadingScreen");
  expect(container.type).toBe("View");
});
