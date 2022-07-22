import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './context';
import Register from './screens/auth/Register';
import Login from './screens/auth/Login';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/Home';
import Profile from './screens/home/Profile';
import FindEvents from './screens/home/FindEvents';
import MyEvents from './screens/home/MyEvents';
import EventDetails from './screens/modals/EventDetails';
import RegisterForEvent from './screens/modals/RegisterForEvent';
import ConfirmEventRegistration from './screens/modals/ConfirmEventRegistration';
import EventFilter from './screens/modals/EventFilter';
import AvailabilityFilter from './screens/modals/AvailabilityFilter';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStackComponent, MainStackComponent, MyDrawer } from './screens';

const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();
// const HomeStack = createNativeStackNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={Home} />
//       <Drawer.Screen name="Article" component={Article} />
//     </Drawer.Navigator>
//   );
// }


export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </AppProvider>
  );
}

//#region Auth
      /* <AuthStack.Navigator initialRouteName='Register' screenOptions={{ headerShown: false }} >
            <AuthStack.Screen name="Register" component={Register} />
            <AuthStack.Screen name="Login" component={Login} />
        </AuthStack.Navigator> */
//#endregion

//#region Find Events
        /* <HomeStack.Navigator initialRouteName='FindEvents' screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name='Home' component={Home} />
          <HomeStack.Screen name='Profile' component={Profile} />
          <HomeStack.Screen name='FindEvents' component={FindEvents} />
          <HomeStack.Screen name='MyEvents' component={MyEvents} />
          <HomeStack.Screen name='EventDetails' component={EventDetails} />
          <HomeStack.Screen name='RegisterForEvent' component={RegisterForEvent} />
          <HomeStack.Screen name='ConfirmEventRegistration' component={ConfirmEventRegistration} />
          <HomeStack.Screen name='EventFilter' component={EventFilter} />
          <HomeStack.Screen name='AvailabilityFilter' component={AvailabilityFilter} />

        </HomeStack.Navigator> */
//#endregion