import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import { SpeedStatistics } from "./SpeedStatistics";

afterEach(cleanup);

const locations = {
  arrayValue: {
    values: [],
  },
};

const setUp = () => {
  const utils = render(<SpeedStatistics data={{ locations }} />);
  return { ...utils };
};

test("it should render the container for the statistic", () => {
  const { getByTestId, debug } = setUp();
  const container = getByTestId("mainContainer");
  expect(container.type).toBe("View");
});
