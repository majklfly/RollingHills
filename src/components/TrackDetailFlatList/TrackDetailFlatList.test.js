import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";

import { TrackDetailFlatList } from "./TrackDetailFlatList";

afterEach(cleanup);

const params = {
  data: {
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
                        doubleValue: 0.24,
                      },
                      longitude: {
                        doubleValue: 0.81,
                      },
                      speed: {
                        doubleValue: 8.14,
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
    distance: {
      integerValue: 51,
    },
  },
};

const setUp = () => {
  const utils = render(<TrackDetailFlatList route={{ params }} />);
  return { ...utils };
};

test("it should render the container of the flatlist", () => {
  const { getByTestId } = setUp();
  const container = getByTestId("detailContainer");
  expect(container.type).toBe("View");
});
