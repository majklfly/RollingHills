import React, { createContext, useReducer } from "react";

export const TimerActionContext = createContext({
  timerFinished: () => {},
});

export const TimerStateContext = createContext({
  time: null,
});

const timeReducer = (state, action) => {
  switch (action.type) {
    case "timer_finished":
      return { ...state, time: action.payload };
    default:
      return state;
  }
};

const initialState = {
  time: null,
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timeReducer, initialState);
  const timerFinished = (value) => {
    dispatch({ type: "timer_finished", payload: value });
  };

  return (
    <TimerStateContext.Provider value={{ state }}>
      <TimerActionContext.Provider value={{ timerFinished }}>
        {children}
      </TimerActionContext.Provider>
    </TimerStateContext.Provider>
  );
};
