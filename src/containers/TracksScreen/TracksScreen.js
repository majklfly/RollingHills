import React, { useContext, useEffect, useState } from "react";

import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Background } from "../../components/Background/Background";
import { NavigationEvents } from "react-navigation";

import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";

import constants from "../../constants";

const TracksScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRun, setCurrentRun] = useState(null);
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
              return (
                <TouchableOpacity
                  style={styles.button}
                  key={item.date.stringValue}
                  onPress={() =>
                    navigation.navigate("trackDetailScreen", { data: item })
                  }
                  onLongPress={() => (
                    setModalVisible(true), setCurrentRun(item)
                  )}
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
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modal}>
            <Text style={styles.deleteText}>
              Would you like to delete this run?
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => (
                  deleteRun(currentRun),
                  setModalVisible(false),
                  navigation.navigate("homeScreen")
                )}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
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
  modal: {
    backgroundColor: constants.primary.containerColor,
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
  modalButtonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
});

export default TracksScreen;
