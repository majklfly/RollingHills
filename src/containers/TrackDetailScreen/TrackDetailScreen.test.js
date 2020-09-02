import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react-native";

import TrackDetailScreen from "./TrackDetailScreen";

afterEach(cleanup);

const params = {
  data: {
    time: {
      integerValue: 2,
    },
    name: {
      stringValue: "testValue",
    },
    date: {
      stringValue: "first value GMT second value",
    },
    distance: {
      integerValue: 51,
    },
    locations: {
      arrayValue: {
        values: [
          {
            mapValue: {
              fields: {
                coords: {
                  mapValue: {
                    fields: {
                      latitude: {
                        doubleValue: 2.51,
                      },
                      longitude: {
                        doubleValue: -51.2,
                      },
                      speed: {
                        doubleValue: 51.2,
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  },
};

const setUp = () => {
  const utils = render(<TrackDetailScreen route={{ params }} />);
  return { ...utils };
};

test("it should render the track Detail screen", async () => {
  const { getByTestId } = setUp();
  const container = await waitFor(() => getByTestId("trackDetailContainer"));
  expect(container.type).toBe("View");
});
