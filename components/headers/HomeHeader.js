import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const navigation = useNavigation();

  // Obtener el estado actual de navegación
  const state = navigation.getState();
  const currentRouteIndex = state.routes[state.index]?.state?.index || 0;

  const iconColor = (index) =>
    currentRouteIndex === index ? "white" : "#BED8E9FF";

  const icons = [
    "airplane-marker",
    "airplane-search",
    "account-multiple-plus",
    "seat",
    "credit-card",
  ];
  const labels = ["Route", "Flight", "Passenger", "Seat", "Payment"];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content" // Contenido de la barra en color claro
        backgroundColor="transparent" // Fondo transparente
        translucent={true} // Permite que el contenido debajo de la barra de estado sea visible
      />
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          height: 40,
          marginTop: 40,
        }}
      >
        <Image
          source={require("../../assets/icons/LogoBird.png")}
          resizeMode="contain"
          style={styles.logoImage}
        />
        <Text style={styles.Isotipo}>Vuelala</Text>
      </View>

      <View style={styles.row}>
        {icons.map((icon, index) => (
          <View key={icon} style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color={iconColor(index)}
              accessibilityLabel={`Navigate to ${icon.replace("-", " ")}`}
              accessibilityRole="button"
            />
            <Text style={[styles.label, { color: iconColor(index) }]}>
              {labels[index]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2EABFFFF",
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center", // Alinea el ícono y el texto verticalmente
  },
  label: {
    fontSize: 10,
  },
  logoImage: { width: 25, height: 30 },
  Isotipo: { color: "white", fontSize: 22, fontWeight: "800" },
});
