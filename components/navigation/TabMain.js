import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import TicketScreen from "../../screens/TabMain/TicketScreen";
import SettingScreen from "../../screens/TabMain/SettingScreen";
import HomeHeader from "../headers/HomeHeader";
import NavFlight from "./NavFlight";

const Tab = createBottomTabNavigator();

export default function TabMain() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: true,
        tabBarInactiveTintColor: "#7A7A7A",
        tabBarActiveTintColor: "#2EABFFFF",

        tabBarLabelStyle: {
          fontSize: 12, // Ajusta el tamaño del texto
          position: "relative", // Cambia a 'absolute' si es necesario
          top: -10, // Ajusta este valor para mover el texto hacia arriba
        },

        tabBarStyle: {
          //marginBottom: 20,
          //marginLeft: 20, marginRight: 20,

          height: 65, // Puedes ajustar la altura según sea necesario
        },
      }}
    >
      <Tab.Screen
        name="TicketScreen"
        component={TicketScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ticket" size={24} color={color} />
          ),
          tabBarLabel: "Ticket",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="HomeScreen"
        component={NavFlight}
        options={{
          headerShown: true,
          header:()=><HomeHeader/>,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="airplane" size={size} color={color} />
          ),
          tabBarLabel: "Flight",
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-settings"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Setting",
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});
