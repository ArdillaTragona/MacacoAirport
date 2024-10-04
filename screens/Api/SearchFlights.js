import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [departureTime, setDepartureTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [travelerType, setTravelerType] = useState('ADULT');
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSearch = () => {
    if (!origin || !destination || !departureDate || !departureTime) {
      alert('Por favor ingresa todos los datos.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Results', {
        origin,
        destination,
        departureDate: formatDate(departureDate),
        departureTime: formatTime(departureTime),
        travelerType: `${adultCount} Adultos, ${childCount} Niños, ${infantCount} Infantes`,
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.label}>Origen</Text>
        <Picker
          selectedValue={origin}
          onValueChange={(itemValue) => setOrigin(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el origen" value="" style={styles.pickerItem} />
          <Picker.Item label="Aguascalientes (AGU) - Aeropuerto Internacional de Aguascalientes" value="AGU" style={styles.pickerItem} />
<Picker.Item label="Baja California (CDI) - Aeropuerto Nacional de Isla de Cedros" value="CDI" style={styles.pickerItem} />
<Picker.Item label="Baja California (ESE) - Aeropuerto Internacional de Ensenada" value="ESE" style={styles.pickerItem} />
<Picker.Item label="Baja California (MXL) - Aeropuerto Internacional de Mexicali" value="MXL" style={styles.pickerItem} />
<Picker.Item label="Baja California (TIJ) - Aeropuerto Nacional de Tijuana" value="TIJ" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (CSL) - Aeródromo Internacional de Cabo San Lucas" value="CSL" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (GUB) - Aeropuerto Nacional de Guerrero Negro" value="GUB" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (LAP) - Aeropuerto Internacional de La Paz" value="LAP" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (LTO) - Aeropuerto Internacional de Loreto" value="LTO" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (SJD) - Aeropuerto Internacional de San José del Cabo" value="SJD" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (SRL) - Aeropuerto Internacional de Santa Rosalía" value="SRL" style={styles.pickerItem} />
<Picker.Item label="Campeche (CPE) - Aeropuerto Internacional de Campeche" value="CPE" style={styles.pickerItem} />
<Picker.Item label="Chiapas (CJT) - Aeropuerto Nacional de Comitán" value="CJT" style={styles.pickerItem} />
<Picker.Item label="Chiapas (PQM) - Aeropuerto Nacional de Palenque" value="PQM" style={styles.pickerItem} />
<Picker.Item label="Chiapas (PJP) - Aeropuerto Nacional Armando Duvalier" value="PJP" style={styles.pickerItem} />
<Picker.Item label="Chihuahua (CUU) - Aeropuerto Internacional de Chihuahua" value="CUU" style={styles.pickerItem} />
<Picker.Item label="Chihuahua (NCG) - Aeropuerto Nacional de Nuevo Casas Grandes" value="NCG" style={styles.pickerItem} />
<Picker.Item label="Coahuila (ACN) - Aeropuerto Internacional de Ciudad Acuña" value="ACN" style={styles.pickerItem} />
<Picker.Item label="Coahuila (LOV) - Aeropuerto Internacional Venustiano Carranza" value="LOV" style={styles.pickerItem} />
<Picker.Item label="Coahuila (PDS) - Aeropuerto Internacional de Piedras Negras" value="PDS" style={styles.pickerItem} />
<Picker.Item label="Colima (CLQ) - Aeropuerto Nacional de Colima" value="CLQ" style={styles.pickerItem} />
<Picker.Item label="Colima (ZLO) - Aeropuerto Internacional Playa de Oro" value="ZLO" style={styles.pickerItem} />
<Picker.Item label="Durango (DGO) - Aeropuerto Internacional de Durango" value="DGO" style={styles.pickerItem} />
<Picker.Item label="Estado de México (TLC) - Aeropuerto Nacional de Toluca" value="TLC" style={styles.pickerItem} />
<Picker.Item label="Guanajuato (BJX) - Aeropuerto Internacional de Guanajuato" value="BJX" style={styles.pickerItem} />
<Picker.Item label="Guanajuato (CYW) - Aeropuerto Nacional Capitán Rogelio Castillo" value="CYW" style={styles.pickerItem} />
<Picker.Item label="Guerrero (ACA) - Aeropuerto Internacional de Acapulco" value="ACA" style={styles.pickerItem} />
<Picker.Item label="Guerrero (PIE) - Base Aérea No. 7 León González Pie de la Cuesta" value="PIE" style={styles.pickerItem} />
<Picker.Item label="Guerrero (ZIH) - Aeropuerto Internacional de Zihuatanejo" value="ZIH" style={styles.pickerItem} />
<Picker.Item label="Hidalgo (PCA) - Aeropuerto Internacional de Pachuca" value="PCA" style={styles.pickerItem} />
<Picker.Item label="Jalisco (GDL) - Aeropuerto Internacional de Guadalajara" value="GDL" style={styles.pickerItem} />
<Picker.Item label="Michoacán (AZG) - Aeropuerto Nacional Pablo L. Sidar" value="AZG" style={styles.pickerItem} />
<Picker.Item label="Michoacán (MLM) - Aeropuerto Internacional de Morelia" value="MLM" style={styles.pickerItem} />
<Picker.Item label="Morelos (CVJ) - Aeropuerto Internacional de Cuernavaca" value="CVJ" style={styles.pickerItem} />
<Picker.Item label="Nuevo León (—) - Aeropuerto Internacional ‘Del Norte’ Monterrey" value="—" style={styles.pickerItem} />
<Picker.Item label="Nuevo León (MTY) - Aeropuerto ‘Mariano Escobedo’ Monterrey" value="MTY" style={styles.pickerItem} />
<Picker.Item label="Nuevo León (NTR) - Aeropuerto Internacional del Norte" value="NTR" style={styles.pickerItem} />
<Picker.Item label="Oaxaca (HUX) - Aeropuerto Internacional de Huatulco" value="HUX" style={styles.pickerItem} />
<Picker.Item label="Oaxaca (OAX) - Aeropuerto Internacional de Oaxaca" value="OAX" style={styles.pickerItem} />
<Picker.Item label="Oaxaca (PXM) - Aeropuerto Internacional de Puerto Escondido" value="PXM" style={styles.pickerItem} />
<Picker.Item label="Puebla (PBC) - Aeropuerto Internacional de Puebla" value="PBC" style={styles.pickerItem} />
<Picker.Item label="Quintana Roo (CUN) - Aeropuerto Internacional de Cancún" value="CUN" style={styles.pickerItem} />
<Picker.Item label="Quintana Roo (CTM) - Aeropuerto Internacional de Chetumal" value="CTM" style={styles.pickerItem} />
<Picker.Item label="Quintana Roo (ISJ) - Aeropuerto Nacional de Isla Mujeres" value="ISJ" style={styles.pickerItem} />
<Picker.Item label="San Luis Potosí (SLP) - Aeropuerto Internacional de San Luis Potosí" value="SLP" style={styles.pickerItem} />
<Picker.Item label="Sinaloa (CUL) - Aeropuerto Internacional de Culiacán" value="CUL" style={styles.pickerItem} />
<Picker.Item label="Sinaloa (LMM) - Aeropuerto Internacional de Los Mochis" value="LMM" style={styles.pickerItem} />
<Picker.Item label="Sinaloa (MZT) - Aeropuerto Internacional de Mazatlán" value="MZT" style={styles.pickerItem} />
<Picker.Item label="Sonora (CEN) - Aeropuerto Internacional de Ciudad Obregón" value="CEN" style={styles.pickerItem} />
<Picker.Item label="Sonora (CNA) - Aeropuerto Nacional de Cananea" value="CNA" style={styles.pickerItem} />
<Picker.Item label="Sonora (GYM) - Aeropuerto Internacional de Guaymas" value="GYM" style={styles.pickerItem} />
<Picker.Item label="Sonora (HMO) - Aeropuerto Internacional de Hermosillo" value="HMO" style={styles.pickerItem} />
<Picker.Item label="Sonora (NOG) - Aeropuerto Internacional de Nogales" value="NOG" style={styles.pickerItem} />
<Picker.Item label="Sonora (NAV) - Aeropuerto Nacional de Navojoa" value="NAV" style={styles.pickerItem} />
<Picker.Item label="Sonora (SLR) - Aeropuerto Nacional de San Luis Río Colorado" value="SLR" style={styles.pickerItem} />
<Picker.Item label="Sonora (XAL) - Aeropuerto Nacional de Álamos" value="XAL" style={styles.pickerItem} />
<Picker.Item label="Tabasco (VSA) - Aeropuerto Nacional de Villahermosa" value="VSA" style={styles.pickerItem} />
<Picker.Item label="Tamaulipas (CVM) - Aeropuerto Internacional de Ciudad Victoria" value="CVM" style={styles.pickerItem} />
<Picker.Item label="Tamaulipas (MAM) - Aeropuerto Internacional de Matamoros" value="MAM" style={styles.pickerItem} />
<Picker.Item label="Tamaulipas (MMC) - Aeropuerto Nacional de Ciudad Mante" value="MMC" style={styles.pickerItem} />
<Picker.Item label="Veracruz (VER) - Aeropuerto Internacional de Veracruz" value="VER" style={styles.pickerItem} />
<Picker.Item label="Yucatán (MID) - Aeropuerto Internacional de Mérida" value="MID" style={styles.pickerItem} />
<Picker.Item label="Zacatecas (ZAC) - Aeropuerto Nacional de Zacatecas" value="ZAC" style={styles.pickerItem} />

        </Picker>

        <Text style={styles.label}>Destino</Text>
        <Picker
          selectedValue={destination}
          onValueChange={(itemValue) => setDestination(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona el destino" value="" style={styles.pickerItem} />
          <Picker.Item label="Aguascalientes (AGU) - Aeropuerto Internacional de Aguascalientes" value="AGU" style={styles.pickerItem} />
<Picker.Item label="Baja California (CDI) - Aeropuerto Nacional de Isla de Cedros" value="CDI" style={styles.pickerItem} />
<Picker.Item label="Baja California (ESE) - Aeropuerto Internacional de Ensenada" value="ESE" style={styles.pickerItem} />
<Picker.Item label="Baja California (MXL) - Aeropuerto Internacional de Mexicali" value="MXL" style={styles.pickerItem} />
<Picker.Item label="Baja California (TIJ) - Aeropuerto Nacional de Tijuana" value="TIJ" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (CSL) - Aeródromo Internacional de Cabo San Lucas" value="CSL" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (GUB) - Aeropuerto Nacional de Guerrero Negro" value="GUB" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (LAP) - Aeropuerto Internacional de La Paz" value="LAP" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (LTO) - Aeropuerto Internacional de Loreto" value="LTO" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (SJD) - Aeropuerto Internacional de San José del Cabo" value="SJD" style={styles.pickerItem} />
<Picker.Item label="Baja California Sur (SRL) - Aeropuerto Internacional de Santa Rosalía" value="SRL" style={styles.pickerItem} />
<Picker.Item label="Campeche (CPE) - Aeropuerto Internacional de Campeche" value="CPE" style={styles.pickerItem} />
<Picker.Item label="Chiapas (CJT) - Aeropuerto Nacional de Comitán" value="CJT" style={styles.pickerItem} />
<Picker.Item label="Chiapas (PQM) - Aeropuerto Nacional de Palenque" value="PQM" style={styles.pickerItem} />
<Picker.Item label="Chiapas (PJP) - Aeropuerto Nacional Armando Duvalier" value="PJP" style={styles.pickerItem} />
<Picker.Item label="Chihuahua (CUU) - Aeropuerto Internacional de Chihuahua" value="CUU" style={styles.pickerItem} />
<Picker.Item label="Chihuahua (NCG) - Aeropuerto Nacional de Nuevo Casas Grandes" value="NCG" style={styles.pickerItem} />
<Picker.Item label="Coahuila (ACN) - Aeropuerto Internacional de Ciudad Acuña" value="ACN" style={styles.pickerItem} />
<Picker.Item label="Coahuila (LOV) - Aeropuerto Internacional Venustiano Carranza" value="LOV" style={styles.pickerItem} />
<Picker.Item label="Coahuila (PDS) - Aeropuerto Internacional de Piedras Negras" value="PDS" style={styles.pickerItem} />
<Picker.Item label="Colima (CLQ) - Aeropuerto Nacional de Colima" value="CLQ" style={styles.pickerItem} />
<Picker.Item label="Colima (ZLO) - Aeropuerto Internacional Playa de Oro" value="ZLO" style={styles.pickerItem} />
<Picker.Item label="Durango (DGO) - Aeropuerto Internacional de Durango" value="DGO" style={styles.pickerItem} />
<Picker.Item label="Estado de México (TLC) - Aeropuerto Nacional de Toluca" value="TLC" style={styles.pickerItem} />
<Picker.Item label="Guanajuato (BJX) - Aeropuerto Internacional de Guanajuato" value="BJX" style={styles.pickerItem} />
<Picker.Item label="Guanajuato (CYW) - Aeropuerto Nacional Capitán Rogelio Castillo" value="CYW" style={styles.pickerItem} />
<Picker.Item label="Guerrero (ACA) - Aeropuerto Internacional de Acapulco" value="ACA" style={styles.pickerItem} />
<Picker.Item label="Guerrero (PIE) - Base Aérea No. 7 León González Pie de la Cuesta" value="PIE" style={styles.pickerItem} />
<Picker.Item label="Guerrero (ZIH) - Aeropuerto Internacional de Zihuatanejo" value="ZIH" style={styles.pickerItem} />
<Picker.Item label="Hidalgo (PCA) - Aeropuerto Internacional de Pachuca" value="PCA" style={styles.pickerItem} />
<Picker.Item label="Jalisco (GDL) - Aeropuerto Internacional de Guadalajara" value="GDL" style={styles.pickerItem} />
<Picker.Item label="Michoacán (AZG) - Aeropuerto Nacional Pablo L. Sidar" value="AZG" style={styles.pickerItem} />
<Picker.Item label="Michoacán (MLM) - Aeropuerto Internacional de Morelia" value="MLM" style={styles.pickerItem} />
<Picker.Item label="Morelos (CVJ) - Aeropuerto Internacional de Cuernavaca" value="CVJ" style={styles.pickerItem} />
<Picker.Item label="Nuevo León (—) - Aeropuerto Internacional ‘Del Norte’ Monterrey" value="—" style={styles.pickerItem} />
<Picker.Item label="Nuevo León (MTY) - Aeropuerto ‘Mariano Escobedo’ Monterrey" value="MTY" style={styles.pickerItem} />
<Picker.Item label="Nuevo León (NTR) - Aeropuerto Internacional del Norte" value="NTR" style={styles.pickerItem} />
<Picker.Item label="Oaxaca (HUX) - Aeropuerto Internacional de Huatulco" value="HUX" style={styles.pickerItem} />
<Picker.Item label="Oaxaca (OAX) - Aeropuerto Internacional de Oaxaca" value="OAX" style={styles.pickerItem} />
<Picker.Item label="Oaxaca (PXM) - Aeropuerto Internacional de Puerto Escondido" value="PXM" style={styles.pickerItem} />
<Picker.Item label="Puebla (PBC) - Aeropuerto Internacional de Puebla" value="PBC" style={styles.pickerItem} />
<Picker.Item label="Quintana Roo (CUN) - Aeropuerto Internacional de Cancún" value="CUN" style={styles.pickerItem} />
<Picker.Item label="Quintana Roo (CTM) - Aeropuerto Internacional de Chetumal" value="CTM" style={styles.pickerItem} />
<Picker.Item label="Quintana Roo (ISJ) - Aeropuerto Nacional de Isla Mujeres" value="ISJ" style={styles.pickerItem} />
<Picker.Item label="San Luis Potosí (SLP) - Aeropuerto Internacional de San Luis Potosí" value="SLP" style={styles.pickerItem} />
<Picker.Item label="Sinaloa (CUL) - Aeropuerto Internacional de Culiacán" value="CUL" style={styles.pickerItem} />
<Picker.Item label="Sinaloa (LMM) - Aeropuerto Internacional de Los Mochis" value="LMM" style={styles.pickerItem} />
<Picker.Item label="Sinaloa (MZT) - Aeropuerto Internacional de Mazatlán" value="MZT" style={styles.pickerItem} />
<Picker.Item label="Sonora (CEN) - Aeropuerto Internacional de Ciudad Obregón" value="CEN" style={styles.pickerItem} />
<Picker.Item label="Sonora (CNA) - Aeropuerto Nacional de Cananea" value="CNA" style={styles.pickerItem} />
<Picker.Item label="Sonora (GYM) - Aeropuerto Internacional de Guaymas" value="GYM" style={styles.pickerItem} />
<Picker.Item label="Sonora (HMO) - Aeropuerto Internacional de Hermosillo" value="HMO" style={styles.pickerItem} />
<Picker.Item label="Sonora (NOG) - Aeropuerto Internacional de Nogales" value="NOG" style={styles.pickerItem} />
<Picker.Item label="Sonora (NAV) - Aeropuerto Nacional de Navojoa" value="NAV" style={styles.pickerItem} />
<Picker.Item label="Sonora (SLR) - Aeropuerto Nacional de San Luis Río Colorado" value="SLR" style={styles.pickerItem} />
<Picker.Item label="Sonora (XAL) - Aeropuerto Nacional de Álamos" value="XAL" style={styles.pickerItem} />
<Picker.Item label="Tabasco (VSA) - Aeropuerto Nacional de Villahermosa" value="VSA" style={styles.pickerItem} />
<Picker.Item label="Tamaulipas (CVM) - Aeropuerto Internacional de Ciudad Victoria" value="CVM" style={styles.pickerItem} />
<Picker.Item label="Tamaulipas (MAM) - Aeropuerto Internacional de Matamoros" value="MAM" style={styles.pickerItem} />
<Picker.Item label="Tamaulipas (MMC) - Aeropuerto Nacional de Ciudad Mante" value="MMC" style={styles.pickerItem} />
<Picker.Item label="Veracruz (VER) - Aeropuerto Internacional de Veracruz" value="VER" style={styles.pickerItem} />
<Picker.Item label="Yucatán (MID) - Aeropuerto Internacional de Mérida" value="MID" style={styles.pickerItem} />
<Picker.Item label="Zacatecas (ZAC) - Aeropuerto Nacional de Zacatecas" value="ZAC" style={styles.pickerItem} />

        </Picker>

        <Text style={styles.label}>Fecha de salida</Text>
        <View style={styles.datePickerContainer}>
          <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar-today" size={30} color="#FFFFFF" />
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

        <Text style={styles.label}>Hora de salida</Text>
        <View style={styles.datePickerContainer}>
          <Text style={styles.dateText}>{formatTime(departureTime)}</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)}>
            <Icon name="access-time" size={30} color="#FFFFFF" />
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

        <Text style={styles.label}>Tipo de viajero</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowTravelerModal(true)}>
          <Text style={styles.travelerText}>{`${adultCount} Adultos, ${childCount} Niños, ${infantCount} Infantes`}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          animationType="slide"
          visible={showTravelerModal}
          onRequestClose={() => setShowTravelerModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>Adultos</Text>
              <View style={styles.counterContainer}>
                <Button title="-" onPress={() => setAdultCount(Math.max(1, adultCount - 1))} color="#007bff" />
                <Text style={styles.counterText}>{adultCount}</Text>
                <Button title="+" onPress={() => setAdultCount(adultCount + 1)} color="#007bff" />
              </View>

              <Text style={styles.modalLabel}>Niños</Text>
              <View style={styles.counterContainer}>
                <Button title="-" onPress={() => setChildCount(Math.max(0, childCount - 1))} color="#007bff" />
                <Text style={styles.counterText}>{childCount}</Text>
                <Button title="+" onPress={() => setChildCount(childCount + 1)} color="#007bff" />
              </View>

              <Text style={styles.modalLabel}>Infantes</Text>
              <View style={styles.counterContainer}>
                <Button title="-" onPress={() => setInfantCount(Math.max(0, infantCount - 1))} color="#007bff" />
                <Text style={styles.counterText}>{infantCount}</Text>
                <Button title="+" onPress={() => setInfantCount(infantCount + 1)} color="#007bff" />
              </View>

              <Button title="Aceptar" onPress={() => setShowTravelerModal(false)} color="#007bff" />
            </View>
          </View>
        </Modal>

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Buscar vuelos</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd', // Fondo azul claro
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#0d47a1', // Azul más vivo
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#ffffff', // Fondo blanco para el picker
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0d47a1', // Borde azul vivo
    marginVertical: 10,
  },
  pickerItem: {
    color: '#0d47a1', // Color del texto del item
    fontSize: 16,
    padding: 10,
    backgroundColor: '#ffffff', // Fondo blanco para cada item
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d47a1', // Azul fuerte
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  dateText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff', // Fondo blanco
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalLabel: {
    fontSize: 16,
    color: '#0d47a1', // Azul más vivo
    marginBottom: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#0d47a1', // Azul más fuerte
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 18,
  },
  travelerText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
  },
});

export default SearchScreen;
