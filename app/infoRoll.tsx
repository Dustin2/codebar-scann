import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../constants/Colors";

const infoRoll = () => {
  const { rolloData } = useLocalSearchParams();
  const data = rolloData ? JSON.parse(rolloData as string) : {};
  const rolloInfo = data.Data || {};

  return (
    <View style={styles.container}>
      {/* Título con el número de rollo */}
      <Text style={styles.title}>Rollo No: {rolloInfo.codigo || "N/A"}</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
          {/* Mostrar la información con "labels" y valores separados */}
          <View style={styles.row}>
            <Text style={styles.label}>BL</Text>
            <Text style={styles.value}>{rolloInfo.bl || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Buque</Text>
            <Text style={styles.value}>{rolloInfo.Buque || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Viaje</Text>
            <Text style={styles.value}>{rolloInfo.numero_viaje || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Medida 1</Text>
            <Text style={styles.value}>{rolloInfo.medida1 || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Medida 2</Text>
            <Text style={styles.value}>{rolloInfo.medida2 || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Peso Neto</Text>
            <Text style={styles.value}>{rolloInfo.peso_neto || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Peso Bruto</Text>
            <Text style={styles.value}>{rolloInfo.peso_bruto || "N/A"}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botón Guardar posición */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Guardar posición</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
    backgroundColor: Colors.blue,
    paddingVertical: 10,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.lightBlack,
    width: "40%",
  },
  value: {
    fontSize: 16,
    color: Colors.lightBlue,
    width: "60%",
    textAlign: "right",
  },
  button: {
    backgroundColor: Colors.blue,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default infoRoll;
