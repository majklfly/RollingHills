import React from "react";
import { render, cleanup } from "@testing-library/react-native";

import LoginScreen from "./LoginScreen";

import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the login page", () => {
  const { getByTestId, debug } = setUp();
  console.log(debug());
  const container = getByTestId("LoginMainContainer");
  expect(container.type).toBe("View");
});
