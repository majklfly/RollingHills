import React, { useState } from "react";

import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";

import { Background } from "../../components/Background/Background";
import { BadgeButton } from "../../components/BadgeButton/BadgeButton";
import { AddQuoteForm } from "../../components/AddQuoteForm/AddQuoteForm";

import constants from "../../constants";

const { width, height } = Dimensions.get("window");

const ProgressScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Background />
      {modalVisible === false && (
        <TouchableOpacity
          style={styles.hatButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.hatButtonText}>Add another quote to the hat</Text>
        </TouchableOpacity>
      )}
      {modalVisible === false ? (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.row}>
            <BadgeButton title="downloaded App" percentage={100} />
            <BadgeButton title="run 1 hour" percentage={80} />
          </View>
          <View style={styles.row}>
            <BadgeButton title="run once per week" percentage={81} />
            <BadgeButton title="run 3 hours" percentage={52} />
          </View>
          <View style={styles.row}>
            <BadgeButton title="run 5km" percentage={30} />
            <BadgeButton title="run twice per week" percentage={50} />
          </View>
          <View style={styles.row}>
            <BadgeButton title="run 10km" percentage={10} />
            <BadgeButton title="run everyday for one week" percentage={23} />
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
  hatButtonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
});

export default ProgressScreen;
