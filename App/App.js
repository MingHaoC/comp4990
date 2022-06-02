import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Login from './screens/Register'
import styles from './styles'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Login />
    </View>
  );
}

