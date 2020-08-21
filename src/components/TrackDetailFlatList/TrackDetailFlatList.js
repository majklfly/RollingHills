import React from "react";

import { View, FlatList, StyleSheet, Dimensions } from "react-native";

import MapView, { Polyline } from "react-native-maps";
import { mapStyle } from "..//Map/MapStyle";

import { AntDesign } from "@expo/vector-icons";
import constants from "../../constants";

import { SpeedStatistics } from "../SpeedStatistics/SpeedStatistics";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const TrackDetailFlatList = (props) => {
  const formatCoordinates = (loc) => {
    const latitude =
      loc.mapValue.fields.coords.mapValue.fields.latitude.doubleValue;
    const longitude =
      loc.mapValue.fields.coords.mapValue.fields.longitude.doubleValue;
    return { latitude: latitude, longitude: longitude };
  };

  const initialCoords = props.route.params.data.locations.arrayValue.values[0];
  const initialLatitude =
    initialCoords.mapValue.fields.coords.mapValue.fields.latitude.doubleValue;
  const initialLongitude =
    initialCoords.mapValue.fields.coords.mapValue.fields.longitude.doubleValue;

  const calibrateDelta = () => {
    const distance = parseInt(props.route.params.data.distance.integerValue);
    if (distance < 500) {
      return 0.008;
    } else if (distance > 500) {
      return 0.02;
    } else if (distance > 1000) {
      return 0.03;
    }
  };

  const FlatlistSlides = [
    {
      id: "map",
    },
    {
      id: "speedStatistic",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={FlatlistSlides}
        style={styles.flatList}
        pagingEnabled={true}
        horizontal={true}
        keyExtractor={(index) => {
          index.toString();
        }}
        renderItem={({ item }) => {
          if (item.id === "map") {
            return (
              <View style={styles.slideView} key={item.id}>
                <MapView
                  style={styles.map}
                  customMapStyle={mapStyle}
                  initialRegion={{
                    latitude: initialLatitude,
                    longitude: initialLongitude,
                    longitudeDelta: calibrateDelta(),
                    latitudeDelta: calibrateDelta(),
                  }}
                >
                  {props.route.params.data.locations.arrayValue.values && (
                    <Polyline
                      coordinates={props.route.params.data.locations.arrayValue.values.map(
                        (loc) => formatCoordinates(loc)
                      )}
                      strokeWidth={4}
                      strokeColor="rgba(158,158,255,1)"
                    />
                  )}
                </MapView>
                <AntDesign name="swapright" style={styles.iconSwipeRight} />
              </View>
            );
          } else if (item.id === "speedStatistic") {
            return (
              <View style={styles.slideView} key={item.id}>
                <SpeedStatistics data={props.route.params.data} />
                <AntDesign name="swapleft" style={styles.iconSwipeLeft} />
              </View>
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    height: height / 2,
  },
  slideView: {
    height: 350,
    width: width,
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  map: {
    width: width - 40,
    height: 300,
  },
  iconSwipeRight: {
    fontSize: 40,
    position: "absolute",
    bottom: -18,
    right: 40,
    color: constants.primary.textColor,
  },
  iconSwipeLeft: {
    fontSize: 40,
    position: "absolute",
    bottom: -18,
    left: 40,
    color: constants.primary.textColor,
  },
});
