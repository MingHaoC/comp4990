import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Marker } from "react-native-svg";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_API_KEY = "AIzaSyDJSMw5bJWGcs17vqjnB4kZSkusq0FGWEU";

export default function MapDirections({ userLocation, eventDestination }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        />
        <MapView.Marker
          coordinate={{
            latitude: eventDestination.latitude,
            longitude: eventDestination.longitude,
          }}
        />

        <MapViewDirections
          origin={userLocation}
          destination={eventDestination}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor="red"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
