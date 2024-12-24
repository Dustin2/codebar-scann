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
} from "../assets/api/positionsContainer";

const AssignPositions = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const handleFetchData = async () => {
    if (!text) {
      Alert.alert("Error", "Por favor, ingresa un código válido.");
      return;
    }

    setLoading(true);

    try {
      const [positionsResponse, rowsResponse, layersResponse] = await Promise.all([
        getPositions(text),
        getRows(text),
        getLayers(text),
      ]);

      const { Data: positionsData, Error: positionsError } = positionsResponse;
      const { Data: rowsData, Error: rowsError } = rowsResponse;
      const { Data: layersData, Error: layersError } = layersResponse;

      if (positionsError || rowsError || layersError) {
        Alert.alert("Error", "Hubo un problema obteniendo algunos datos.");
        return;
      }

      setData(positionsData || []);
      setData2(rowsData || []);
      setData3(layersData || []);

      Alert.alert("Éxito", "Datos obtenidos correctamente.");
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
        onPress={handleFetchData}
        style={styles.button}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : "Obtener datos"}
      </Button>

      <View style={styles.dataSection}>
        <Text style={styles.dataTitle}>Posiciones:</Text>
        {data.length > 0 ? (
          data.map((item, index) => (
            <Text key={index} style={styles.dataItem}>
              ID Posición: {item.id_posicion}
            </Text>
          ))
        ) : (
          <Text style={styles.noData}>No hay datos disponibles</Text>
        )}
      </View>
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
  dataSection: {
    marginTop: 20,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  dataItem: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  noData: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});
