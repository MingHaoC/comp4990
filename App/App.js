import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { registerForPushNotificationsAsync } from "./ultis/Notification";
import { registerExpoToken } from "./usecases/notification";
import * as Notifications from "expo-notifications";
import "react-native-gesture-handler";
import { AppProvider } from "./context";
import { NavigationContainer } from "@react-navigation/native";
import AppContent from "./screens";

export default function App() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // todo: this needs to be called when the user is login
  useEffect(() => {
    (async () => {
      // todo: the hardcoded email should be updated to fetch the login user email
      await registerExpoToken("example@example.com", await registerForPushNotificationsAsync(Notifications));
    })();

    notificationListener.current =
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AppProvider>
  );
}
