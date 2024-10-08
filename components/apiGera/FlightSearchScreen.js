import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
//import Autocomplete from 'react-native-autocomplete-input';

const FlightSearchScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [classOfService, setClassOfService] = useState("ECONOMY");
  const [showOriginAutocomplete, setShowOriginAutocomplete] = useState(false);
  const [showDestinationAutocomplete, setShowDestinationAutocomplete] =
    useState(false);

  // Datos de ejemplo de ciudades y códigos IATA
  const airports = [
    { city: "Acapulco", state: "Guerrero", code: "ACA" },
    { city: "Acapulco", state: "Guerrero", code: "PIE" },
    { city: "Aguascalientes", state: "Aguascalientes", code: "AGU" },
    { city: "Álamos", state: "Sonora", code: "XAL" },
    { city: "Apatzingán", state: "Michoacán", code: "AZG" },
    { city: "Atizapán", state: "México", code: "JJC" },
    { city: "Cabo San Lucas", state: "Baja California Sur", code: "CSL" },
    { city: "Campeche", state: "Campeche", code: "CPE" },
    { city: "Cananea", state: "Sonora", code: "CNA" },
    { city: "Cancún", state: "Quintana Roo", code: "CUN" },
    { city: "Celaya", state: "Guanajuato", code: "CYW" },
    { city: "Chetumal", state: "Quintana Roo", code: "CTM" },
    { city: "Chichén Itzá", state: "Yucatán", code: "CZA" },
    { city: "Chihuahua", state: "Chihuahua", code: "CUU" },
    { city: "Ciudad Acuña", state: "Coahuila", code: "ACN" },
    { city: "Ciudad Constitución", state: "Baja California Sur", code: "CUA" },
    { city: "Ciudad de México", state: "Distrito Federal", code: "MEX" },
    { city: "Ciudad del Carmen", state: "Campeche", code: "CME" },
    { city: "Ciudad Juárez", state: "Chihuahua", code: "CJS" },
    { city: "Ciudad Mante", state: "Tamaulipas", code: "MMC" },
    { city: "Ciudad Obregón", state: "Sonora", code: "CEN" },
    { city: "Ciudad Pemex", state: "Tabasco", code: "CPX" },
    { city: "Ciudad Victoria", state: "Tamaulipas", code: "CVM" },
    { city: "Colima", state: "Colima", code: "CLQ" },
    { city: "Comitán", state: "Chiapas", code: "CJT" },
    { city: "Cozumel", state: "Quintana Roo", code: "CZM" },
    { city: "Cuernavaca", state: "Morelos", code: "CVJ" },
    { city: "Culiacán", state: "Sinaloa", code: "CUL" },
    { city: "Durango", state: "Durango", code: "DGO" },
    { city: "Ensenada", state: "Baja California", code: "ESE" },
    { city: "Ensenada", state: "Baja California", code: "ESE" },
    { city: "Frontera", state: "Coahuila", code: "LOV" },
    { city: "Guadalajara", state: "Jalisco", code: "GDL" },
    { city: "Guaymas", state: "Sonora", code: "GYM" },
    { city: "Guerrero Negro", state: "Baja California Sur", code: "GUB" },
    { city: "Hermosillo", state: "Sonora", code: "HMO" },
    { city: "Huatulco", state: "Oaxaca", code: "HUX" },
    { city: "Isla Cedros", state: "Baja California", code: "CDI" },
    { city: "Isla Mujeres", state: "Quintana Roo", code: "ISJ" },
    { city: "Ixtapa/Zihuatanejo", state: "Guerrero", code: "ZIH" },
    { city: "Ixtepec", state: "Oaxaca", code: "IZT" },
    { city: "La Paz", state: "Baja California Sur", code: "LAP" },
    { city: "Lagos de Moreno", state: "Jalisco", code: "LOM" },
    { city: "Lázaro Cárdenas", state: "Michoacán", code: "LZC" },
    { city: "León", state: "Guanajuato", code: "BJX" },
    { city: "Loreto", state: "Baja California Sur", code: "LTO" },
    { city: "Los Cabos", state: "Baja California Sur", code: "SJD" },
    { city: "Los Mochis", state: "Sinaloa", code: "LMM" },
    { city: "Manzanillo", state: "Colima", code: "ZLO" },
    { city: "Manzanillo", state: "Colima", code: "ZLO" },
    { city: "Matamoros", state: "Tamaulipas", code: "MAM" },
    { city: "Mazatlán", state: "Sinaloa", code: "MZT" },
    { city: "Mérida", state: "Yucatán", code: "MID" },
    { city: "Mexicali", state: "Baja California", code: "MXL" },
    { city: "Minatitlán", state: "Veracruz", code: "MTT" },
    { city: "Monterrey", state: "Nuevo León", code: "MTY" },
    { city: "Monterrey", state: "Nuevo León", code: "NTR" },
    { city: "Morelia", state: "Michoacán", code: "MLM" },
    { city: "Mulegé", state: "Baja California Sur", code: "MUG" },
    { city: "Navojoa", state: "Sonora", code: "NAV" },
    { city: "Nogales", state: "Sonora", code: "NOG" },
    { city: "Nuevo Casas Grandes", state: "Chihuahua", code: "NCG" },
    { city: "Nuevo Laredo", state: "Tamaulipas", code: "NLD" },
    { city: "Oaxaca", state: "Oaxaca", code: "OAX" },
    { city: "Pachuca", state: "Hidalgo", code: "PCA" },
    { city: "Palenque", state: "Chiapas", code: "PQM" },
    { city: "Piedras Negras", state: "Coahuila", code: "PDS" },
    { city: "Playa del Carmen", state: "Quintana Roo", code: "PCM" },
    { city: "Poza Rica", state: "Veracruz", code: "PAZ" },
    { city: "Puerto Escondido", state: "Oaxaca", code: "PXM" },
    { city: "Querétaro", state: "Querétaro", code: "QRO" },
    { city: "Reynosa", state: "Tamaulipas", code: "REX" },
    { city: "Salina Cruz", state: "Oaxaca", code: "SCX" },
    { city: "San Luis Potosí", state: "San Luis Potosí", code: "SLP" },
    { city: "Santa María Huatulco", state: "Oaxaca", code: "HUX" },
    { city: "Santa Rosalía", state: "Baja California Sur", code: "SRL" },
    { city: "Tepic", state: "Nayarit", code: "TPQ" },
    { city: "Tijuana", state: "Baja California", code: "TIJ" },
    { city: "Torreón", state: "Coahuila", code: "TRC" },
    { city: "Tuxpan", state: "Veracruz", code: "TUY" },
    { city: "Uruapan", state: "Michoacán", code: "UPN" },
    { city: "Veracruz", state: "Veracruz", code: "VER" },
    { city: "Villahermosa", state: "Tabasco", code: "VSA" },
    { city: "Zacatecas", state: "Zacatecas", code: "ZCL" },
  ];

  const searchFlights = () => {
    if (!origin || !destination) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    navigation.navigate("Flights", {
      origin,
      destination,
      departureDate: departureDate.toISOString().split("T")[0],
      returnDate: returnDate ? returnDate.toISOString().split("T")[0] : null,
      adults,
      children,
      classOfService,
    });
  };

  const handleDepartureDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || departureDate;
    setShowDeparturePicker(false);
    setDepartureDate(currentDate);
  };

  const handleReturnDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || returnDate;
    setShowReturnPicker(false);
    setReturnDate(currentDate);
  };

  const clearReturnDate = () => {
    setReturnDate(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Búsqueda de Vuelos</Text>

      {/* Origen */}
      <Text style={styles.label}>Origen</Text>
      <Picker
        selectedValue={origin}
        onValueChange={setOrigin}
        style={styles.input}
      >
        <Picker.Item label="Selecciona el origen" value="" />
        <Picker.Item
          label="Aguascalientes - Aguascalientes (AGU)"
          value="AGU"
        />
        <Picker.Item label="Baja California - Tijuana (TIJ)" value="TIJ" />
        <Picker.Item
          label="Baja California Sur - Los Cabos (SJD)"
          value="SJD"
        />
        <Picker.Item label="Baja California Sur - La Paz (LAP)" value="LAP" />
        <Picker.Item label="Campeche - Campeche (CPE)" value="CPE" />
        <Picker.Item label="Chiapas - Tuxtla Gutiérrez (TGZ)" value="TGZ" />
        <Picker.Item label="Chiapas - Palenque (PQM)" value="PQM" />
        <Picker.Item label="Chihuahua - Chihuahua (CUU)" value="CUU" />
        <Picker.Item label="Chihuahua - Ciudad Juárez (CJS)" value="CJS" />
        <Picker.Item label="Coahuila - Torreón (TRC)" value="TRC" />
        <Picker.Item label="Coahuila - Saltillo (SLW)" value="SLW" />
        <Picker.Item label="Colima - Colima (CLQ)" value="CLQ" />
        <Picker.Item label="Durango - Durango (DGO)" value="DGO" />
        <Picker.Item label="Guanajuato - León (BJX)" value="BJX" />
        <Picker.Item label="Guerrero - Acapulco (ACA)" value="ACA" />
        <Picker.Item label="Guerrero - Ixtapa-Zihuatanejo (ZIH)" value="ZIH" />
        <Picker.Item label="Hidalgo - Pachuca (PCA)" value="PCA" />
        <Picker.Item label="Jalisco - Guadalajara (GDL)" value="GDL" />
        <Picker.Item label="Jalisco - Puerto Vallarta (PVR)" value="PVR" />
        <Picker.Item label="Michoacán - Morelia (MLM)" value="MLM" />
        <Picker.Item label="Michoacán - Uruapan (UPN)" value="UPN" />
        <Picker.Item label="Morelos - Cuernavaca (CVJ)" value="CVJ" />
        <Picker.Item label="Nayarit - Tepic (TPQ)" value="TPQ" />
        <Picker.Item label="Nuevo León - Monterrey (MTY)" value="MTY" />
        <Picker.Item label="Oaxaca - Oaxaca (OAX)" value="OAX" />
        <Picker.Item label="Oaxaca - Puerto Escondido (PXM)" value="PXM" />
        <Picker.Item label="Oaxaca - Huatulco (HUX)" value="HUX" />
        <Picker.Item label="Puebla - Puebla (PBC)" value="PBC" />
        <Picker.Item label="Querétaro - Querétaro (QRO)" value="QRO" />
        <Picker.Item label="Quintana Roo - Cancún (CUN)" value="CUN" />
        <Picker.Item label="Quintana Roo - Cozumel (CZM)" value="CZM" />
        <Picker.Item label="Quintana Roo - Chetumal (CTM)" value="CTM" />
        <Picker.Item
          label="San Luis Potosí - San Luis Potosí (SLP)"
          value="SLP"
        />
        <Picker.Item label="Sinaloa - Culiacán (CUL)" value="CUL" />
        <Picker.Item label="Sinaloa - Mazatlán (MZT)" value="MZT" />
        <Picker.Item label="Sinaloa - Los Mochis (LMM)" value="LMM" />
        <Picker.Item label="Sonora - Hermosillo (HMO)" value="HMO" />
        <Picker.Item label="Sonora - Ciudad Obregón (CEN)" value="CEN" />
        <Picker.Item label="Sonora - Guaymas (GYM)" value="GYM" />
        <Picker.Item label="Tabasco - Villahermosa (VSA)" value="VSA" />
        <Picker.Item label="Tamaulipas - Tampico (TAM)" value="TAM" />
        <Picker.Item label="Tamaulipas - Reynosa (REX)" value="REX" />
        <Picker.Item label="Tamaulipas - Matamoros (MAM)" value="MAM" />
        <Picker.Item label="Tlaxcala - Tlaxcala (TXA)" value="TXA" />
        <Picker.Item label="Veracruz - Veracruz (VER)" value="VER" />
        <Picker.Item label="Veracruz - Minatitlán (MTT)" value="MTT" />
        <Picker.Item label="Veracruz - Poza Rica (PAZ)" value="PAZ" />
        <Picker.Item label="Yucatán - Mérida (MID)" value="MID" />
        <Picker.Item label="Zacatecas - Zacatecas (ZCL)" value="ZCL" />
      </Picker>

      {/* Destino */}
      <Text style={styles.label}>Destino</Text>
      <Picker
        selectedValue={destination}
        onValueChange={setDestination}
        style={styles.input}
      >
        <Picker.Item label="Selecciona el destino" value="" />
        <Picker.Item
          label="Aguascalientes - Aguascalientes (AGU)"
          value="AGU"
        />
        <Picker.Item label="Baja California - Tijuana (TIJ)" value="TIJ" />
        <Picker.Item
          label="Baja California Sur - Los Cabos (SJD)"
          value="SJD"
        />
        <Picker.Item label="Baja California Sur - La Paz (LAP)" value="LAP" />
        <Picker.Item label="Campeche - Campeche (CPE)" value="CPE" />
        <Picker.Item label="Chiapas - Tuxtla Gutiérrez (TGZ)" value="TGZ" />
        <Picker.Item label="Chiapas - Palenque (PQM)" value="PQM" />
        <Picker.Item label="Chihuahua - Chihuahua (CUU)" value="CUU" />
        <Picker.Item label="Chihuahua - Ciudad Juárez (CJS)" value="CJS" />
        <Picker.Item label="Coahuila - Torreón (TRC)" value="TRC" />
        <Picker.Item label="Coahuila - Saltillo (SLW)" value="SLW" />
        <Picker.Item label="Colima - Colima (CLQ)" value="CLQ" />
        <Picker.Item label="Durango - Durango (DGO)" value="DGO" />
        <Picker.Item label="Guanajuato - León (BJX)" value="BJX" />
        <Picker.Item label="Guerrero - Acapulco (ACA)" value="ACA" />
        <Picker.Item label="Guerrero - Ixtapa-Zihuatanejo (ZIH)" value="ZIH" />
        <Picker.Item label="Hidalgo - Pachuca (PCA)" value="PCA" />
        <Picker.Item label="Jalisco - Guadalajara (GDL)" value="GDL" />
        <Picker.Item label="Jalisco - Puerto Vallarta (PVR)" value="PVR" />
        <Picker.Item label="Michoacán - Morelia (MLM)" value="MLM" />
        <Picker.Item label="Michoacán - Uruapan (UPN)" value="UPN" />
        <Picker.Item label="Morelos - Cuernavaca (CVJ)" value="CVJ" />
        <Picker.Item label="Nayarit - Tepic (TPQ)" value="TPQ" />
        <Picker.Item label="Nuevo León - Monterrey (MTY)" value="MTY" />
        <Picker.Item label="Oaxaca - Oaxaca (OAX)" value="OAX" />
        <Picker.Item label="Oaxaca - Puerto Escondido (PXM)" value="PXM" />
        <Picker.Item label="Oaxaca - Huatulco (HUX)" value="HUX" />
        <Picker.Item label="Puebla - Puebla (PBC)" value="PBC" />
        <Picker.Item label="Querétaro - Querétaro (QRO)" value="QRO" />
        <Picker.Item label="Quintana Roo - Cancún (CUN)" value="CUN" />
        <Picker.Item label="Quintana Roo - Cozumel (CZM)" value="CZM" />
        <Picker.Item label="Quintana Roo - Chetumal (CTM)" value="CTM" />
        <Picker.Item
          label="San Luis Potosí - San Luis Potosí (SLP)"
          value="SLP"
        />
        <Picker.Item label="Sinaloa - Culiacán (CUL)" value="CUL" />
        <Picker.Item label="Sinaloa - Mazatlán (MZT)" value="MZT" />
        <Picker.Item label="Sinaloa - Los Mochis (LMM)" value="LMM" />
        <Picker.Item label="Sonora - Hermosillo (HMO)" value="HMO" />
        <Picker.Item label="Sonora - Ciudad Obregón (CEN)" value="CEN" />
        <Picker.Item label="Sonora - Guaymas (GYM)" value="GYM" />
        <Picker.Item label="Tabasco - Villahermosa (VSA)" value="VSA" />
        <Picker.Item label="Tamaulipas - Tampico (TAM)" value="TAM" />
        <Picker.Item label="Tamaulipas - Reynosa (REX)" value="REX" />
        <Picker.Item label="Tamaulipas - Matamoros (MAM)" value="MAM" />
        <Picker.Item label="Tlaxcala - Tlaxcala (TXA)" value="TXA" />
        <Picker.Item label="Veracruz - Veracruz (VER)" value="VER" />
        <Picker.Item label="Veracruz - Minatitlán (MTT)" value="MTT" />
        <Picker.Item label="Veracruz - Poza Rica (PAZ)" value="PAZ" />
        <Picker.Item label="Yucatán - Mérida (MID)" value="MID" />
        <Picker.Item label="Zacatecas - Zacatecas (ZCL)" value="ZCL" />
      </Picker>

      {/* Día de Salida */}
      <Text style={styles.label}>Día de Salida</Text>
      <View style={styles.dateInputContainer}>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDeparturePicker(true)}
        >
          <Icon name="calendar" size={20} color="#fff" />
          <Text style={styles.dateText}>
            {departureDate.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>
        {showDeparturePicker && (
          <DateTimePicker
            value={departureDate}
            mode="date"
            display="default"
            onChange={handleDepartureDateChange}
          />
        )}
      </View>

      {/* Día de Regreso (opcional) */}
      <Text style={styles.label}>Día de Regreso (opcional)</Text>
      <View style={styles.dateInputContainer}>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowReturnPicker(true)}
        >
          <Icon name="calendar" size={20} color="#fff" />
          <Text style={styles.dateText}>
            {returnDate
              ? returnDate.toISOString().split("T")[0]
              : "Seleccionar fecha"}
          </Text>
        </TouchableOpacity>
        {returnDate && (
          <TouchableOpacity
            onPress={clearReturnDate}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>X</Text>
          </TouchableOpacity>
        )}
        {showReturnPicker && (
          <DateTimePicker
            value={returnDate || new Date()}
            mode="date"
            display="default"
            onChange={handleReturnDateChange}
          />
        )}
      </View>

      {/* Pasajeros */}
      <Text style={styles.label}>Pasajeros</Text>
      <View style={styles.passengerContainer}>
        <View style={styles.passengerSelector}>
          <Text style={styles.label}>Adultos</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() => setAdults(adults > 0 ? adults - 1 : 0)}
            >
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{adults}</Text>
            <TouchableOpacity onPress={() => setAdults(adults + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.passengerSelector}>
          <Text style={styles.label}>Niños o Bebés</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() => setChildren(children > 0 ? children - 1 : 0)}
            >
              <Text style={styles.counterButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{children}</Text>
            <TouchableOpacity onPress={() => setChildren(children + 1)}>
              <Text style={styles.counterButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Clase de Servicio */}
      <Text style={styles.label}>Clase de Servicio</Text>
      <Picker
        selectedValue={classOfService}
        onValueChange={(itemValue) => setClassOfService(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Económica" value="ECONOMY" />
        <Picker.Item label="Business" value="BUSINESS" />
        <Picker.Item label="Primera Clase" value="FIRST" />
      </Picker>

      {/* Botón de Buscar */}
      <TouchableOpacity style={styles.searchButton} onPress={searchFlights}>
        <Text style={styles.searchButtonText}>Buscar Vuelos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E6F7FF",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#003366",
  },
  input: {
    height: 50,
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#003366",
  },
  autocompleteContainer: {
    position: "relative", // Posiciona el contenedor de autocompletado
    zIndex: 1, // Asegura que el autocompletado esté por encima de otros componentes
  },
  autocompleteList: {
    maxHeight: 150, // Limita la altura máxima de la lista a 150px
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5, // Espacio entre el input y la lista
    zIndex: 2, // Asegura que la lista se muestre por encima de otros elementos
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
    padding: 10,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#003366",
  },
  itemContainer: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#007BFF",
    borderBottomWidth: 1,
  },
  passengerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  passengerSelector: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counterButton: {
    fontSize: 22,
    color: "#007BFF",
  },
  counterText: {
    fontSize: 18,
    textAlign: "center",
    width: 30,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 0,
    elevation: 1,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearText: {
    color: "#FF0000",
    fontSize: 18,
  },
});

export default FlightSearchScreen;
