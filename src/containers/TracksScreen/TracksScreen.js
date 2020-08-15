import React, { useContext, useEffect } from "react";

import { ScrollView, Text, StyleSheet } from "react-native";
import { Background } from "../../components/Background/Background";

import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";

import constants from "../../constants";

const formatTracks = (tracks) => {
  if (tracks) {
    tracks.map((track) =>
      console.log(track.doc.Xe.proto.mapValue.fields.date.stringValue)
    );
  }
};

const TracksScreen = () => {
  const { fetchData } = useContext(LocationContext);
  const {
    state: { tracks },
  } = useContext(LocationStateContext);

  useEffect(() => {
    fetchData();
  }, []);

  formatTracks();

  return (
    <>
      <Background />
      <ScrollView style={styles.mainContainer}>
        <Text>TracksScreen</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "90%",
    height: "60%",
    position: "absolute",
    alignSelf: "center",
    marginTop: "40%",
    backgroundColor: constants.primary.containerColor,
    borderRadius: 20,
  },
});

export default TracksScreen;
