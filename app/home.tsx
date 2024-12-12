import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
 
  const [scannedData, setScannedData] = useState('');
  const [permission, requestPermission] = useCameraPermissions();

  // Validar permisos
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.message}>Es necesario otorgar permisos para usar la cámara.</Text>
        <Button onPress={requestPermission} title="Dar permisos" />
      </View>
    );
  }

  // Manejar el escaneo
  const handleBarCodeScanned = ({ type, data }) => {
    setCameraVisible(false); // Ocultar la cámara
    setScannedData(data); // Guardar datos escaneados
    Alert.alert('Código Escaneado', `Tipo: ${type}\nDatos: ${data}`);
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
          <TouchableOpacity style={styles.button} onPress={() => setCameraVisible(true)}>
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
            style={styles.camera}
            // type={CameraType.back}
            // onBarCodeScanned={handleBarCodeScanned}
            facing={facing} 
          barcodeScannerSettings={{
            barcodeTypes:[
              'qr','aztec','codabar','code128','code39','datamatrix','ean13',
            ]
          }}
          onBarcodeScanned={()=>{}}
          />
          <Button title="Cerrar Cámara" onPress={() => setCameraVisible(false)} />
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
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  message: {
    margin: 20,
    textAlign: 'center',
  },
});

export default Home;
