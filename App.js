import React, { useState, useEffect } from "react";
import { Providers } from "./src/store/Providers";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      MontSerrat: require("./assets/fonts/Montserrat/Montserrat-Medium.ttf"),
      Source: require("./assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf"),
      Harmattan: require("./assets/fonts/Harmattan/Harmattan-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    getFonts();
  }, []);

  if (fontsLoaded) {
    return <Providers />;
  }
  return <ActivityIndicator size="large" />;
};

export default App;
