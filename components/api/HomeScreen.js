import React, { useState } from "react";
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

const SearchScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [travelerType, setTravelerType] = useState("ADULT");
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleSearch = () => {
    if (!origin || !destination || !departureDate || !departureTime) {
      alert("Por favor ingresa todos los datos.");
      return;
    }

    navigation.navigate("Results", {
      origin,
      destination,
      departureDate: formatDate(departureDate),
      departureTime: formatTime(departureTime),
      travelerType: `${adultCount} Adultos, ${childCount} Niños, ${infantCount} Infantes`,
    });
  };

  const showCalendar = () => {
    setShowDatePicker(true);
  };

  const showTimeSelector = () => {
    setShowTimePicker(true);
  };

  const handleTravelerModal = () => {
    setShowTravelerModal(true);
  };

  const closeTravelerModal = () => {
    setShowTravelerModal(false);
  };

  const incrementCount = (type) => {
    if (type === "ADULT") {
      setAdultCount(adultCount + 1);
    } else if (type === "CHILD") {
      setChildCount(childCount + 1);
    } else if (type === "INFANT") {
      setInfantCount(infantCount + 1);
    }
  };

  const decrementCount = (type) => {
    if (type === "ADULT" && adultCount > 1) {
      setAdultCount(adultCount - 1);
    } else if (type === "CHILD" && childCount > 0) {
      setChildCount(childCount - 1);
    } else if (type === "INFANT" && infantCount > 0) {
      setInfantCount(infantCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Menú desplegable para origen */}
      <Text>Origen</Text>
      <Picker
        selectedValue={origin}
        onValueChange={(itemValue) => setOrigin(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecciona el origen" value="" />
        <Picker.Item label="Ciudad de México (MEX)" value="MEX" />
        <Picker.Item label="Aguascalientes (AGU)" value="AGU" />
      </Picker>

      {/* Menú desplegable para destino */}
      <Text>Destino</Text>
      <Picker
        selectedValue={destination}
        onValueChange={(itemValue) => setDestination(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecciona el destino" value="" />
        <Picker.Item label="Aguascalientes (AGU)" value="AGU" />
        <Picker.Item label="Ciudad de México (MEX)" value="MEX" />
      </Picker>

      {/* Campo de fecha con ícono */}
      <Text>Fecha de salida</Text>
      <View style={styles.datePickerContainer}>
        <Text>{formatDate(departureDate)}</Text>
        <TouchableOpacity onPress={showCalendar}>
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
            setDepartureDate(selectedDate || departureDate);
          }}
        />
      )}

      {/* Campo de hora con ícono */}
      <Text>Hora de salida</Text>
      <View style={styles.datePickerContainer}>
        <Text>{formatTime(departureTime)}</Text>
        <TouchableOpacity onPress={showTimeSelector}>
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
            setDepartureTime(selectedTime || departureTime);
          }}
        />
      )}

      {/* Tipo de viajero */}
      <Text>Tipo de viajero</Text>
      <TouchableOpacity style={styles.input} onPress={handleTravelerModal}>
        <Text>{`${adultCount} Adultos, ${childCount} Niños, ${infantCount} Infantes`}</Text>
      </TouchableOpacity>

      {/* Modal para seleccionar el tipo de viajero */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showTravelerModal}
        onRequestClose={closeTravelerModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Adultos</Text>
            <View style={styles.counterContainer}>
              <Button title="-" onPress={() => decrementCount("ADULT")} />
              <Text>{adultCount}</Text>
              <Button title="+" onPress={() => incrementCount("ADULT")} />
            </View>

            <Text>Niños</Text>
            <View style={styles.counterContainer}>
              <Button title="-" onPress={() => decrementCount("CHILD")} />
              <Text>{childCount}</Text>
              <Button title="+" onPress={() => incrementCount("CHILD")} />
            </View>

            <Text>Infantes</Text>
            <View style={styles.counterContainer}>
              <Button title="-" onPress={() => decrementCount("INFANT")} />
              <Text>{infantCount}</Text>
              <Button title="+" onPress={() => incrementCount("INFANT")} />
            </View>

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
