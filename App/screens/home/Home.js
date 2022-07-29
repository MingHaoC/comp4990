import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { ProjectHeader, Paper, ProjectButton } from '../../components';
import { useAppContext } from '../../context';
import styles from '../../styles';
import { registerForPushNotificationsAsync } from "../../ultis/Notification";
import { registerExpoToken } from "../../usecases/notification";
import * as Notifications from "expo-notifications";

const Home = ({navigation}) => { 

    const {
        user
    } = useAppContext()

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
        setFirstname(user.name);
        (async () => {
          await registerExpoToken(user.email, await registerForPushNotificationsAsync(Notifications));
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

    const [firstname, setFirstname] = useState("")

    return(
        <>
        <ProjectHeader navigation={navigation} />
        <View style={styles.container}>
            <Paper title={`Welcome ${firstname}!`} header={2} headerTitleStyle={styles.h1}>
                <View styles={[
                    styles.column,
                    styles.padding_horizontal_xlarge
                ]}>
                    <ProjectButton  title='My Profile' 
                                    type='info' 
                                    style={[
                                            styles.margin_horizontal_xlarge, 
                                            styles.margin_vertical_medium
                                            ]} 
                                    onPress={()=>{navigation.navigate('Profile')}}/>

                    <ProjectButton  title='My Events' 
                                    type='info' 
                                    style={[styles.margin_horizontal_xlarge, styles.margin_vertical_medium]} 
                                    onPress={()=>{navigation.navigate('MyEvents')}}/>

                    <ProjectButton  title='Find Events' 
                                    type='info' 
                                    style={[styles.margin_horizontal_xlarge, styles.margin_vertical_medium]} 
                                    onPress={()=>{navigation.navigate('FindEvents')}}/>
                </View>
            </Paper>

        </View>
    </>
);
}

export default Home