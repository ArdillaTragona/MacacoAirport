import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";

const Passenger = ({ navigation }) => {
  const route = useRoute();
  const { origin, destination, departureDate, departureTime, travelerType } =
    route.params;

  // Estado para almacenar nombres y apellidos de cada pasajero
  const [passengers, setPassengers] = useState({
    adults: Array(travelerType.adults).fill({ name: "", lastName: "" }),
    children: Array(travelerType.children).fill({ name: "", lastName: "" }),
    infants: Array(travelerType.infants).fill({ name: "", lastName: "" }),
  });

  // Manejar el cambio de texto para un pasajero específico
  const handleTextChange = (group, index, field, value) => {
    const updatedGroup = passengers[group].map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers({ ...passengers, [group]: updatedGroup });
  };

  const renderForm = (count, label, group) => {
    return Array.from({ length: count }).map((_, index) => (
      <View key={`${label}-${index}`} style={styles.containerForm}>
        <Text style={styles.formEncabezado}>{`${label} ${index + 1}`}</Text>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={passengers[group][index].name}
            onChangeText={(input) =>
              handleTextChange(group, index, "name", input)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={passengers[group][index].lastName}
            onChangeText={(input) =>
              handleTextChange(group, index, "lastName", input)
            }
          />
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* <Text>Origen: {origin}</Text>
      <Text>Destino: {destination}</Text>
      <Text>Adultos: {travelerType.adults}</Text>
      <Text>Niños: {travelerType.children}</Text>
      <Text>Infantes: {travelerType.infants}</Text> */}

      {renderForm(travelerType.adults, "Adulto", "adults")}
      {renderForm(travelerType.children, "Niño", "children")}
      {renderForm(travelerType.infants, "Infante", "infants")}

      <Button
        title={"Passenger selector"}
        onPress={() => navigation.navigate("Seats")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 20,
  },
  containerForm: {
    width: "100%",
    borderWidth: 4,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  input: {
    width: 150,
    padding: 5,
    paddingLeft: 15,
    borderWidth: 2,
    borderRadius: 15,
  },
  formEncabezado: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Passenger;
