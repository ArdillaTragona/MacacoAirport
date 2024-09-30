import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../screens/loginPages/login";

export default function NavigationPrincipal() {

  const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Login}>
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }