import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import { ForgotPasswordForm } from "./ForgotPasswordForm";

import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <ForgotPasswordForm />
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the whole container", () => {
  const { getByTestId } = setUp();
  const container = getByTestId("container");
  expect(container.type).toBe("View");
});

test("it should render empty input", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("input");
  expect(input.props.value).toBe(null);
});

test("it should update the input", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("input");
  fireEvent.changeText(input, "test");
  expect(input.props.value).toBe("test");
});
