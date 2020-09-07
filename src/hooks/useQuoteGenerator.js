import React, { useState, useCallback, useEffect } from "react";

export default () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [genIndex, setGenIndex] = useState(null);

  const data = [
    {
      title: "Rolling hills",
      body: "Dont' forget to drink water!",
    },
    {
      title: "Rolling hills",
      body: "Grab something to eat!",
    },
    {
      title: "Rolling hills",
      body: "Do you feel the love tonight?",
    },
  ];

  useEffect(() => {
    setGenIndex(Math.round(Math.random() * data.length));
  }, []);

  useEffect(() => {
    setSelectedQuote(data[genIndex]);
  }, [genIndex]);

  return [selectedQuote];
};
