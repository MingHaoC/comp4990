import * as React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { ProjectHeader } from "../../components";
const GOOGLE_API_KEY = "AIzaSyDJSMw5bJWGcs17vqjnB4kZSkusq0FGWEU";

const MapDirections = (props) => {
  console.log(props);
  const { userLocation, eventDestination } = props.route.params;
  console.log(
    JSON.stringify(userLocation, null, 4) +
      " " +
      JSON.stringify(eventDestination, null, 4)
  );

  let initialRegion = {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  console.log(initialRegion);

  return (
    <View style={styles.container}>
      <StatusBar />
      <ProjectHeader navigation={props.navigation} />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={initialRegion}
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
};

export default MapDirections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 40,
  },
});
