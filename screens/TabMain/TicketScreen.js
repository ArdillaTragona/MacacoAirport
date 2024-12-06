import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { getTicketsForUser } from "../../database/TicketDB"; // Servicio de Firebase modificado
import { getAuth } from "firebase/auth";

const TicketScreen = () => {
  const [ticketData, setTicketData] = useState([]);

  const fetchTickets = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const tickets = await getTicketsForUser(user.uid); // Usamos el UID del usuario
      setTicketData(tickets);
    } else {
      console.error("Usuario no autenticado");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <View style={styles.contFather}>
      <HeaderHome onRefresh={fetchTickets} />
      <View style={styles.contListTicket}>
        <Text style={styles.txtEncHistorial}>Historial de Tickets</Text>
        <SectionList
          sections={ticketData.map((group) => ({
            fecha: group.date,
            data: group.tickets,
          }))}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.fecha}</Text>
          )}
          renderItem={({ item }) => (
            <TicketComponent
              origin={item.origin}
              destination={item.destination}
              firstName={item.firstName}
              lastName={item.lastName}
            />
          )}
        />
      </View>
    </View>
  );
};

const TicketComponent = ({ origin, destination, firstName, lastName }) => (
  <TouchableOpacity>
    <View style={styles.ticketGroup}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <MaterialCommunityIcons
          name="airplane-takeoff"
          size={24}
          color="#829AAAFF"
        />
        <Text style={styles.ticketText}>
          {origin} - {destination}
        </Text>
      </View>
      <Text style={{ fontSize: 14 }}>
        {firstName} {lastName}
      </Text>
    </View>
  </TouchableOpacity>
);

const HeaderHome = ({ onRefresh }) => (
  <View style={styles.headerVuelala}>
    <Image
      source={require("../../assets/icons/LogoBird.png")}
      resizeMode="contain"
      style={styles.logoImage}
    />
    <Text style={styles.Isotipo}>Vuelala</Text>
    <TouchableWithoutFeedback onPress={onRefresh}>
      <MaterialCommunityIcons
        name="refresh"
        size={24}
        color="white"
        style={styles.refreshIcon}
      />
    </TouchableWithoutFeedback>
  </View>
);

export default TicketScreen;

const styles = StyleSheet.create({
  contFather: {
    flex: 1,
    backgroundColor: "#FFFFFFFF",
  },
  content: {
    padding: 10,
    backgroundColor: "white",
  },
  contListTicket: {
    padding: 20,
  },
  txtEncHistorial: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#2EABFFFF",
    marginBottom: 10,
  },
  ticketGroup: {
    justifyContent: "space-between",
    backgroundColor: "#FAFAFAFF",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 2,
    elevation: 1,
    padding: 10,
  },
  ticketText: {
    fontSize: 16,
    paddingVertical: 3,
    color: "#829AAAFF",
    fontStyle: "italic",
    fontWeight: "800",
  },
  headerVuelala: {
    backgroundColor: "#2EABFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 25,
    height: 80,
    gap: 2,
    justifyContent: "space-between",
    paddingRight: 20,
  },
  sectionHeader: {
    color: "#BBBBBBFF",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    fontSize: 16,
  },
  logoImage: { width: 25, height: 25 },
  Isotipo: { color: "white", fontSize: 22, fontWeight: "800" },
  refreshIcon: {
    marginLeft: "auto",
  },
});
