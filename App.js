import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import NavP from "./components/navigation/NavP";
import LoginScreen from "./screens/loginPages/LoginScreen";
import SplashScreen from "./screens/loginPages/Splash_Screen";
import RegisterScreen from "./screens/loginPages/RegisterScreen";
import NavMain from "./components/navigation/TabMain";

export default function App() {
  return <NavP />;
}
