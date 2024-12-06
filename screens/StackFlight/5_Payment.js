import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { saveFlightDataToFirestore } from "../../database/FlightDB"; // Importar función para guardar datos

const PassengerList = ({ group, label, datosVuelo }) => {
  return (
    <View style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{label}</Text>
      <FlatList
        data={group}
        nestedScrollEnabled={true}
        keyExtractor={(_, index) => `${label}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.passengerItem}>
            <View style={{ width: 212 }}>
              <View>
                <Text style={styles.txtEncabezados}>Passenger</Text>
                <Text style={styles.txtDatos}>
                  {`${item.name.toUpperCase()} ${item.lastName.toUpperCase()}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                <View>
                  <Text style={styles.txtEncabezados}>Flight</Text>
                  <Text style={styles.txtDatos}>{datosVuelo.flightNumber}</Text>
                </View>
                <View>
                  <Text style={styles.txtEncabezados}>Boarding</Text>
                  <Text style={styles.txtDatos}>{datosVuelo.bording}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                <View>
                  <Text style={styles.txtEncabezados}>Destination</Text>
                  <Text style={styles.txtDatos}>
                    {datosVuelo.origin} - {datosVuelo.destination}
                  </Text>
                </View>
                <View>
                  {datosVuelo.returnDate && (
                    <View>
                      <Text style={styles.txtEncabezados}>Return date:</Text>
                      <Text>{datosVuelo.bordingReturn}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const Payment = () => {
  const route = useRoute();
  const {
    adults,
    children,
    passengers,
    origin,
    destination,
    departureDate,
    returnDate,
    classOfService,
    duration,
    flightNumber,
    bording,
    bordingReturn,
  } = route.params;

  const datosVuelo = {
    origin,
    destination,
    departureDate,
    returnDate,
    classOfService,
    duration,
    flightNumber,
    bording,
    bordingReturn,
  };

  const allPassengers = [
    ...passengers.adults.map((p) => ({ ...p, category: "Adult" })),
    ...passengers.children.map((p) => ({ ...p, category: "Child" })),
  ];

  const handleSaveToFirebase = async () => {
    const success = await saveFlightDataToFirestore(datosVuelo, allPassengers);
    if (success) {
      Alert.alert("Éxito", "Datos guardados correctamente en Firebase.");
    } else {
      Alert.alert("Error", "Hubo un problema al guardar los datos.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { group: passengers.adults, label: "Adults" },
          { group: passengers.children, label: "Children" },
        ]}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <PassengerList
            group={item.group}
            label={item.label}
            datosVuelo={datosVuelo}
          />
        )}
        style={styles.contLista}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>Tickets Generated</Text>
          </View>
        }
      />
      <View style={styles.buttonContainer}>
        <Button title="BOTON CHILL DE COJONES" onPress={handleSaveToFirebase} />
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2EABFFFF",
  },
  contLista: {
    flex: 1,
    padding: 20,
    paddingTop: 3,
  },
  header: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFFFF",
  },
  groupContainer: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  passengerItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 8,
    elevation: 5,
    justifyContent: "space-between",
  },
  txtDatos: {
    fontSize: 14,
  },
  txtEncabezados: {
    color: "#DEDEDEFF",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 12,
  },
  buttonContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2EABFFFF",
  },
});