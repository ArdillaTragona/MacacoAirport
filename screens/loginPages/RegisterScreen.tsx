import React from "react";
import { View, Button,StyleSheet } from "react-native";

export default function RegisterScreen({ setIsAuthenticated }) {
  const handleLogin = () => {
    // Aquí va la lógica de autenticación
    setIsAuthenticated(true); // Si la autenticación es exitosa
  };

  return (
    <View style={styles.container}>
      <Button title="Register" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      justifyContent: "center",
      alignItems: "center"
    },
  });