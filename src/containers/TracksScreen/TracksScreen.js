import React, { useContext, useEffect, useState, useCallback } from "react";

import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Background } from "../../components/Background/Background";
import { NavigationEvents } from "react-navigation";

import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";

import constants from "../../constants";

const TracksScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { fetchData } = useContext(LocationContext);
  const {
    state: { tracks, error },
  } = useContext(LocationStateContext);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    formatTracks(tracks);
  }, [tracks]);

  const formatTracks = (tracks) => {
    let dataLocal = [];
    if (tracks) {
      tracks.map((track) => {
        const data = track.doc.Xe.proto.mapValue.fields;
        dataLocal.push(data);
      });
    }
    setData(dataLocal);
  };

  return (
    <>
      <Background />
      <Text style={styles.title}>Finished Tracks</Text>
      <ScrollView style={styles.mainContainer}>
        {error ? (
          <Text style={styles.errorMessage}>{error}</Text>
        ) : (
          <>
            {data.map((item) => {
              console.log(item.date);
              return (
                <TouchableOpacity
                  style={styles.button}
                  key={item.date.stringValue}
                  onPress={() =>
                    navigation.navigate("trackDetailScreen", { data: item })
                  }
                >
                  <Text style={styles.buttonText}>
                    {item.date.stringValue.split("GMT")[0]}
                  </Text>
                  <Text style={styles.buttonTextName}>
                    {item.name.stringValue}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </>
        )}
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
    paddingVertical: "5%",
  },
  title: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    alignSelf: "center",
    fontSize: 30,
    position: "absolute",
    top: "10%",
  },
  button: {
    width: "90%",
    height: 60,
    padding: 5,
    alignSelf: "center",
    marginTop: 10,
    borderColor: constants.primary.textColor,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    marginLeft: "5%",
  },
  buttonTextName: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    alignSelf: "flex-end",
    marginRight: "5%",
  },
  errorMessage: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    alignSelf: "center",
    marginTop: "10%",
  },
});

export default TracksScreen;
