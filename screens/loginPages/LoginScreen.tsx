import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function LoginScreen({ setIsAuthenticated }) {
  const handleLogin = () => {
    // Aquí va la lógica de autenticación
    setIsAuthenticated(true); // Si la autenticación es exitosa
  };

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={handleLogin} />
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
