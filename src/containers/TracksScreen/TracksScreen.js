import React, { useContext, useEffect, useState, useCallback } from "react";

import { ScrollView, Text, StyleSheet, FlatList, View } from "react-native";
import { Background } from "../../components/Background/Background";

import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";

import constants from "../../constants";

const TracksScreen = () => {
  const [track, setTracks] = useState([]);
  const { fetchData } = useContext(LocationContext);
  const {
    state: { tracks },
  } = useContext(LocationStateContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    formatTracks(tracks);
  }, [tracks]);

  const formatTracks = (tracks) => {
    let tracksLocal = [];
    if (tracks) {
      tracks.map((track) => {
        const date = track.doc.Xe.proto.mapValue.fields.date.stringValue;
        const month = date.split(" ")[1];
        const day = date.split(" ")[2];
        const year = date.split(" ")[3];
        const time = date.split(" ")[4];
        tracksLocal.push(month + " " + day + " " + year + " " + time);
      });
    }
    setTracks(tracksLocal);
  };

  console.log(track);

  return (
    <>
      <Background />
      <ScrollView style={styles.mainContainer}>
        <Text>TracksScreen</Text>
        {track.map((item) => {
          return <Text>{item}</Text>;
        })}
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
