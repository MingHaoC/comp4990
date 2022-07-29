import "react-native-gesture-handler";
import { AppProvider } from "./context";
import { NavigationContainer } from "@react-navigation/native";
import AppContent from "./screens";

export default function App() {
  console.disableYellowBox = true;

  return (
    <AppProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AppProvider>
  );
}
