import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import { AddQuoteForm } from "./AddQuoteForm";

import { AuthProvider } from "../../store/AuthProvider";
import { QuotesProvider } from "../../store/QuotesProvider";

afterEach(cleanup);

const setUp = () => {
  const utils = render(
    <QuotesProvider>
      <AuthProvider>
        <AddQuoteForm />
      </AuthProvider>
    </QuotesProvider>
  );
  return { ...utils };
};

test("it should render the whole container for form", () => {
  const { getByTestId } = setUp();
  const container = getByTestId("AddQuoteContainer");
  expect(container.type).toBe("View");
});

test("it should render empty author input", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("QuoteAuthorInput");
  expect(input.props.value).toBe(null);
});

test("it should render empty content input", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("QuoteContentInput");
  expect(input.props.value).toBe(null);
});

test("it should update the author input", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("QuoteAuthorInput");
  fireEvent.changeText(input, "test");
  expect(input.props.value).toBe("test");
});

test("it should update the content input", () => {
  const { getByTestId } = setUp();
  const input = getByTestId("QuoteContentInput");
  fireEvent.changeText(input, "test");
  expect(input.props.value).toBe("test");
});
