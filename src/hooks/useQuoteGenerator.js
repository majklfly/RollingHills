import { useState, useEffect, useContext } from "react";

import { QuotesActionContext } from "../store/QuotesProvider";
import { QuotesStateContext } from "../store/QuotesProvider";

export default () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [genIndex, setGenIndex] = useState(null);
  const [data, setData] = useState([]);
  const { fetchQuotes } = useContext(QuotesActionContext);
  const {
    state: { quotes },
  } = useContext(QuotesStateContext);

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes) {
      const data = [];
      quotes.map((item) => {
        const author = item.doc.Xe.proto.mapValue.fields.author.stringValue;
        const quote = item.doc.Xe.proto.mapValue.fields.quote.stringValue;
        const unit = { title: author, body: quote };
        data.push(unit);
      });
      setData(data);
    }
  }, [quotes]);

  useEffect(() => {
    setGenIndex(Math.round(Math.random() * data.length));
  }, [data]);

  useEffect(() => {
    setSelectedQuote(data[genIndex]);
  }, [genIndex]);

  return [selectedQuote];
};
