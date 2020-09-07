import React, { createContext, useReducer } from "react";
import Firebase from "../../firebase";

const db = Firebase.firestore();

export const QuotesActionContext = createContext({
  fetchQuotes: () => {},
});
export const QuotesStateContext = createContext({
  quotes: [],
});

const initialState = {
  quotes: [],
};

const quotesReducer = (state, action) => {
  switch (action.type) {
    case "uploadQuotes":
      return { ...state, quotes: action.payload };
    default:
      return state;
  }
};

export const QuotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quotesReducer, initialState);

  const fetchQuotes = async () => {
    try {
      const data = await db.collection("quotes").get();
      dispatch({ type: "uploadQuotes", payload: data.Dd.docChanges });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <QuotesStateContext.Provider value={{ state }}>
      <QuotesActionContext.Provider value={{ fetchQuotes }}>
        {children}
      </QuotesActionContext.Provider>
    </QuotesStateContext.Provider>
  );
};
