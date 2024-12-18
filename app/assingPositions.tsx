import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  getPositions,
  getLayers,
  getRows,
} from "@/assets/api/positionsContainer"; // Asegúrate de que esta función esté bien implementada

const AssignPositions = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState<string | null>(null);
  const [data2, setData2] = useState<string | null>(null);
  const [data3, setData3] = useState<string | null>(null);

  const fetchData = async (codigo: string) => {
    if (!codigo) {
      Alert.alert("Error", "Por favor, ingresa un código válido.");
      return;
    }
    setLoading(true);
    try {
      const response = await getPositions(codigo); // Llama a tu API
      // const response1 = await getPositions(codigo); // Llama a tu API
      // const response2 = await getPositions(codigo); // Llama a tu API
      setData(JSON.stringify(response, null, 2)); // Convierte el JSON en string para mostrar
      if (response.error === 1) {
        Alert.alert("Error", response.message);
      } else {
        Alert.alert("Éxito", "Datos obtenidos correctamente");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la información.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchData2 = async (codigo: string) => {
    if (!codigo) {
      Alert.alert("Error", "Por favor, ingresa un código válido.");
      return;
    }
    setLoading(true);
    try {
      const response = await getRows(codigo); // Llama a tu API
      // const response1 = await getPositions(codigo); // Llama a tu API
      // const response2 = await getPositions(codigo); // Llama a tu API
      setData2(JSON.stringify(response, null, 2)); // Convierte el JSON en string para mostrar
      if (response.error === 1) {
        Alert.alert("Error", response.message);
      } else {
        Alert.alert("Éxito", "Datos obtenidos correctamente");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la información.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchData3 = async (codigo: string) => {
    if (!codigo) {
      Alert.alert("Error", "Por favor, ingresa un código válido.");
      return;
    }
    setLoading(true);
    try {
      const response = await getLayers(codigo); // Llama a tu API
      // const response1 = await getPositions(codigo); // Llama a tu API
      // const response2 = await getPositions(codigo); // Llama a tu API
      setData3(JSON.stringify(response, null, 2)); // Convierte el JSON en string para mostrar
      if (response.error === 1) {
        Alert.alert("Error", response.message);
      } else {
        Alert.alert("Éxito", "Datos obtenidos correctamente");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la información.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Asigna una posición al rollo</Text>
      <TextInput
        label="Código"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => {
          fetchData(text), fetchData2(text), fetchData3(text);
        }}
        style={styles.button}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : "Obtener datos"}
      </Button>

      {data && <Text style={styles.result}>{data}</Text>}
      {/* {data && <Text style={styles.result}>{data2}</Text>} */}
      {data && <Text style={styles.result}>{data3}</Text>}
    </ScrollView>
  );
};

export default AssignPositions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#00296b",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#00296b",
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
