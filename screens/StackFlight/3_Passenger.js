import React from "react";
import { View, Text, StyleSheet,Button } from "react-native";
import { useRoute } from "@react-navigation/native";

const Passenger = ({ navigation }) => {
  const route = useRoute();
  // Desestructuración de parámetros de la navegación
  const { origin, destination, departureDate, departureTime, travelerType } =
    route.params; // Aquí estamos capturando todos los parámetros

  return (
    <View style={styles.container}>
      <Text>Origen: {origin}</Text>
      <Text>Destino: {destination}</Text>
      <Text>Adultos: {travelerType.adults}</Text>
      <Text>Niños: {travelerType.children}</Text>
      <Text>Infantes: {travelerType.infants}</Text>

      <Button title={"Passenger selector"} onPress={()=> navigation.navigate("Seats")}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Passenger;
