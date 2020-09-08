import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import constants from "../../constants";
import { FontAwesome } from "@expo/vector-icons";

import { Form, Item, Button, Label, Input } from "native-base";

import { GlobalContext } from "../../store/AuthProvider";
import {
  QuotesActionContext,
  QuotesStateContext,
} from "../../store/QuotesProvider";

const { width, height } = Dimensions.get("window");

export const AddQuoteForm = (props) => {
  const [author, setAuthor] = useState(null);
  const [content, setContent] = useState(null);
  const {
    state: { dayMode },
  } = useContext(GlobalContext);

  const {
    state: { successMessage, errorMessage },
  } = useContext(QuotesStateContext);

  const { addQuote } = useContext(QuotesActionContext);
  return (
    <View style={dayMode ? styles.mainContainerLight : styles.mainContainer}>
      <TouchableOpacity onPress={() => props.setModalVisible(false)}>
        <FontAwesome name="close" style={styles.icon} />
      </TouchableOpacity>
      <Form style={styles.form}>
        <Item floatingLabel>
          <Label style={dayMode ? styles.labelLight : styles.label}>
            Author
          </Label>
          <Input
            style={{
              color: dayMode
                ? constants.secondary.textColor
                : constants.primary.textColor,
            }}
            value={author}
            autoCorrent={false}
            autoCapitalize="none"
            onChangeText={(value) => setAuthor(value)}
          ></Input>
        </Item>
        <TextInput
          style={dayMode ? styles.contentInputLight : styles.contentInput}
          onChangeText={(text) => setContent(text)}
          value={content}
          textAlign="center"
          textBreakStrategy="balanced"
          spellCheck={true}
          multiline={true}
        />
        <Button
          full
          rounded
          style={{
            marginTop: 20,
            width: "80%",
            alignSelf: "center",
            backgroundColor: dayMode
              ? constants.secondary.buttonColor
              : constants.primary.buttonColor,
          }}
          onPress={() => addQuote(author, content)}
        >
          <Text style={dayMode ? styles.buttonTextLight : styles.buttonText}>
            Add new quote to the hat
          </Text>
        </Button>
        {successMessage !== "null" ? (
          <Text
            style={dayMode ? styles.successMessageLight : styles.successMessage}
          >
            {successMessage}
          </Text>
        ) : null}
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width * 0.9,
    height: height * 0.7,
    position: "absolute",
    alignSelf: "center",
    marginTop: "20%",
    borderRadius: 20,
    backgroundColor: constants.primary.containerColor,
  },
  mainContainerLight: {
    width: width * 0.9,
    height: height * 0.7,
    position: "absolute",
    alignSelf: "center",
    marginTop: "20%",
    borderRadius: 20,
    backgroundColor: constants.secondary.containerColor,
  },
  icon: {
    fontSize: 40,
    alignSelf: "flex-end",
    color: "white",
    marginRight: 20,
    marginTop: 20,
  },
  form: {
    width: "90%",
    alignSelf: "center",
  },
  label: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    padding: 5,
  },
  labelLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    padding: 5,
  },
  contentInput: {
    height: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: "5%",
    elevation: 3,
    borderRadius: 4,
    color: constants.primary.textColor,
    textDecorationLine: "none",
    fontFamily: constants.primary.fontFamily,
  },
  contentInputLight: {
    height: "50%",
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: "5%",
    marginVertical: "5%",
    elevation: 3,
    borderRadius: 4,
    color: constants.secondary.textColor,
    textDecorationLine: "none",
    fontFamily: constants.secondary.fontFamily,
  },
  buttonText: {
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  buttonTextLight: {
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
});
