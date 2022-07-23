import 'react-native-gesture-handler';
import { AppProvider } from './context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyDrawer } from './screens';

const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();


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