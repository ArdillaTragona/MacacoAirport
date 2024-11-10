import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import airports from "../data/airports"; //Data de aeropuertos y codigos IATA
import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//Componente General: Formulario de vuelos
const FlightSearchScreen = ({ navigation }) => {
  const [activePicker, setActivePicker] = useState(null); // 'departure' o 'return'

  //Estado que contiene datos del vuelo
  const [flightDetails, setFlightDetails] = useState({
    origin: "",
    destination: "",
    departureDate: new Date(),
    returnDate: null,
    adults: 1,
    children: 0,
    classOfService: "ECONOMY",
  });

  //Metodo para cambiar el estado de flightDetails
  const handleChange = (name, value) => {
    setFlightDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearReturnDate = () => {
    handleChange("returnDate", null);
  };

  // Maneja el cambio de fecha para ambos pickers
  const handleDateChange = (event, selectedDate) => {
    const currentDate =
      selectedDate ||
      flightDetails[
        activePicker === "departure" ? "departureDate" : "returnDate"
      ];
    setActivePicker(null); // Cierra el picker
    handleChange(
      activePicker === "departure" ? "departureDate" : "returnDate",
      currentDate
    );
  };

  const searchFlights = () => {
    //Condicional para rellenar campos obligatorios
    if (
      !flightDetails.origin ||
      !flightDetails.destination ||
      !flightDetails.departureDate
    ) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    navigation.navigate("Flights", {
      origin: flightDetails.origin,
      destination: flightDetails.destination,
      departureDate: flightDetails.departureDate.toISOString().split("T")[0],
      returnDate: flightDetails.returnDate
        ? flightDetails.returnDate.toISOString().split("T")[0]
        : null,
      adults: flightDetails.adults,
      children: flightDetails.children,
      classOfService: flightDetails.classOfService,
    });

    console.log({
      originLocationCode: flightDetails.origin,
      destinationLocationCode: flightDetails.destination,
      departureDate: flightDetails.departureDate,
      adults: flightDetails.adults,
      children: flightDetails.children,
      travelClass: flightDetails.classOfService,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 30,
          overflow: "hidden",
          shadowColor: "#000000FF",
          shadowOpacity: 1,
          shadowRadius: 10,
          elevation: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#16B5FFFF",
            height: 60,
            justifyContent: "center",
            paddingLeft: 30,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 23,
              marginBottom: 10,
              color: "white",
            }}
          >
            Flight search
          </Text>
        </View>
        <ScrollView style={{ padding: 30, paddingTop: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 23,
              marginBottom: 10,
              marginTop: 15,
              color: "#16B5FFFF",
            }}
          >
            Flight Data
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "%100",
              gap: 10,
            }}
          >
            <View>
              <Text style={styles.DetailText}>Departure</Text>
              <Picker
                style={styles.input}
                selectedValue={flightDetails.origin}
                onValueChange={(value) => handleChange("origin", value)}
              >
                {airports.map((airport) => (
                  <Picker.Item
                    key={airport.code}
                    label={`${airport.city}`}
                    value={airport.code}
                  />
                ))}
              </Picker>
            </View>

            <View>
              <Text style={styles.DetailText}>Return</Text>
              <Picker
                style={styles.input}
                selectedValue={flightDetails.destination}
                onValueChange={(value) => handleChange("destination", value)}
              >
                {airports.map((airport) => (
                  <Picker.Item
                    key={airport.code}
                    label={`${airport.city}`}
                    value={airport.code}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "%100",
              gap: 10,
            }}
          >
            <View>
              <Text style={styles.DetailText}>Departure Date</Text>

              <TouchableOpacity
                onPress={() => setActivePicker("departure")}
                style={styles.inputDate}
              >
                <Text style={{ fontSize: 16, color: "#3A3A3AFF" }}>
                  {flightDetails.departureDate.toDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.DetailText}>Return Date</Text>
              <TouchableOpacity
                onPress={() => setActivePicker("return")}
                style={styles.inputDate}
              >
                <Text style={{ fontSize: 16, color: "#3A3A3AFF" }}>
                  {flightDetails.returnDate
                    ? `${flightDetails.returnDate.toDateString()}`
                    : "Select return date"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón para limpiar la fecha de regreso */}
          {flightDetails.returnDate && (
            <Button title="Delete return date" onPress={clearReturnDate} />
          )}

          <View
            style={{
              height: 2,
              backgroundColor: "#0CB2FFFF",
              marginTop: 20,
              marginBottom: 20,
            }}
          ></View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 23,
              marginBottom: 10,
              marginTop: 15,
              color: "#16B5FFFF",
            }}
          >
            Passengers
          </Text>

          {/* Mostrar DateTimePicker basado en el picker activo */}
          {activePicker && (
            <DateTimePicker
              value={
                flightDetails[
                  activePicker === "departure" ? "departureDate" : "returnDate"
                ] || new Date()
              }
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <View
            style={{
              flexDirection: "row",
              width: "%100",
              gap: 10,
            }}
          >
            <View>
              <Text style={styles.DetailText}>Number of adults</Text>
              <Picker
                selectedValue={flightDetails.adults}
                onValueChange={(itemValue) => handleChange("adults", itemValue)}
                style={styles.input}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Picker.Item key={num} label={`${num}`} value={num} />
                ))}
              </Picker>
            </View>

            <View>
              <Text style={styles.DetailText}>Number of children</Text>
              <Picker
                selectedValue={flightDetails.children}
                onValueChange={(itemValue) =>
                  handleChange("children", itemValue)
                }
                style={styles.input}
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <Picker.Item key={num} label={`${num}`} value={num} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Clase de servicio */}
          <Text style={styles.DetailText}>Service class</Text>
          <Picker
            selectedValue={flightDetails.classOfService}
            onValueChange={(itemValue) =>
              handleChange("classOfService", itemValue)
            }
            style={{
              backgroundColor: "#FDFDFDFF",
              color: "#3A3A3AFF",
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <Picker.Item label="Economy" value="ECONOMY" />
            <Picker.Item label="Business" value="BUSINESS" />
            <Picker.Item label="First Class" value="FIRST" />
          </Picker>

          <TouchableOpacity style={styles.searchButton} onPress={searchFlights}>
            <Text style={styles.searchButtonText}>Search flight</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#0D253BFF",
    flex: 1,
    paddingVertical: 60,
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#FDFDFDFF",
    color: "#3A3A3AFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    width: wp(34), // Esto establece el ancho del componente como el 80% del ancho de la pantalla
    height: hp(5), // Esto establece la altura del componente como el 10% de la altura de la pantalla
  },

  inputDate: {
    width: wp(34), // Esto establece el ancho del componente como el 80% del ancho de la pantalla
    height: hp(5), // Esto establece la altura del componente como el 10% de la altura de la pantalla
    justifyContent: "center",
    paddingLeft: 17,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 15,
  },
  DetailText: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 2,
    color: "#0CB2FFFF",
  },

  counterContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    color: "#0CB2FFFF",
    fontSize: 22,
  },
  counterText: {
    textAlign: "center",
    fontSize: 18,
    width: 30,
  },
  searchButton: {
    backgroundColor: "#0CB2FFFF",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    elevation: 1,
    marginTop: 20,
    borderRadius: 7,
    paddingVertical: 10,
  },
  searchButtonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default FlightSearchScreen;
