import * as React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import MapViewDirections from "react-native-maps-directions";
const GOOGLE_API_KEY = "AIzaSyDJSMw5bJWGcs17vqjnB4kZSkusq0FGWEU";

const MapDirections = (props) => {
  const {userLocation, eventDestination} = props.route.params;
  console.log(JSON.stringify(userLocation, null, 4) + " " + JSON.stringify(eventDestination, null, 4))
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
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        />
        <Marker
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

export default MapDirections

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
