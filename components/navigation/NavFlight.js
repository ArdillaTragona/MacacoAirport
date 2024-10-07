import { View, Text } from "react-native";
import React from "react";

//import screens
import Destination from "../../screens/StackFlight/1_Destination";

// constante Stack Navigator
import { createStackNavigator } from "@react-navigation/stack";
import FlightList from "../../screens/StackFlight/2_FlightList";
import SeatSelector from "../../screens/StackFlight/4_SeatSelector";
import SearchScreen from "../api/FlightsVuelos";
import Ticket from "../../screens/StackFlight/5_Payment";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Passenger from "../../screens/StackFlight/3_Passenger";
import Payment from "../../screens/StackFlight/5_Payment";
import ResultsScreen from "../api/ResultFligths";

const backArrow = (
  <MaterialCommunityIcons name="arrow-left" size={24} color="#61B3FFFF" />
);

const Stack = createStackNavigator();

// navegacion del tab Main
export default function NavFlight() {
  return (
    <Stack.Navigator initialRouteName="Destination">
      <Stack.Screen
        name="Destination"
        component={SearchScreen}
        options={{
          headerShown: true,
          headerTitle: "Search flight",
          headerTransparent: true,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Flights"
        component={FlightList}
        options={{
          animationEnabled: true,
          headerBackImage: () => backArrow,
          headerTitle: "",
          headerTransparent: true,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Passenger"
        component={Passenger}
        options={{
          animationEnabled: true,
          headerBackImage: () => backArrow,
          headerTitle: "Passenger data",
          headerTransparent: true,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Seats"
        component={SeatSelector}
        options={{
          gestureEnabled: true,
          animationEnabled: true,
          headerBackImage: () => backArrow,
          headerTitle: "Select your seats",
          headerTransparent: true,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          gestureEnabled: true,
          animationEnabled: true,
          headerBackImage: () => backArrow,
          headerTitle: "",
          headerTransparent: true,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
