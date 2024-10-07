import React, { useState, useCallback } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";

const Counter = ({ type, count, increment, decrement }) => (
  <View style={styles.counterContainer}>
    <Text>{type}</Text>
    <Button title="-" onPress={decrement} />
    <Text>{count}</Text>
    <Button title="+" onPress={increment} />
  </View>
);

const SearchScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [showTravelerModal, setShowTravelerModal] = useState(false);

  const formatDate = (date) => date.toISOString().split("T")[0];
  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSearch = () => {
    if (!origin || !destination) {
      alert("Por favor ingresa todos los datos.");
      return;
    }
    // Navegamos a la screen "Flights" y pasamos los parámetros
    navigation.navigate("Flights", {
      origin,
      destination,
      departureDate: formatDate(departureDate),
      departureTime: formatTime(departureTime),
      travelerType: {
        adults: adultCount,
        children: childCount,
        infants: infantCount,
      },
    });
  };

  const handleTravelerModal = () => setShowTravelerModal(true);
  const closeTravelerModal = () => setShowTravelerModal(false);

  const changeCount = useCallback((type, operation) => {
    if (type === "ADULT") {
      setAdultCount((prev) =>
        operation === "increment" ? prev + 1 : Math.max(prev - 1, 1)
      );
    } else if (type === "CHILD") {
      setChildCount((prev) =>
        operation === "increment" ? prev + 1 : Math.max(prev - 1, 0)
      );
    } else if (type === "INFANT") {
      setInfantCount((prev) =>
        operation === "increment" ? prev + 1 : Math.max(prev - 1, 0)
      );
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Origen */}
      <Text>Origen</Text>
      <Picker
        selectedValue={origin}
        onValueChange={setOrigin}
        style={styles.input}
      >
        <Picker.Item label="Selecciona el origen" value="" />
        <Picker.Item label="Ciudad de México (MEX)" value="MEX" />
        <Picker.Item label="Aguascalientes (AGU)" value="AGU" />
      </Picker>

      {/* Destino */}
      <Text>Destino</Text>
      <Picker
        selectedValue={destination}
        onValueChange={setDestination}
        style={styles.input}
      >
        <Picker.Item label="Selecciona el destino" value="" />
        <Picker.Item label="Aguascalientes (AGU)" value="AGU" />
        <Picker.Item label="Ciudad de México (MEX)" value="MEX" />
      </Picker>

      {/* Fecha de salida */}
      <Text>Fecha de salida</Text>
      <View style={styles.datePickerContainer}>
        <Text>{formatDate(departureDate)}</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Icon name="calendar-today" size={30} color="gray" />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDepartureDate(selectedDate);
          }}
        />
      )}

      {/* Hora de salida */}
      <Text>Hora de salida</Text>
      <View style={styles.datePickerContainer}>
        <Text>{formatTime(departureTime)}</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Icon name="access-time" size={30} color="gray" />
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <DateTimePicker
          value={departureTime}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setDepartureTime(selectedTime);
          }}
        />
      )}

      {/* Tipo de viajero */}
      <Text>Tipo de viajero</Text>
      <TouchableOpacity style={styles.input} onPress={handleTravelerModal}>
        <Text>{`${adultCount} Adultos, ${childCount} Niños, ${infantCount} Infantes`}</Text>
      </TouchableOpacity>

      {/* Modal de viajeros */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showTravelerModal}
        onRequestClose={closeTravelerModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Counter
              type="Adultos"
              count={adultCount}
              increment={() => changeCount("ADULT", "increment")}
              decrement={() => changeCount("ADULT", "decrement")}
            />
            <Counter
              type="Niños"
              count={childCount}
              increment={() => changeCount("CHILD", "increment")}
              decrement={() => changeCount("CHILD", "decrement")}
            />
            <Counter
              type="Infantes"
              count={infantCount}
              increment={() => changeCount("INFANT", "increment")}
              decrement={() => changeCount("INFANT", "decrement")}
            />
            <Button title="Aceptar" onPress={closeTravelerModal} />
          </View>
        </View>
      </Modal>

      <Button title="Buscar vuelos" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:40
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SearchScreen;
