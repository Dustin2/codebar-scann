import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Button, Chip, Divider, List, TextInput } from "react-native-paper";
import {
  getPositions,
  getLayers,
  getRows,
} from "../assets/api/positionsContainer";
import { Colors } from "../constants/Colors";

const AssignPositions = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [mapData, setMapData] = useState(data);
  const [expanded, setExpanded] = useState(null); // Estado para almacenar el id del acordeón abierto

  const handlePress = (id) => {
    // Si el acordeón clickeado ya está abierto, lo cerramos; si no, lo abrimos.
    setExpanded(expanded === id ? null : id);
  };

  const handleFetchData = async () => {
    if (!text) {
      Alert.alert("Error", "Por favor, ingresa un código válido.");
      return;
    }

    setLoading(true);

    try {
      const [positionsResponse, rowsResponse, layersResponse] =
        await Promise.all([getPositions(text), getRows(text), getLayers(text)]);

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
      // setMapData(positionsData + layersData || []);
      console.log(layersData);
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
        onPress={() => {
          data.length > 0 || data2.length > 0 || data3.length > 0
            ? Alert.alert("Error", "Ya se han obtenido los datos.")
            : handleFetchData();
        }}
        style={styles.button}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : "Obtener datos"}
      </Button>

      {/* Data posicion 1
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

      {/* Data fila 2 */}
      {/* <View style={styles.dataSection}>
        <Text style={styles.dataTitle}>Filas:</Text>
        {data2.length > 0 ? (
          data2.map((item, index) => (
            <Text key={index} style={styles.dataItem}>
              ID Fila: {item.id_fila}
            </Text>
          ))
        ) : (
          <Text style={styles.noData}>No hay datos disponibles</Text>
        )}
      </View> */}

      {/* Data capa 3 */}
      {/* <View style={styles.dataSection}>
        <Text style={styles.dataTitle}>Capas:</Text>
        {data3.length > 0 ? (
          data3.map((item, index) => (
            <Text key={index} style={styles.dataItem}>
              ID Capa: {item.id_capa}
              ID Capa: {item.descipcion}
            </Text>
          ))
        ) : (
          <Text style={styles.noData}>No hay datos disponibles</Text>
        )}
      </View>  */}
      <View style={styles.listContainer}>
        <List.Section>
          {data2.map((rows, index) => (
            <View key={rows.id_fila}>
              <List.Accordion
                rippleColor={Colors.lightGrey}
                title={`Fila ${rows.id_fila}`}
                expanded={expanded === rows.id_fila}
                onPress={() => handlePress(rows.id_fila)}
              >
                <View style={styles.gridContainer}>
                  {data.map((positions) => (
                    <Chip
                      key={positions.id_posicion}
                      onPress={() => {
                        // Acción al presionar el chip
                      }}
                      style={styles.chip}
                    >
                      {`Posición ${positions.id_posicion}`}
                    </Chip>
                  ))}
                </View>
              </List.Accordion>
              {/* Divisor */}
              {index < data2.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </List.Section>
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
  listContainer: {
    // flex: 1,
    // padding: 12,
  },
  gridContainer: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chip: {
    margin: 8,
    // flex: 1,
    height: 40,
    justifyContent: "center",
  },
  divider: {
    height: 2,
    // backgroundColor: Colors.lightGrey,
    marginVertical: 1,
  },
});
