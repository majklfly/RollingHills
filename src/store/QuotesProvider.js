import React, { createContext, useReducer, useContext } from "react";
import Firebase from "../../firebase";

import { GlobalContext } from "./AuthProvider";

const db = Firebase.firestore();

export const QuotesActionContext = createContext({
  fetchQuotes: () => {},
  addQuote: () => {},
});
export const QuotesStateContext = createContext({
  quotes: [],
  successMesage: null,
  errorMessage: null,
});

const initialState = {
  quotes: [],
  successMesage: null,
  errorMessage: null,
};

const quotesReducer = (state, action) => {
  switch (action.type) {
    case "uploadQuotes":
      return { ...state, quotes: action.payload };
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "clearErrorMessage":
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

export const QuotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quotesReducer, initialState);
  const {
    state: { user },
  } = useContext(GlobalContext);

  const fetchQuotes = async () => {
    try {
      const data = await db.collection("quotes").get();
      dispatch({ type: "uploadQuotes", payload: data.Dd.docChanges });
    } catch (e) {
      console.log(e.message);
    }
  };

  const addQuote = async (author, content) => {
    console.log("content", content);
    if (content === null) {
      dispatch({
        type: "errorMessage",
        payload: "Please enter your favourite quote.",
      });
      setTimeout(function () {
        dispatch({ type: "clearErrorMessage" });
      }, 2000);
    } else if (author === null) {
      dispatch({
        type: "errorMessage",
        payload: "Please enter the author of the quote.",
      });
      setTimeout(function () {
        dispatch({ type: "clearErrorMessage" });
      }, 2000);
    }
    try {
      console.log("triggered", author, content, user.uid);
    } catch (e) {
      dispatch({
        type: "errorMessage",
        payload: e.message,
      });
      setTimeout(function () {
        dispatch({ type: "clearErrorMessage" });
      }, 2000);
    }
  };

  return (
    <QuotesStateContext.Provider value={{ state }}>
      <QuotesActionContext.Provider value={{ fetchQuotes, addQuote }}>
        {children}
      </QuotesActionContext.Provider>
    </QuotesStateContext.Provider>
  );
};
