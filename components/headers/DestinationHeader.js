// DestinationHeader.js
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";

const DestinationHeader = ({
  departure,
  destination,
  priceDeparture,
  priceDestination,
}) => {
  const totalPrice = priceDeparture + priceDestination;
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.destinationCont}>
          <View>
            <Text style={styles.text}>Departure</Text>
            <Text style={styles.input}>{departure}</Text>
          </View>
          <MaterialCommunityIcons
            name="airplane-takeoff"
            size={25}
            color="#2EABFFFF"
          />
        </View>
        <View style={styles.destinationCont}>
          <View>
            <Text style={styles.text}>Destination</Text>
            <Text style={styles.input}>{destination}</Text>
          </View>
          <MaterialCommunityIcons
            name="airplane-landing"
            size={25}
            color="#2EABFFFF"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -15,
  },
  rowPrice: {
    flexDirection: "row",
    width: "100%",
    height: 30,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    gap: 70,
  },
  container2: {
    borderWidth: 2,
  },
  destinationCont: {
    flexDirection: "row",
    marginHorizontal: 10,
    width: "40%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#2EABFFFF",
    backgroundColor: "white",
  },
  text: {
    color: "#2EABFFFF",
    fontSize: 14,
    marginBottom: -5,
  },
  input: {
    color: "#2EABFFFF",
    fontSize: 14,
  },
});

export default DestinationHeader;
