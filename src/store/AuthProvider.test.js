import React, { useContext } from "react";
import { AuthContext, GlobalContext, AuthProvider } from "./AuthProvider";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import { firebase } from "../../firebase";

configure({ adapter: new Adapter() });

// describe("Login", () => {
//   it("loads the user data to the global", async () => {
//     const TestComponent = () => {
//       const { login } = useContext(AuthContext);
//       const {
//         state: { user },
//       } = useContext(GlobalContext);
//       return (
//         <>
//           <div data-testid="user">{user.favorite_food}</div>
//           <button onClick={login} title="button" data-testid="login"></button>
//         </>
//       );
//     };

//     const wrapper = mount(
//       <AuthProvider>
//         <TestComponent />
//       </AuthProvider>
//     );

//     expect(wrapper.find("[data-testid='user']").text()).toEqual("");

//     wrapper.find("[data-testid='login']").simulate("click");
//     firebase.firestore().autoFlush();
//     firebase
//       .firestore()
//       .analytics()
//       .setUserProperties({ favorite_food: "apples" });
//     expect(wrapper.find("[data-testid='user']").text()).toEqual("Peter");
//   });
// });

const db = firebase.initializeApp(config).firestore();

describe("New city", () => {
  it("should create a new city in firestore", async () => {
    await db.collection("cities").doc("Seattle").set({ state: "WA" });
    const city = await db.collection("cities").doc("Seattle").get();

    expect(city.data()["population"]).toEqual("WA");
  });
});
