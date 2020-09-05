import React, { useContext } from "react";
import { AuthContext, GlobalContext, AuthProvider } from "./AuthProvider";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import firebase from "firebase";

configure({ adapter: new Adapter() });

jest.mock("firebase", () => {
  return {
    initializeApp: jest.fn(),
    auth: jest.fn().mockReturnThis(),
    signInWithEmailAndPassword: jest.fn(),
  };
});

email = "test@testuser.com";
password = "testpassword";

describe("Login", () => {
  it("loads the user data to the global", async () => {
    const TestComponent = () => {
      const { login } = useContext(AuthContext);
      const {
        state: { user, errorMessage },
      } = useContext(GlobalContext);
      return (
        <>
          <div data-testid="user">{user.email}</div>
          <div data-testid="error">{errorMessage}</div>
          <button
            onClick={() => login(email, password)}
            title="button"
            data-testid="login"
          ></button>
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
    expect(wrapper.find("[data-testid='error']").text()).toEqual(
      "Please enter your password"
    );
    expect(firebase.auth().signInWithEmailAndPassword).toBeCalledWith(
      email,
      password
    );
  });
});
