// react
import React, { useState } from "react";

// rn
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";

//expo api
import { useCameraPermissions, CameraView } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

// api
import { getRolloByCodigo } from "../assets/api/RolloApi";

const Home = () => {
  
  const [cameraVisible, setCameraVisible] = useState(false);
  const [scannedData, setScannedData] = useState(""); // Guarda el valor escaneado o ingresado
  const [rolloData, setRolloData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [focus, setFocus] = useState(true);

  const focusCamera = () => {
    setFocus(false);
    setTimeout(() => {
      setFocus(true);
    }, 200);
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Text style={styles.message}>
          Es necesario otorgar permisos para usar la cámara.
        </Text>
        <Button onPress={requestPermission} title="Dar permisos" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setCameraVisible(false);
    setScannedData(data);
    // Alert.alert("Código Escaneado", `Tipo: ${type}\nDatos: ${data}`);
    await fetchRolloData(data);
    router.push("/assingPositions");
  };

  const fetchRolloData = async (codigo: string) => {
    if (!codigo) {
      Alert.alert("Error", "Por favor, ingresa un código válido.");
      return;
    }

    setLoading(true);
    try {
      const data = await getRolloByCodigo(codigo);
      setRolloData(data);

      if (data.Error === 1) {
        Alert.alert("Rollo No Encontrado", data.Mensaje);
      } else {
        // Alert.alert("Éxito", "Datos obtenidos correctamente");
        router.push("/assingPositions");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo obtener la información del rollo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Escanear</Text>
        {/* <Text style={styles.navText}>Escanear</Text> */}
        
      </View>

      {!cameraVisible ? (
        <View style={styles.content}>
          {/* Botón para activar la cámara */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraVisible(true)}
          >
            <Text style={styles.buttonText}>Activar Cámara</Text>
          </TouchableOpacity>

          {/* Caja de texto editable */}
          <TextInput
            style={styles.input}
            value={scannedData}
            placeholder="Ingresa el código manualmente"
            onChangeText={(text) => setScannedData(text)}
          />

          {/* Botón para buscar rollo */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => fetchRolloData(scannedData)}
          >
            <Text style={styles.buttonText}>Buscar Rollo</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          {/* Mostrar información del rollo */}
          {rolloData && (
            <View style={styles.resultContainer}>
              {/* <Text style={styles.resultTitle}>Información del Rollo:</Text> */}
              {/* <Text>{JSON.stringify(rolloData, null, 2)}</Text> */}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView
            autoFocus={focus}
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: [
                "qr",
                "code128",
                "ean13",
                "ean8",
                "code39",
                "upc_e",
              ],
            }}
            onBarcodeScanned={handleBarCodeScanned}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={focusCamera}
              style={styles.cameraOverlay}
            />
          </CameraView>
          <Button
            title="Cerrar Cámara"
            onPress={() => setCameraVisible(false)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    // height: 100,
    // width: 100,
    // alignContent: "center",
    // alignItems: "center",
  },
  navbar: {
    height: 60,
    backgroundColor: "#002855",
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#002855",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginVertical: 10,
  },
  searchButton: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  cameraOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  message: {
    // flex: 1,
    // alignItems: "center",
    // width: 100,
    // height: 120,
    // verticalAlign: "bottom",
  },
});

export default Home;
