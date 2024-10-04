import { View, Text } from "react-native";
import React from "react";

//import screens
import Destination from "../../screens/StackFlight/1_Destination";

// constante Stack Navigator
import { createStackNavigator } from "@react-navigation/stack";
import FlightList from "../../screens/StackFlight/2_FlightList";
import Passenger from "../../screens/StackFlight/3_Passenger";
import SeatSelector from "../../screens/StackFlight/4_SeatSelector";
const Stack = createStackNavigator();

// navegacion del tab Main
export default function NavFlight() {
  return (
    <Stack.Navigator initialRouteName="Destination">
      <Stack.Screen name="Destination" component={Destination}></Stack.Screen>
      <Stack.Screen name="Flights" component={FlightList}></Stack.Screen>
      <Stack.Screen name="Passengers" component={Passenger}></Stack.Screen>
      <Stack.Screen name="Seats" component={SeatSelector}></Stack.Screen>
    </Stack.Navigator>
  );
}
