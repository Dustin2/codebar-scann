import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
Alert,
  Button,
} from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";
import { StatusBar } from "expo-status-bar";

//interfaces
import { BarCodeScannedData } from "../interfaces/BarCodeScannedData";
// import 'dotenv/config'
// console.log(process.env)
const Home = () => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [focus, setFocus] = useState(true);

  //focus camera every 2 secs
  const focusCamera = () => {
    setFocus(false);
    setTimeout(() => {
      // if need read how to fix read this https://github.com/expo/expo/issues/26869
      setFocus(true);
    }, 200);
  };

  // validate permissions
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.message}>
          Es necesario otorgar permisos para usar la cámara.
        </Text>
        <Button onPress={requestPermission} title="Dar permisos" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: BarCodeScannedData) => {
    setCameraVisible(false); // Ocultar la cámara
    setScannedData(data); // Guardar datos escaneados
    Alert.alert("Código Escaneado", `Tipo: ${type}\nDatos: ${data}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.navbar}>
        <Text style={styles.navText}>Escanear</Text>
      </View>

      {/* Contenido */}
      {!cameraVisible ? (
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraVisible(true)}
          >
            <Text style={styles.buttonText}>Activar Cámara</Text>
          </TouchableOpacity>

          {/* Mostrar resultado escaneado */}
          <TextInput
            style={styles.input}
            value={scannedData}
            placeholder="Resultado del escaneo"
            editable={false}
          />
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <CameraView
            autoFocus={focus}
            style={{
              position: "relative",
              flex: 1,
              width: "100%",
              height: "100%",
            }}
            facing="back" // Valor directamente como string
            barcodeScannerSettings={{
              barcodeTypes: [
                "aztec",
                "ean13",
                "ean8",
                "qr",
                "pdf417",
                "upc_e",
                "datamatrix",
                "code39",
                "code93",
                "itf14",
                "codabar",
                "code128",
                "upc_a",
              ], // only support this types of barcode and qr
            }}
            onBarcodeScanned={handleBarCodeScanned}
            // autofocus="on"
            // BarcodeSize
          >
           
            <TouchableOpacity
              activeOpacity={1}
              onPress={focusCamera}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
              }}
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
  button: {
    backgroundColor: "#002855",
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
  message: {
    margin: 20,
    textAlign: "center",
  },
});

export default Home;
