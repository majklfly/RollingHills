import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react-native";

import { SignupForm } from "./SignupForm";

import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <SignupForm />
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the form", () => {
  const { getByTestId } = setUp();
  const form = getByTestId("form");
  expect(form.type).toBe("View");
});

test("it should rende an empty input for email", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("emailInput");
  expect(input.type).toBe("TextInput");
});

test("it should rende the input of the email", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("emailInput");
  fireEvent.changeText(input, "test");
  expect(input.props.value).toBe("test");
});

test("it should rende an empty input for password", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("passwordInput");
  expect(input.type).toBe("TextInput");
});

test("it should rende the input of the password", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("passwordInput");
  fireEvent.changeText(input, "test");
  expect(input.props.value).toBe("test");
});
