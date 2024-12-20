import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [focusedInput, setIsFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aquí va la lógica de autenticación
    setIsAuthenticated(true); // Si la autenticación es exitosa
  };

  return (
    <View style={styles.container}>
      <ImageBackground /* Imagen de fondo */
        source={require("../../assets/images/WallpaperBlue.png")} // Ruta de la imagen de fondo
        style={styles.backgroundImage} // Estilo para el ImageBackground
        resizeMode="cover" /* tomar toda la pantalla */
      >
        <View style={styles.contenido}>
          <Image
            source={require("../../assets/icons/LogoBird.png")}
            resizeMode="contain"
            style={styles.logoImage}
          />

          <Text style={styles.textoEncabezado}>Username / Email</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "email" && styles.focusedInput,
            ]}
            maxLength={35}
            selectionColor="#158AD8FF"
            placeholder="example01@email.com"
            placeholderTextColor="#BBBBBB"
            value={email} // Asignar el valor del email
            onChangeText={setEmail} // Actualizar el estado del email
            onFocus={() => setIsFocused("email")}
            onBlur={() => setIsFocused(null)}
          />

          <Text style={styles.textoEncabezado}>
            Usuario / Correo electronico
          </Text>
          <TextInput //Entrada de la contraseña del usuario
            style={[
              styles.input,
              focusedInput === "password" && styles.focusedInput,
            ]}
            secureTextEntry
            placeholder="password_example"
            placeholderTextColor="#BBBBBB"
            value={password}
            onChangeText={setPassword}
            selectionColor="#158AD8FF" //Color del cursor textInput
            onFocus={() => setIsFocused("password")}
            onBlur={() => setIsFocused(null)}
          />

          <TouchableOpacity style={styles.botonLogReg} onPress={handleLogin}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize:15
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#ffffff" }}>Create an account</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    //Pricipal
    flex: 1,
  },
  backgroundImage: {
    //Principal / BackgroundImage
    flex: 1,
  },
  contenido: {
    //Principal/BackgroundImage/Contenido
    flex: 1,
    margin: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 8,
    marginBottom: 10,
    borderRadius: 30,
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",

    //borderColor: "#FFFFFF",
    //borderWidth: 4,
  },
  focusedInput: {
    elevation: 20,
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 35,
    color: "#2EABFFFF",
    shadowColor: "#05043FFF",
    shadowOffset: { width: 0, height: 1 },

    borderColor: "#22B6FAFF",
    borderWidth: 3,
  },
  logoImage: {
    width: "20%",
    height: "20%",
  },
  textoEncabezado: {
    color: "#ffffff",
    marginBottom: 5,
  },
  botonLogReg: {
    width: "100%",
    padding: 10,
    backgroundColor: "#158AD8FF",
    borderRadius: 30,
    marginBottom: 5,
    marginTop: 15,
  },
});
