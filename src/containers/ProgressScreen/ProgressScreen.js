import React, { useState, useContext, useEffect } from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";

import {
  LocationContext,
  LocationStateContext,
} from "../../store/LocationProvider";

import { Background } from "../../components/Background/Background";
import { BadgeButton } from "../../components/BadgeButton/BadgeButton";
import { AddQuoteForm } from "../../components/AddQuoteForm/AddQuoteForm";

import { GlobalContext } from "../../store/AuthProvider";

import constants from "../../constants";

import {
  calculateTotalDistance,
  calculateTotalTime,
} from "../StatisticsScreen/utils";

import {
  calculate1HourBadge,
  calculate3HourBadge,
  calculate5kmBadge,
  calculate10kmBadge,
  evaluateRunWeekOnce,
  evaluateRunWeekTwice,
  evaluateRunEveryDay,
} from "./utils";

const { width, height } = Dimensions.get("window");

const ProgressScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [localValues, setLocalValues] = useState({});
  const [data, setData] = useState([]);
  const { state } = useContext(LocationStateContext);
  const { fetchData } = useContext(LocationContext);
  const {
    state: { dayMode },
  } = useContext(GlobalContext);

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

  useEffect(() => {
    formatTracks(state.tracks);
    const totalDistance = calculateTotalDistance(data);
    const totalTime = calculateTotalTime(data);
    setLocalValues({ totalDistance, totalTime });
  }, [state.tracks]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View testID="ProgressScreenContainer">
      <Background />
      {modalVisible === false && (
        <TouchableOpacity
          style={dayMode ? styles.hatButtonLight : styles.hatButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.hatButtonText}>Add another quote to the hat</Text>
        </TouchableOpacity>
      )}
      {modalVisible === false ? (
        <ScrollView
          style={dayMode ? styles.mainContainerLight : styles.mainContainer}
        >
          <View style={styles.row}>
            <BadgeButton title="downloaded App" percentage={100} />
            <BadgeButton
              title="run 1 hour"
              percentage={calculate1HourBadge(localValues.totalTime)}
            />
          </View>
          <View style={styles.row}>
            <BadgeButton
              title="run this week"
              percentage={evaluateRunWeekOnce(data)}
            />
            <BadgeButton
              title="run 3 hours"
              percentage={calculate3HourBadge(localValues.totalTime)}
            />
          </View>
          <View style={styles.row}>
            <BadgeButton
              title="run 5km"
              percentage={calculate5kmBadge(localValues.totalDistance)}
            />
            <BadgeButton
              title="run this week twice"
              percentage={evaluateRunWeekTwice(data)}
            />
          </View>
          <View style={styles.row}>
            <BadgeButton
              title="run 10km"
              percentage={calculate10kmBadge(localValues.totalDistance)}
            />
            <BadgeButton
              title="run this week every day"
              percentage={evaluateRunEveryDay(data)}
            />
          </View>
        </ScrollView>
      ) : (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <AddQuoteForm setModalVisible={setModalVisible} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width * 0.9,
    height: height * 0.7,
    position: "absolute",
    alignSelf: "center",
    marginTop: "40%",
    borderRadius: 20,
    backgroundColor: constants.primary.containerColor,
    flexWrap: "wrap",
  },
  mainContainerLight: {
    width: width * 0.9,
    height: height * 0.7,
    position: "absolute",
    alignSelf: "center",
    marginTop: "40%",
    borderRadius: 20,
    backgroundColor: constants.secondary.containerColor,
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
  },
  hatButton: {
    position: "absolute",
    width: width * 0.9,
    height: "2%",
    backgroundColor: constants.primary.buttonColor,
    alignSelf: "center",
    marginTop: "20%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  hatButtonLight: {
    position: "absolute",
    width: width * 0.9,
    height: "2%",
    backgroundColor: constants.secondary.buttonColor,
    alignSelf: "center",
    marginTop: "20%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  hatButtonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  hatButtonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
});

export default ProgressScreen;
