import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import { BadgeButton } from "./BadgeButton";

import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <BadgeButton percentage={20} />
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the container for the Badge Button", () => {
  const { getByTestId, debug } = setUp();
  const container = getByTestId("BadgeButton");
  expect(container.type).toBe("View");
});
