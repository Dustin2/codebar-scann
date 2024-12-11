import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { CameraView, CameraType } from 'expo-camera';  
import { MaterialIcons } from '@expo/vector-icons';

const login = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraVisible, setCameraVisible] = useState(false);

  function startCamera() {
    setCameraVisible(true); // Muestra la cámara cuando el usuario presione "Escanear"
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
};

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

export default login;
