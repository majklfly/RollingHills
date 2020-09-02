import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react-native";

import { UpdatePasswordForm } from "./UpdatePasswordForm";

import { AuthProvider } from "../../store/AuthProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <AuthProvider>
      <UpdatePasswordForm />
    </AuthProvider>
  );
  return { ...utils };
};

test("it should render the update password form", () => {
  const { getByTestId } = setUp();
  const form = getByTestId("updateForm");
  expect(form.type).toBe("View");
});
