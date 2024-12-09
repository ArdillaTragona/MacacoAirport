import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../credenciales"; // Importa las credenciales y Firebase
import { getDoc, doc } from "firebase/firestore"; // Para leer los datos de Firestore

const SettingScreen = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const navigation = useNavigation();

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName); // Navegar a la pantalla correspondiente
  };

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

  useEffect(() => {
    // Obtener el usuario autenticado
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Consultar los datos adicionales del usuario en Firestore
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef)
        .then((documentSnapshot) => {
          if (documentSnapshot.exists()) {
            const userData = documentSnapshot.data();
            console.log("User Data from Firestore:", userData); // Agregar un log para ver los datos

            setUserData({
              username: userData.username || "No Username", // Usar username
              email: currentUser.email || "No Email", // Usar el correo del usuario
            });
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, []);

  // Verifica que los datos de usuario estén correctamente cargados
  console.log("User Data state:", userData);

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
            <Text style={styles.txtEncabezado}>{userData.username}</Text>
            <Text style={styles.txtDatosUser}>{userData.email}</Text>
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
              <ConfigItem
                icon={item.icon}
                text={item.text}
                onPress={handleNavigation(item.text)}
              />
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
              <ConfigItem
                icon={item.icon}
                text={item.text}
              />
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
              <ConfigItem
                icon={item.icon}
                text={item.text}
              />
            )}
          />
        </View>
      </View>
      <BotonLogout />
    </View>
  );
};

const ConfigItem = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rowOpcion}>
        <MaterialCommunityIcons name={icon} size={30} color="#546F80FF" />
        {/* Asegúrate de que el texto esté dentro del componente <Text> */}
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
    fontSize: 18,
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
