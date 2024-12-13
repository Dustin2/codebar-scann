import axios from "axios";

const client = axios.create({
  baseURL:
    "http://qa.grupohazesa.com/sistema1/index.php/Rest/App_get_posiciones", //   replace here ur api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { useCameraPermissions, CameraView,Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [useHyteraScanner, setUseHyteraScanner] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();

  // Validar permisos
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.message}>
          Es necesario otorgar permisos para usar la cámara.
        </Text>
        <Button onPress={requestPermission} title="Dar permisos" />
      </View>
    );
  }

  // Manejar el escaneo de la cámara
  const handleBarCodeScanned = ({ type, data }) => {
    setCameraVisible(false); // Ocultar la cámara
    setScannedData(data); // Guardar datos escaneados
    Alert.alert("Código Escaneado", `Tipo: ${type}\nDatos: ${data}`);
  };

  // Manejar datos del escáner Hytera (se reciben automáticamente en el TextInput)
  const handleHyteraScan = (text) => {
    setScannedData(text); // Guardar datos escaneados
    Alert.alert("Código Escaneado", `Datos: ${text}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.navbar}>
        <Text style={styles.navText}>Escanear</Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {/* Alternar entre cámara y escáner Hytera */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              useHyteraScanner ? styles.activeButton : {},
            ]}
            onPress={() => setUseHyteraScanner(true)}
          >
            <Text style={styles.toggleText}>Usar Hytera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !useHyteraScanner ? styles.activeButton : {},
            ]}
            onPress={() => setUseHyteraScanner(false)}
          >
            <Text style={styles.toggleText}>Usar Cámara</Text>
          </TouchableOpacity>
        </View>

        {/* Contenido según el método seleccionado */}
        {useHyteraScanner ? (
          <View>
            <Text style={styles.instructions}>
              Escanee un código con el escáner Hytera.
            </Text>
            <TextInput
              style={styles.input}
              value={scannedData}
              placeholder="Resultado del escaneo"
              onChangeText={handleHyteraScan}
              autoFocus={true} // Asegura que el TextInput esté listo para recibir datos
            />
          </View>
        ) : cameraVisible ? (
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing="back"
              onBarcodeScanned={handleBarCodeScanned}
              autofocus="on"
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
            />
            <Button
              title="Cerrar Cámara"
              onPress={() => setCameraVisible(false)}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraVisible(true)}
          >
            <Text style={styles.buttonText}>Activar Cámara</Text>
          </TouchableOpacity>
        )}

        {/* Mostrar resultado escaneado */}
        <TextInput
          style={styles.input}
          value={scannedData}
          placeholder="Resultado del escaneo"
          editable={false}
        />
      </View>
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
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#002855",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#002855",
  },
  toggleText: {
    color: "#FFFFFF",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
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
  instructions: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Home;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
//   Alert,
//   Button,
// } from "react-native";
// import { useCameraPermissions, CameraView } from "expo-camera";
// import { StatusBar } from "expo-status-bar";

// // import 'dotenv/config'
// // console.log(process.env)
// const Home = () => {
//   const [cameraVisible, setCameraVisible] = useState(false);
//   const [scannedData, setScannedData] = useState("");
//   const [permission, requestPermission] = useCameraPermissions();

//   // Validar permisos
//   if (!permission) return <View />;
//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <StatusBar style="light" />
//         <Text style={styles.message}>
//           Es necesario otorgar permisos para usar la cámara.
//         </Text>
//         <Button onPress={requestPermission} title="Dar permisos" />
//       </View>
//     );
//   }

//   // Manejar el escaneo
//   const handleBarCodeScanned = ({ type, data }) => {
//     setCameraVisible(false); // Ocultar la cámara
//     setScannedData(data); // Guardar datos escaneados
//     Alert.alert("Código Escaneado", Tipo: ${type}\nDatos: ${data});
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.navbar}>
//         <Text style={styles.navText}>Escanear</Text>
//       </View>

//       {/* Contenido */}
//       {!cameraVisible ? (
//         <View style={styles.content}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setCameraVisible(true)}
//           >
//             <Text style={styles.buttonText}>Activar Cámara</Text>
//           </TouchableOpacity>

//           {/* Mostrar resultado escaneado */}
//           <TextInput
//             style={styles.input}
//             value={scannedData}
//             placeholder="Resultado del escaneo"
//             editable={false}
//           />
//         </View>
//       ) : (
//         <View style={styles.cameraContainer}>
//           <CameraView
//             style={styles.camera}
//             facing="back" // Valor directamente como string
//             barcodeScannerSettings={{
//               barcodeTypes: [
//                 "aztec",
//                 "ean13",
//                 "ean8",
//                 "qr",
//                 "pdf417",
//                 "upc_e",
//                 "datamatrix",
//                 "code39",
//                 "code93",
//                 "itf14",
//                 "codabar",
//                 "code128",
//                 "upc_a",
//               ], // only support this types of barcode and qr
//             }}
//             onBarcodeScanned={handleBarCodeScanned}
//           />
//           <Button
//             title="Cerrar Cámara"
//             onPress={() => setCameraVisible(false)}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   navbar: {
//     height: 60,
//     backgroundColor: "#002855",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   navText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cameraContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   camera: {
//     flex: 1,
//     width: "100%",
//   },
//   button: {
//     backgroundColor: "#002855",
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 5,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     padding: 10,
//     marginTop: 20,
//     width: "80%",
//     borderRadius: 5,
//     backgroundColor: "#FFF",
//   },
//   message: {
//     margin: 20,
//     textAlign: "center",
//   },
// });

// export default Home;
