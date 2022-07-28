import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Profile from './home/Profile';
import Home from './home/Home'
import FindEvents from './home/FindEvents';
import MyEvents from './home/MyEvents';
import { Text, View } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Register from './auth/Register'
import Login from './auth/Login'
import { useAppContext } from '../context';

const DrawerContent = (props) => {
  const {
    logout
  } = useAppContext()
    return(
        <View style={[{flex:1}, styles.muted_1_coloured_bg]}>
            <DrawerContentScrollView {...props} >

                <DrawerItem label="Home" onPress={() => props.navigation.navigate("Home")} />
                <DrawerItem label="Profile" onPress={() => props.navigation.navigate("Profile")}/>
                <DrawerItem label="My Events" onPress={() => props.navigation.navigate("MyEvents")}/>
                <DrawerItem label="Find Events" onPress={() => props.navigation.navigate("FindEvents")}/>
                <DrawerItem label="Logout" onPress={() => logout()}/>
            </DrawerContentScrollView>
        </View>
    )
}
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName='FindEvents' screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name='Home' component={Home} options={{drawerIcons: <Icon name='home' />}}/>
            <Drawer.Screen name='Profile' component={Profile} />
            <Drawer.Screen name='FindEvents' component={FindEvents} />
            <Drawer.Screen name='MyEvents' component={MyEvents} />
    </Drawer.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return(
    <AuthStack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }} >
            <AuthStack.Screen name="Register" component={Register} />
            <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator> 
  )
}

const AppContent = () => {
  const {
    user
  } = useAppContext()

  if(user != null){
    return <MyDrawer />
  }else{
    return <Auth />
  }
}

export default AppContent