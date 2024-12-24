//react
import React, { useState } from "react";

//rn
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
//expo
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

//custom componets
import { CTextInput } from "../componets/Input/CTextinput";
import { CButton } from "../componets/Button/CButton";

//constans
import { Colors } from "../constants/Colors";

//api
import { loginUser } from "../assets/api/loginUser";

const Index = () => {
  //use for move entry screens
  const router = useRouter();

  // usestates
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(user, password);
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
        // autoCapitalize="none"
        rightIcon="account"
        underlineColor={Colors.blue}
        activeUnderlineColor={Colors.blue}
      />
      <CTextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry={hidePass} // Control de texto seguro
        rightIcon={hidePass ? "eye" : "eye-off"} // Alterna íconos dinámicamente
        onRightIconPress={() => setHidePass(!hidePass)} // Alterna el estado
        underlineColor={Colors.blue} // Color de subrayado
        activeUnderlineColor={Colors.blue} // Color activo
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
      <CButton
        mode="contained"
        onPress={() => {
          router.push("/assingPositions");
        }}
        style={styles.button}
        buttonColor={Colors.blue}
        text="posiciones"
        textColor="white"
      />
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
    // alignSelf:'center',
  },
  button: {
    marginBottom: 15,
    marginTop: 15,
  },
});

export default Index;
