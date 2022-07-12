import * as Device from 'expo-device';
import { Platform } from "react-native";

exports.registerForPushNotificationsAsync = async (Notifications) =>  {
  let token = null;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log("Mission permission");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("init " + token);
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}