import React, { useContext } from "react";
import { AuthContext, GlobalContext, AuthProvider } from "./AuthProvider";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";

configure({ adapter: new Adapter() });

jest.mock("firebase/app", () => ({
  __esModule: true,
  default: {
    apps: [],
    initializeApp: () => {},
    auth: () => {},
  },
}));

describe("Login", () => {
  it("loads the user data to the global", async () => {
    const TestComponent = () => {
      const { login } = useContext(AuthContext);
      const {
        state: { user },
      } = useContext(GlobalContext);
      return (
        <>
          <div data-testid="user">{user.favorite_food}</div>
          <button onClick={login} title="button" data-testid="login"></button>
        </>
      );
    };

    const wrapper = mount(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(wrapper.find("[data-testid='user']").text()).toEqual("");

    wrapper.find("[data-testid='login']").simulate("click");
    // here happens the magic and it starts to work....
    //
    expect(wrapper.find("[data-testid='user']").text()).toEqual("Peter");
  });
});
