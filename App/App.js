import "react-native-gesture-handler";
import { AppProvider } from "./context";
import { NavigationContainer } from "@react-navigation/native";
import AppContent from "./screens";
import FindEvents from "./screens/home/FindEvents";
import MyEvents from "./screens/home/MyEvents";
export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MyEvents />
      </NavigationContainer>
    </AppProvider>
  );
}
