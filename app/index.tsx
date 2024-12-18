import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CTextInput } from "../componets/Input/CTextinput";
import { CButton } from "../componets/Button/CButton";
import { Colors } from "@/constants/Colors";
import { loginUser } from "../assets/api/loginUser";
const Index = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(user, password);
      // validate with  variable
      if (result?.Exito) {
        Alert.alert("Éxito", "Inicio de sesión exitoso.");
        router.push("/home");
      } else {
        const errorMessage =
          result?.Mensaje || "Usuario o contraseña incorrectos.";
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.error("Error en el login:", error);
      Alert.alert(
        "Error",
        error.message || "Ocurrió un problema con el inicio de sesión."
      );
    } finally {
      setLoading(false);
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
        secureTextEntry={!showPassword}
        rightIcon={showPassword ? "eye-off" : "eye"}
        onRightIconPress={() => setShowPassword(!showPassword)}
      />

      <View style={styles.containerButtons}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.blue} />
        ) : (
          <CButton
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            buttonColor={Colors.blue}
            text="Ingresar"
            textColor="white"
          />
        )}
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
