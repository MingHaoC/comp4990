import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './styles';
import { AppProvider } from './context';
import Login from './screens/Login';




export default function App() {
  return (
    <AppProvider>
    <StatusBar  />
    <View style={styles.container}>
      <Login />
    </View>
    </AppProvider>
  );
}

