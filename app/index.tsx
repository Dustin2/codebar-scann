import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
// Componentes personalizados
import { CTextInput } from "../componets/Input/CTextinput";
import { CButton } from "../componets/Button/CButton";
// Colores
import { Colors } from "@/constants/Colors";

{
  console.log(Constants.manifest2.cookie);
}

//constans from dotenv
import Constants from "expo-constants";
const Index = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Función para hacer login
  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña!");
      return;
    }

    try {
      // Define los headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic Og==");
      myHeaders.append("Cookie", Constants.cookie);

      // Define los datos del formulario
      const formdata = new FormData();
      formdata.append("user", user);
      formdata.append("password", password);

      // Configura las opciones de la solicitud
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      // Realiza la solicitud
      const response = await fetch(
        
        "https://qa.grupohazesa.mx/sistema1/index.php/Rest/LoginFlutter",
        requestOptions
      );

      // Verifica la respuesta
      if (!response.ok) {
        throw new Error("Error en la autenticación. Intenta de nuevo.");
      }

      const result = await response.text();
      console.log(result);
      // Alert.alert("Resultado", result);
      // Muestra el resultado en una alerta si el resultado es correcto
      router.push("/home");
      // Navegar o realizar acción adicional aquí
      // router.push("/someRoute"); // Puedes redirigir a otra pantalla
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message); // Muestra un error en caso de fallo
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>GRUPO HAZESA</Text>
      <CTextInput
        label="Usuario"
        value={user}
        onChangeText={setUser}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        rightIcon="account"
      />
      <CTextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        rightIcon="eye"
      />
      <View style={styles.containerButtons}>
        <CButton
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
          buttonColor={Colors.blue}
          text="Ingresar"
          textColor="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  containerButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 15,
    marginTop: 15,
  },
});

export default Index;
