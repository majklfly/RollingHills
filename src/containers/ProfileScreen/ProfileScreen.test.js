import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";

import ProfileScreen from "./ProfileScreen";

import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <ProfileScreen />
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the profile screen", async () => {
  const { getByTestId } = setUp();
  const container = await waitFor(() => getByTestId("profileContainer"));
  expect(container.type).toBe("View");
});
