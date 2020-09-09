import React, { createContext, useReducer, useContext } from "react";
import Firebase from "../../firebase";

import { GlobalContext } from "./AuthProvider";

const db = Firebase.firestore();

export const QuotesActionContext = createContext({
  fetchQuotes: () => {},
  addQuote: () => {},
  fetchUserdata: () => {},
});
export const QuotesStateContext = createContext({
  quotes: [],
  successMesage: null,
  errorMessage: null,
  quote: null,
});

const initialState = {
  quotes: [],
  successMesage: null,
  errorMessage: null,
  quote: null,
};

const quotesReducer = (state, action) => {
  switch (action.type) {
    case "uploadQuotes":
      return { ...state, quotes: action.payload };
    case "errorMessage":
      return { ...state, errorMessage: action.payload };
    case "clearErrorMessage":
      return { ...state, errorMessage: null };
    case "setPersonalQuote":
      return { ...state, quote: action.payload };
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

  const fetchUserdata = async () => {
    try {
      db.collection("userdata")
        .doc(user.uid)
        .collection("quotes")
        .get()
        .then(function (query) {
          query.forEach(function (doc) {
            dispatch({ type: "setPersonalQuote", payload: doc.data() });
          });
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const addQuote = async (author, content) => {
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
    } else {
      try {
        console.log("triggered", author, content, user.uid);

        db.collection("quotes").doc(user.uid).set({
          author,
          quote: content,
        });

        db.collection("userdata")
          .doc(user.uid)
          .collection("quotes")
          .doc("quote1")
          .set({
            quoteAuthor: author,
            quoteContent: content,
          });
      } catch (e) {
        dispatch({
          type: "errorMessage",
          payload: e.message,
        });
        setTimeout(function () {
          dispatch({ type: "clearErrorMessage" });
        }, 2000);
      }
    }
  };

  return (
    <QuotesStateContext.Provider value={{ state }}>
      <QuotesActionContext.Provider
        value={{ fetchQuotes, addQuote, fetchUserdata }}
      >
        {children}
      </QuotesActionContext.Provider>
    </QuotesStateContext.Provider>
  );
};
