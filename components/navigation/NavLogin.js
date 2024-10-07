import { View, Text,StatusBar} from "react-native";
import React from "react";

// import screens
import SplashScreen from "../../screens/loginPages/Splash_Screen"; //Splash
import LoginScreen from "../../screens/loginPages/LoginScreen"; //Login
import RegisterScreen from "../../screens/loginPages/RegisterScreen"; //Registro

// constante Stack Navigator
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

// Componente de navigacion para el Login
export default function NavLogin({ setIsAuthenticated }) {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }} // Oculta la barra de encabezado en la Splash Screen
      />

      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
          title: "Login Home",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#09f" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {(props) => (
          <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Register"
        options={{
          headerShown: false,
          title: "Login Home",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#09f" },
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {(props) => (
          <RegisterScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
