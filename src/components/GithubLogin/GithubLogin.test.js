import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import { GithubLogin } from "./GithubLogin";

afterEach(cleanup);

const setUp = () => {
  const utils = render(<GithubLogin />);
  return { ...utils };
};

test("it should render the Github login svg", () => {
  const { getByTestId } = setUp();
  const svg = getByTestId("svg");
  expect(svg.type).toBe("RNSVGSvgView");
});
