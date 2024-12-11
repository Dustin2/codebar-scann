import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Camera, CameraType } from 'expo-camera';


const Home = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraRef, setCameraRef] = useState<Camera | null>(null); // Camera reference

  useEffect(() => {
    // Request camera permission
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    alert(`Barcode type: ${type}, Data: ${data}`);
  };

  const startCamera = () => {
    setCameraVisible(true);
    setScanned(false); // Reset the scanned state when starting the camera
  };

  const goBack = () => {
    setCameraVisible(false);
  };

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Escanear</Text>
        {cameraVisible && (
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <MaterialIcons name="exit-to-app" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Show scan button if camera is not visible */}
      {!cameraVisible ? (
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={startCamera}>
            <Text style={styles.buttonText}>Escanear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Asignar posición</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Show camera for barcode scanning
        <View style={styles.content}>
          <Camera
            style={styles.camera}
            type={facing}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ref={(ref) => setCameraRef(ref)} // Set reference for the camera
          />
          {scanned && (
            <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.buttonText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <StatusBar style="light" />
    </View>
  );
};

export default Home;

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
    flexDirection: "row",
    position: "relative",
    paddingTop: 10,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    right: 20,
    top: 15,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
