import React, { useEffect, useState } from "react";
// rn
import { View, Text, StyleSheet, Alert } from "react-native";
// expo
import { useRouter } from "expo-router";
//
import { CTextInput } from "../componets/Input/CTextinput";
import { CButton } from "../componets/Button/CButton";
//auth with fingerprint or face id
import * as LocalAuthentication from "expo-local-authentication";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    router.push("/home");
  };

  const handleBiometricAuth = async () => {
    try {
      // Comprobar si la biometría está disponible
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometricAvailable) {
        Alert.alert("Error", "La autenticación biométrica no está disponible.");
        return;
      }

      // Comprobar si hay datos biométricos registrados
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert("Error", "No hay datos biométricos registrados.");
        return;
      }

      // Solicitar autenticación biométrica
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verifica tu identidad",
        cancelLabel: "Cancelar",
        fallbackLabel: "Usar contraseña",
      });

      if (biometricAuth.success) {
        Alert.alert("Éxito", "Autenticación biométrica exitosa.");
        router.push("/home"); // Navegar a la página home si es exitoso
      } else {
        Alert.alert("Error", "Autenticación biométrica fallida.");
      }
    } catch (error) {
      console.error("Biometric Auth Error:", error);
      Alert.alert("Error", "Hubo un problema con la autenticación biométrica.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <CTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <CButton mode="contained" onPress={handleLogin} style={styles.button}>
        Log In
      </CButton>
      <CButton
        mode="contained"
        onPress={handleBiometricAuth}
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
      >
        Log In with Biometrics
      </CButton>
      <Text style={styles.footerText} onPress={() => {}}>
        Forgot Password?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
    marginTop: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default Index;
