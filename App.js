import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import NavP from "./components/navigation/NavP";
import LoginScreen from "./screens/loginPages/LoginScreen";
import SplashScreen from "./screens/loginPages/Splash_Screen";
import RegisterScreen from "./screens/loginPages/RegisterScreen";
import NavMain from "./components/navigation/TabMain";
import HomeScreen from "./screens/TabMain/HomeScreen";
import Destination from "./screens/StackFlight/1_Destination";
import DestinationHeader from "./components/headers/DestinationHeader";
import SearchScreen from "./components/api/FlightsVuelos";
import SeatDescription from "./components/headers/SeatDescription";

export default function App() {
  return <NavP />;
}
