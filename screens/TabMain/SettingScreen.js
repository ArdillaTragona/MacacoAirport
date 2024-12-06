import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

const SettingScreen = () => {
  
  const configPerfil = [
    { id: "1", icon: "account", text: "Perfil" },
    { id: "2", icon: "account-edit", text: "Edit perfil" },
    { id: "3", icon: "account-details", text: "Account details" },
  ];

  const configPaymentMethod = [
    { id: "1", icon: "credit-card-edit", text: "Edit payment method" },
    { id: "2", icon: "credit-card-plus", text: "Add credit card" },
    { id: "3", icon: "credit-card-minus", text: "Delete credit card" },
  ];

  const configApplication = [
    { id: "1", icon: "archive", text: "Archive flight" },
    { id: "2", icon: "application-settings", text: "Application settings" },
    { id: "3", icon: "application-edit", text: "Customize application" },
  ];

  return (
    <View>
      <View style={styles.contUserData}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialCommunityIcons
            name="account-circle"
            size={50}
            color="white"
          />
          <View>
            <Text style={styles.txtEncabezado}>Username</Text>
            <Text style={styles.txtDatosUser}>CESAR GABRIEL TEISTA GARCIA</Text>
          </View>
        </View>

        <Text style={styles.userLevel}>Level 5</Text>
      </View>

      <View style={styles.contSettings}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 50,
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.txtConfiguration}>Configuration</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <FontAwesome name="search" size={25} color="#546F807B" />
            <Ionicons name="settings-sharp" size={25} color="#546F807B" />
          </View>
        </View>

        <View style={styles.contOptions}>
          <Text style={styles.txtSettingEncabezado}>Perfil setting</Text>
          <FlatList
            data={configPerfil}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConfigItem icon={item.icon} text={item.text} />
            )}
          />
        </View>
        <View style={styles.contOptions}>
          <Text style={styles.txtSettingEncabezado}>Payment setting</Text>
          <FlatList
            style={styles.listOpcion}
            data={configPaymentMethod}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConfigItem icon={item.icon} text={item.text} />
            )}
          />
        </View>
        <View style={styles.contOptions}>
          <Text style={styles.txtSettingEncabezado}>Application setting</Text>
          <FlatList
            style={styles.listOpcion}
            data={configApplication}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConfigItem icon={item.icon} text={item.text} />
            )}
          />
        </View>
      </View>
      <BotonLogout />
    </View>
  );
};

const ConfigItem = ({ icon, text }) => {
  return (
    <TouchableOpacity>
      <View style={styles.rowOpcion}>
        <MaterialCommunityIcons name={icon} size={30} color="#546F80FF" />
        <Text style={styles.txtOpcion}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const BotonLogout = () => {
  return (
    <TouchableOpacity style={styles.botonLogout}>
      <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
        Log out
      </Text>
    </TouchableOpacity>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  contUserData: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2EABFFFF",
  },
  contSettings: {
    padding: 20,
    paddingTop: 5,
  },
  contOptions: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    elevation: 10,
    marginBottom: 10,
  },
  txtEncabezado: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  txtDatosUser: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  userLevel: {
    color: "#FFFFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  rowOpcion: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    width: "100%",
    gap: 10,
  },
  txtOpcion: {
    fontWeight: "bold",
    color: "#546F80FF",
  },
  txtSettingEncabezado: {
    color: "#2EABFFFF",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  txtConfiguration: {
    color: "#546F80FF",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  botonLogout: {
    backgroundColor: "#2EABFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    height: 30,
    borderRadius: 5,
    elevation: 5,
  },
});
