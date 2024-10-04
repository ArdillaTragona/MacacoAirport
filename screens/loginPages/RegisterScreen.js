import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

export default function RegisterScreen({ setIsAuthenticated, navigation }) {
  const [focusedInput, setIsFocused] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
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
            style={styles.logo}
            source={require("../../assets/icons/LogoBird.png")}
            resizeMode="contain"
          ></Image>

          <Text style={styles.textoEncabezado}>Username</Text>

          <TextInput
            style={[
              styles.input,
              focusedInput === "username" && styles.focusedInput,
            ]}
            maxLength={20} /* Capacidad maxima de caracteres */
            value={username}
            onChangeText={setUsername}
            selectionColor="#22B6FAFF"
            placeholder="username_example"
            placeholderTextColor="#BBBBBB"
            onBlur={() => setIsFocused(null)}
            onFocus={() => setIsFocused("username")}
          />

          <Text style={styles.textoEncabezado}>Email</Text>

          <TextInput
            style={[
              styles.input,
              focusedInput === "email" && styles.focusedInput,
            ]}
            placeholder="example01@gmail.com"
            value={email}
            onChangeText={setEmail}
            selectionColor="#22B6FAFF"
            keyboardType="email-address"
            placeholderTextColor="#BBBBBB"
            onFocus={() => setIsFocused("email")}
            onBlur={() => setIsFocused(null)}
          />

          <Text style={styles.textoEncabezado}>Password</Text>

          <TextInput
            style={[
              styles.input,
              focusedInput === "password" && styles.focusedInput,
            ]}
            placeholder="password_Example"
            selectionColor="#22B6FAFF"
            placeholderTextColor="#BBBBBB"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() =>
              setIsFocused("password")
            } /* Cuando el textinput esta enfocado */
            onBlur={() =>
              setIsFocused(null)
            } /* Cuando el textinput no esta enfocado */
          />

          <TouchableOpacity style={styles.botonLogReg} onPress={handleRegister}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#ffffff" }}>You hace an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{ color: "#ffffff", fontWeight: "bold", marginLeft: 10 }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

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
  logo: {
    width: "25%",
    height: "25%",
  },
  textoEncabezado: {
    color: "#ffffff",
    marginBottom: 5,
  },
  botonLogReg: {
    padding: 10,
    width: "100%",
    backgroundColor: "#158AD8FF",
    borderRadius: 30,
    marginBottom: 5,
    marginTop: 15,
  },
});
