import React, { useState } from "react";
// rn
import { View, Text, StyleSheet } from "react-native";
// expo
import { useRouter } from 'expo-router'; // Corregir importación de useRouter
//
import { CTextInput } from "../componets/Input/CTextinput";
import { CButton } from "../componets/Button/CButton";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter(); // Inicializar el router con useRouter
  
  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Realizar validaciones o lógica antes de la navegación
    router.push('/home'); // Usar router.push correctamente
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
      <Text style={styles.footerText} onPress={() => {}}>Forgot Password?</Text>
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
