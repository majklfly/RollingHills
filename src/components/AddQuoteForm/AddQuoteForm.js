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
  const [visibleRules, setVisibleRules] = useState(false);
  const {
    state: { dayMode },
  } = useContext(GlobalContext);

  const {
    state: { successMessage, errorMessage },
  } = useContext(QuotesStateContext);

  const { addQuote } = useContext(QuotesActionContext);
  return (
    <View
      style={dayMode ? styles.mainContainerLight : styles.mainContainer}
      testID="AddQuoteContainer"
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setVisibleRules(!visibleRules)}>
          {visibleRules ? (
            <Text style={dayMode ? styles.rulesTextLight : styles.rulesText}>
              go back to the quote form
            </Text>
          ) : (
            <Text style={dayMode ? styles.rulesTextLight : styles.rulesText}>
              view couple simple rules
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setModalVisible(false)}>
          <FontAwesome name="close" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {visibleRules ? (
        <View
          style={{
            width: "80%",
            height: "70%",
            alignSelf: "center",
            marginTop: "10%",
          }}
        >
          <Text style={dayMode ? styles.singleRuleLight : styles.singleRule}>
            1) Each account can have only 1 quote in the hat.
          </Text>
          <Text style={dayMode ? styles.singleRuleLight : styles.singleRule}>
            2) Your quote can be updated at any time.
          </Text>
          <Text style={dayMode ? styles.singleRuleLight : styles.singleRule}>
            3) Please don't use any swear words.
          </Text>
          <Text style={dayMode ? styles.singleRuleLight : styles.singleRule}>
            4) and mostly, have fun!
          </Text>
        </View>
      ) : (
        <Form style={styles.form}>
          <Item stackedLabel>
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
              testID="QuoteAuthorInput"
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
            testID="QuoteContentInput"
          />
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
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
            onPress={() => (
              addQuote(author, content),
              content !== null && props.setModalVisible(false)
            )}
          >
            <Text style={dayMode ? styles.buttonTextLight : styles.buttonText}>
              Add new quote to the hat
            </Text>
          </Button>
        </Form>
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
  rulesText: {
    fontSize: 15,
    marginTop: "10%",
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
    textDecorationLine: "underline",
  },
  rulesTextLight: {
    fontSize: 15,
    marginTop: "10%",
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
    textDecorationLine: "underline",
  },
  singleRule: {
    fontSize: 15,
    marginTop: "10%",
    color: constants.primary.textColor,
    fontFamily: constants.primary.fontFamily,
  },
  singleRuleLight: {
    fontSize: 15,
    marginTop: "10%",
    color: constants.secondary.textColor,
    fontFamily: constants.secondary.fontFamily,
  },
  icon: {
    fontSize: 40,
    alignSelf: "flex-end",
    color: "white",
    marginRight: -10,
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
  errorMessage: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
    fontFamily: constants.primary.fontFamily,
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
