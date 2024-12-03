import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const PassengerList = ({ group, label }) => {
  return (
    <View style={styles.groupContainer}>
      <Text style={styles.groupTitle}>{label}</Text>
      <FlatList
        data={group}
        keyExtractor={(_, index) => `${label}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.passengerItem}>
            <Text> </Text>
            <Text style={styles.passengerText}>
              Name: {item.name} {item.lastName}
            </Text>
            <Text style={styles.passengerText}>
              Birth Date: {item.birthDate}
            </Text>
            <Text style={styles.passengerText}>
              Nationality: {item.nationality}
            </Text>
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
    destination,
    departureDate,
    classOfService,
  } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tickets Generated</Text>
      <PassengerList group={passengers.adults} label="Adults" />
      <PassengerList group={passengers.children} label="Children" />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  groupContainer: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  passengerItem: {
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  passengerText: {
    fontSize: 14,
    color: "#333",
  },
});
