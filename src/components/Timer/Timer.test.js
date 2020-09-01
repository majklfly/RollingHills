import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import { Timer } from "./Timer";

import { LocationProvider } from "../../store/LocationProvider";
import { TimerProvider } from "../../store/TimerProvider";
import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <LocationProvider>
        <TimerProvider>
          <Timer />
        </TimerProvider>
      </LocationProvider>
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the container for the timer", () => {
  const { getByTestId } = setUp();
  const container = getByTestId("timerContainer");
  expect(container.type).toBe("View");
});
