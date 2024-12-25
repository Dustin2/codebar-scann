import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { List, Chip } from "react-native-paper";
import { Colors } from "../constants/Colors";

const AssignPositions = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  // Configuración de filas, capas y posiciones
  const rows = [1, 2, 3, 4, 5]; // Filas
  const layers = ["E", "D", "C", "B", "A"]; // Capas
  const positions = Array.from({ length: 25 }, (_, i) => i + 1); // Posiciones del 1 al 25

  // Manejo de la expansión de las filas
  const handlePress = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  // Renderizado del contenido
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Asigna una posición al rollo</Text>
      <View style={styles.listContainer}>
        <List.Section>
          {rows.map((row) => (
            <View key={row}>
              <List.Accordion
                rippleColor={Colors.lightGrey}
                title={`Fila ${row}`}
                expanded={expanded === row}
                onPress={() => handlePress(row)}
              >
                <View style={styles.gridContainer}>
                  {layers.map((layer) =>
                    positions.map((pos) => (
                      <Chip
                        key={`${row}-${layer}-${pos}`}
                        onPress={() => {
                          console.log(`Fila ${row}, Capa ${layer}, Posición ${pos}`);
                        }}
                        style={styles.chip}
                      >
                        {`${row}${layer}${pos}`}
                      </Chip>
                    ))
                  )}
                </View>
              </List.Accordion>
            </View>
          ))}
        </List.Section>
      </View>
    </ScrollView>
  );
};

export default AssignPositions;

// Estilos del componente
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
  listContainer: {
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chip: {
    margin: 8,
    height: 40,
    justifyContent: "center",
  },
});
