import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CustomCheckBox = ({ label, checked, onChange }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
    <MaterialCommunityIcons
      name={checked ? "checkbox-marked" : "checkbox-blank-outline"}
      size={24}
      color={checked ? "#FFFFFFFF" : "#FFFFFFFF"}
    />
  </TouchableOpacity>
);

const CheckItem = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <CustomCheckBox
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  );
};

const Passenger = ({ navigation }) => {
  const route = useRoute();
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    children,
    classOfService,
  } = route.params;

  const [passengerData, setPassengerData] = useState({
    adultCount: adults,
    childCount: children,
    passengers: [
      {
        firstName: "",
        lastName: "",
        birthDate: "",
        nationality: "",
      },
    ],
  });

  // Estado para almacenar los datos de cada pasajero
  const [passengers, setPassengers] = useState({
    adults: Array(adults).fill({
      name: "",
      lastName: "",
      birthDate: "",
      nationality: "",
    }),
    children: Array(children).fill({
      name: "",
      lastName: "",
      birthDate: "",
      nationality: "",
    }),
  });

  // Maneja el cambio de texto para un pasajero específico
  const handleTextChange = (group, index, field, value) => {
    const updatedGroup = passengers[group].map((passenger, i) =>
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers({ ...passengers, [group]: updatedGroup });
  };

  // Renderiza el formulario de pasajeros
  const renderForm = (count, label, group) => {
    return Array.from({ length: count }).map((_, index) => (
      <View key={`${label}-${index}`} style={styles.containerForm}>
        <View style={styles.rowContainer}>
          <View style={styles.checkboxContainer}>
            <MaterialCommunityIcons
              name="account-plus"
              size={24}
              color="#FFFFFFFF"
            />
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "white" }}
            >{`${label} ${index + 1}`}</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Passport</Text>
            <CheckItem />
          </View>
        </View>

        <View style={styles.rowContainerInput}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={passengers[group][index].name}
            onChangeText={(text) =>
              handleTextChange(group, index, "name", text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={passengers[group][index].lastName}
            onChangeText={(text) =>
              handleTextChange(group, index, "lastName", text)
            }
          />
        </View>

        <View style={styles.rowContainerInput}>
          <TextInput
            style={styles.input}
            placeholder="(DD/MM/YYYY)"
            value={passengers[group][index].birthDate}
            onChangeText={(text) =>
              handleTextChange(group, index, "birthDate", text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Nationality"
            value={passengers[group][index].nationality}
            onChangeText={(text) =>
              handleTextChange(group, index, "nationality", text)
            }
          />
        </View>
      </View>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#0D253BFF",
          justifyContent: "center",
          height: 55,
          paddingLeft: 50,
        }}
      >
        <Text style={{ color: "#22B6FA", fontSize: 25, fontWeight: "bold" }}>
          Passenger data
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {renderForm(adults, "Adult", "adults")}
          {renderForm(children, "Child", "children")}
        </View>
      </ScrollView>
      <View style={{ padding: 30 }}>
        <Button
          title="Confirm information"
          onPress={() =>
            navigation.navigate("Seats", {
              origin,
              destination,
              departureDate,
              returnDate,
              classOfService,
              passengers, // Asegúrate de pasar el estado correcto
              children,
              adults,
              //passengerData, // También puedes pasar estos datos si los necesitas
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: "#0D253BFF",
  },
  containerForm: {
    width: "100%",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#22B6FA",
  },
  input: {
    width: "48%",
    padding: 5,
    backgroundColor: "white",
    paddingLeft: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  formEncabezado: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowContainerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    width: 80,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default Passenger;
