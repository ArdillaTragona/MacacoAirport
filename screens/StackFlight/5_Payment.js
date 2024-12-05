import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const PassengerList = ({ group, label, datosVuelo }) => {
  return (
    <View style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{label}</Text>
      <FlatList
        data={group}
        nestedScrollEnabled={true}
        keyExtractor={(_, index) => `${label}-${index}`}
        renderItem={({ item, index }) => (
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
            <View>
              <Image
                source={require("../../assets/images/QR demostrativo.png")}
                resizeMode="contain"
                style={styles.qr_demostrativo}
              />
              <Text>Seat: {item.selectedSeats}</Text>
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
    origin,
    children,
    passengers,
    returnDate,
    selectedSeats, // Recibe los asientos seleccionados
    destination,
    departureDate,
    classOfService,
    duration,
    flightNumber,
    bording,
    bordingReturn,
  } = route.params;

  const datosVuelo = {
    origin,
    duration,
    returnDate,
    destination,
    flightNumber,
    departureDate,
    classOfService,
    bording,
    bordingReturn,
  };

  return (
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
  );
};

export default Payment;

const styles = StyleSheet.create({
  contLista: {
    flex: 1,
    padding: 20,
    paddingTop: 3,
    backgroundColor: "#2EABFFFF",
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
  qr_demostrativo: {
    width: 150,
    height: 112,
  },
});
