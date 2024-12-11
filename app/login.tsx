import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Button} from 'react-native'
import React from 'react'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
const login = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false); 

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
         <StatusBar style="light" /> 
        <View style={styles.navbar}>
          <Text style={styles.navText}>Escanear</Text>
        </View>
        <Text style={styles.message}>Necesita dar permisos para usar la cámara</Text>
        <Button onPress={requestPermission} title="Dar permiso" />
        <StatusBar style="light" />
      </View>
    );
  }

  function startCamera() {
    setCameraVisible(true); 
  }

  function goBack() {
    setCameraVisible(false); 
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

      {/* Muestra los botones "Escanear" y "Asignar posición" si la cámara no está visible */}
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
        // Muestra la cámara y oculta los botones
        <View style={styles.content}>
          <CameraView style={styles.camera} facing={facing} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  navbar: {
    height: 60,
    backgroundColor: '#002855',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    paddingTop: 10, 
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    right: 20, 
    top: 15,  
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#002855',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});

export default login