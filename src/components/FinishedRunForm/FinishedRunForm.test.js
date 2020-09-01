import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import { FinishedRunForm } from "./FinishedRunForm";

import { TimerProvider } from "../../store/TimerProvider";
import { LocationProvider } from "../../store/LocationProvider";
import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <LocationProvider>
        <TimerProvider>
          <FinishedRunForm />
        </TimerProvider>
      </LocationProvider>
    </AuthProvider>
  );
  const input = utils.getByTestId("textInput");
  const submit = utils.getByTestId("submit");
  return { input, submit, ...utils };
};

test("it should show the whole container", () => {
  const { getByTestId } = setUp();
  const element = getByTestId("finishedRunContainer");
});

test("it should have default empty input", () => {
  const { input } = setUp();
  expect(input.props.value).toBe("");
});

test("it should update the input value", () => {
  const { input } = setUp();
  fireEvent.changeText(input, "test");
  expect(input.props.value).toBe("test");
});

test("shoudl trigger the submit function", () => {
  const { submit } = setUp();
  fireEvent.press(submit);
  //TODO: missing assertation
});
