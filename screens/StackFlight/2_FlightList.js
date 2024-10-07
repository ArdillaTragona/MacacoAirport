import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const FlightList = ({ route, navigation }) => {
  // Desestructura los parámetros enviados desde SearchScreen
  const { origin, destination, departureDate, departureTime, travelerType } =
    route.params;

  const sendData = () => {
    navigation.navigate("Passenger", {
      origin,
      destination,
      departureDate,
      departureTime,
      travelerType,
    });
  };
  
  return (
    <View>
      {/* Botón para navegar a la pantalla Passenger */}
      <Button title="Continuar a Pasajeros" onPress={sendData} />
    </View>
  );
};

export default FlightList;
