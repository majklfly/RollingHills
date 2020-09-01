import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../utils";

import { FacebookLogin } from "./FacebookLogin";

configure({ adapter: new Adapter() });

const setUp = () => {
  const wrapper = shallow(<FacebookLogin />);
  return wrapper;
};

describe("FacebookLogin", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("should render the facebook login icon", () => {
    const svg = findByTestAttr(wrapper, "facebookLogin");
    expect(svg.length).toBe(1);
  });
});
