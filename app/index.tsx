import React, { useState } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
KeyboardAvoidingView
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { CTextInput } from "../componets/Input/CTextinput";
import { CButton } from "../componets/Button/CButton";
import { Colors } from "../constants/Colors";
import { loginUser } from "../assets/api/loginUser";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(user, password);
      if (result?.Exito) {
        Alert.alert("Success", "Login successful.");
        router.push("/home");
      } else {
        const errorMessage = result?.Mensaje || "Incorrect email or password.";
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.darkBlue} />
      {/* Logo */}
      <View style={{}}>
        <Image
          source={require("../assets/images/logo-header-transformed.png")}
          style={styles.logoTop}
          contentFit="contain"
        />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <CTextInput
          label="Email"
          value={user}
          onChangeText={setUser}
          underlineColor={Colors.blue}
          activeUnderlineColor={Colors.blue}
          activeOutlineColor={Colors.blue}
          style={styles.input}
          keyboardType="email-address"
        />
        <CTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          underlineColor={Colors.blue}
          activeUnderlineColor={Colors.blue}
          activeOutlineColor={Colors.blue}

          secureTextEntry={hidePass}
          rightIcon={hidePass ? "eye" : "eye-off"}
          onRightIconPress={() => setHidePass(!hidePass)}
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
              text="LOGIN"
              textColor="white"
            />
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        {/* <CButton
          mode="contained"
          onPress={() => router.push("/home")}
          style={styles.button}
          buttonColor={Colors.blue}
          text="inicio"
          textColor="white"
        /> */}
      </View>
      <View style={{}}>
        <Image
          source={require("../assets/images/logo-footer.jpg")}
          style={styles.logoTop}
          contentFit="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  logoTop: {
    height: 200,
    width: 200,
  },

  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: Colors.blue,
    textDecorationLine: "underline",
  },
  containerButtons: {
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
