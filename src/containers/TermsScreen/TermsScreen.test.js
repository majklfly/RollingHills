import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";

import TermsScreen from "./TermsScreen";

afterEach(cleanup);

const setUp = () => {
  const utils = render(<TermsScreen />);
  return { ...utils };
};

test("it should render the terms screen", async () => {
  const { getByTestId } = setUp();
  const container = await waitFor(() => getByTestId("termsContainer"));
  expect(container.type).toBe("View");
});
