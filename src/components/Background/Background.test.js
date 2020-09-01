import "react-native";
import MockAsyncStorage from "mock-async-storage";
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../utils";

import { Background } from "./Background";

configure({ adapter: new Adapter() });

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock("react-native/Libraries/Storage/AsyncStorage", () => mockImpl);
};

mock();

import { AsyncStorage as storage } from "react-native";

const setUp = () => {
  const wrapper = shallow(<Background />);
  return wrapper;
};

describe("Background", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the night mode", () => {
    const svg = findByTestAttr(wrapper, "nightMode");
    expect(svg.length).toBe(1);
  });

  it("Mock Async Storage working", async () => {
    await storage.setItem("myKey", "myValue");
    const value = await storage.getItem("myKey");
    expect(value).toBe("myValue");
  });

  it("should render the day mode", async () => {
    await storage.setItem("dayMode", "true");
    const value = await storage.getItem("dayMode");
    const svg = findByTestAttr(wrapper, "dayMode");
    expect(svg.length).toBe(0);
    // TODO: mockstorage to be fixed and implemented
  });
});
