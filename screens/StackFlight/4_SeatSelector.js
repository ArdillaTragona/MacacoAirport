import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SeatDescription from "../../components/headers/SeatDescription";
import DestinationHeader from "../../components/headers/DestinationHeader";

const SeatSelector = ({ navigation }) => {
  // Usar `useRoute` dentro del componente
  const route = useRoute();
  const { passengers } = route.params; // Obtener datos enviados desde la navegación

  useEffect(() => {
    console.log("Passengers received:", passengers); // Verificar datos recibidos
  }, [passengers]);

  // Crear un estado para los asientos, ahora de 20x4
  const [seats] = useState([
    ["A1", "A2", "A3", "A4", "A5", "A6"],
    ["B1", "B2", "B3", "B4", "B5", "B6"],
    ["C1", "C2", "C3", "C4", "C5", "C6"],
    ["D1", "D2", "D3", "D4", "D5", "D6"],
    ["E1", "E2", "E3", "E4", "E5", "E6"],
    ["F1", "F2", "F3", "F4", "F5", "F6"],
    ["G1", "G2", "G3", "G4", "G5", "G6"],
    ["H1", "H2", "H3", "H4", "H5", "H6"],
    ["I1", "I2", "I3", "I4", "I5", "I6"],
    ["J1", "J2", "J3", "J4", "J5", "J6"],
    ["K1", "K2", "K3", "K4", "K5", "K6"],
    ["L1", "L2", "L3", "L4", "L5", "L6"],
    ["M1", "M2", "M3", "M4", "M5", "M6"],
    ["N1", "N2", "N3", "N4", "N5", "N6"],
    ["O1", "O2", "O3", "O4", "O5", "O6"],
    ["P1", "P2", "P3", "P4", "P5", "P6"],
    ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    ["R1", "R2", "R3", "R4", "R5", "R6"],
    ["S1", "S2", "S3", "S4", "S5", "S6"],
    ["T1", "T2", "T3", "T4", "T5", "T6"],
  ]);

  // Estado para los asientos seleccionados y ocupados
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [occupiedSeats] = useState(["A2", "C3", "D4", "L2", "P4"]); // Algunos asientos ocupados
  const [ventanilla] = useState([
    "D1",
    "D6",
    "H1",
    "H6",
    "L1",
    "L6",
    "P1",
    "P6",
    "S1",
    "S6",
  ]); //Asientos de ventanilla

  // Función para seleccionar asiento
  const handleSelectSeat = (seat) => {
    if (!occupiedSeats.includes(seat)) {
      setSelectedSeat(seat === selectedSeat ? null : seat);
    }
  };

  // Función para renderizar cada asiento
  const renderSeat = (seat) => {
    const isOccupied = occupiedSeats.includes(seat);
    const isSelected = seat === selectedSeat;
    const isWindowSeat = ventanilla.includes(seat); // Verificar si es asiento de ventanilla

    return (
      <TouchableOpacity
        key={seat}
        onPress={() => handleSelectSeat(seat)}
        disabled={isOccupied} // No se puede seleccionar si está ocupado
        style={styles.seatContainer} // Mantener el contenedor para el espaciado
      >
        <MaterialCommunityIcons
          name="seat"
          size={30} // Ajusta el tamaño según tu diseño
          color={
            isOccupied
              ? "#202A66FF" // Ocupado
              : isSelected
              ? "#2EABFFFF" // Seleccionado
              : isWindowSeat
              ? "#5A9AC5FF" // Ventanilla, color dorado o el que prefieras
              : "#9FD9FFFF" // Disponible
          } // Cambia el color si está ocupado o seleccionado
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SeatDescription />
      <Text style={styles.text}></Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {seats.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((seat, seatIndex) => (
              <View
                key={seatIndex}
                style={
                  seatIndex === 1 || seatIndex === 3 ? styles.columnSpace : {}
                }
              >
                {renderSeat(seat)}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.containerResult}>
        {selectedSeat && (
          <Text style={styles.selectedText}>Selected Seat: {selectedSeat}</Text>
        )}
        <TouchableOpacity
          style={styles.botonConfirm}
          onPress={() => {
            navigation.navigate("Payment");
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Confirm seats
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  scrollContent: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  seatContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5, // Espaciado entre los íconos
  },
  columnSpace: {
    marginRight: 30, // Mayor espacio entre las columnas
  },
  selectedText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    width: "100%",
    height: 2,
    backgroundColor: "#2EABFFFF",
  },
  containerResult: {
    width: "75%",
    borderRadius: 15,
  },
  botonConfirm: {
    padding: 10,
    backgroundColor: "#2EABFFFF",
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SeatSelector;
