import React, { useContext, useEffect, useState } from "react";

import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  AsyncStorage,
} from "react-native";
import { Background } from "../../components/Background/Background";

import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";

import constants from "../../constants";

const TracksScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRun, setCurrentRun] = useState(null);
  const [dayMode, setDayMode] = useState(false);
  const { fetchData, deleteRun } = useContext(LocationContext);
  const {
    state: { tracks, error },
  } = useContext(LocationStateContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const retrieveDayMode = async () => {
      const result = await AsyncStorage.getItem("dayMode");
      const value = result === "true" ? true : false;
      setDayMode(value);
    };
    retrieveDayMode();
  });

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
      <Text style={dayMode ? styles.titleLight : styles.title}>
        Finished Tracks
      </Text>
      <ScrollView
        style={dayMode ? styles.mainContainerLight : styles.mainContainer}
      >
        {error ? (
          <Text style={styles.errorMessage}>{error}</Text>
        ) : (
          <>
            {data.map((item) => {
              return (
                <TouchableOpacity
                  style={dayMode ? styles.buttonLight : styles.button}
                  key={item.date.stringValue}
                  onPress={() =>
                    navigation.navigate("trackDetailScreen", { data: item })
                  }
                  onLongPress={() => (
                    setModalVisible(true), setCurrentRun(item)
                  )}
                >
                  <Text
                    style={dayMode ? styles.buttonTextLight : styles.buttonText}
                  >
                    {item.date.stringValue.split("GMT")[0]}
                  </Text>
                  <Text
                    style={
                      dayMode
                        ? styles.buttonTextNameLight
                        : styles.buttonTextName
                    }
                  >
                    {item.name.stringValue}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </>
        )}
        <Modal visible={modalVisible} transparent={true}>
          <View style={dayMode ? styles.modalLight : styles.modal}>
            <Text style={dayMode ? styles.deleteTextLight : styles.deleteText}>
              Would you like to delete this run?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={dayMode ? styles.modalButtonLight : styles.modalButton}
                onPress={() => (
                  deleteRun(currentRun),
                  setModalVisible(false),
                  navigation.navigate("homeScreen")
                )}
              >
                <Text
                  style={
                    dayMode
                      ? styles.modalButtonTextLight
                      : styles.modalButtonText
                  }
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={dayMode ? styles.modalButtonLight : styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={
                    dayMode
                      ? styles.modalButtonTextLight
                      : styles.modalButtonText
                  }
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  mainContainerLight: {
    width: "90%",
    height: "60%",
    position: "absolute",
    alignSelf: "center",
    marginTop: "40%",
    backgroundColor: constants.secondary.containerColor,
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
  titleLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
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
  buttonLight: {
    width: "90%",
    height: 60,
    padding: 5,
    alignSelf: "center",
    marginTop: 10,
    borderColor: constants.secondary.textColor,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    marginLeft: "5%",
  },
  buttonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    marginLeft: "5%",
  },
  buttonTextName: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    alignSelf: "flex-end",
    marginRight: "5%",
  },
  buttonTextNameLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    alignSelf: "flex-end",
    marginRight: "5%",
  },
  errorMessage: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    alignSelf: "center",
    marginTop: "10%",
  },
  modal: {
    backgroundColor: constants.primary.containerColor,
    width: "90%",
    height: "65%",
    alignSelf: "center",
    marginTop: "32%",
    borderRadius: 20,
    paddingVertical: "5%",
  },
  modalLight: {
    backgroundColor: constants.secondary.containerColor,
    width: "90%",
    height: "65%",
    alignSelf: "center",
    marginTop: "32%",
    borderRadius: 20,
    paddingVertical: "5%",
  },
  deleteText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: "5%",
  },
  deleteTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: "5%",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "10%",
  },
  modalButton: {
    backgroundColor: constants.primary.buttonColor,
    width: "30%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalButtonLight: {
    backgroundColor: constants.secondary.buttonColor,
    width: "30%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalButtonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  modalButtonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
});

export default TracksScreen;
