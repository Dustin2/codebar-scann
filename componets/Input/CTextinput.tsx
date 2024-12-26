import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

//interfaces
import { CTextInputProps } from "../../interfaces/CTextInputProps";

export const CTextInput: React.FC<CTextInputProps> = ({
  label,
  value,
  containerStyle,
  mode = "outlined",
  style,
  keyboardType = "default",
  disable = false,
  onChangeText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  activeUnderlineColor ,
  underlineColor  ,
  activeOutlineColor
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode={mode}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        disabled={disable}
        activeOutlineColor={activeOutlineColor}
        underlineColor={underlineColor}
        activeUnderlineColor={activeUnderlineColor}
        style={[styles.input, style]}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} size={20} /> : undefined}
        right={
          rightIcon ? (
            <TextInput.Icon
              icon={rightIcon}
              onPress={onRightIconPress}
              size={20}
              style={styles.icon}
            />
          ) : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    fontSize: 16, // Tamaño de fuente más grande
    height: 55, // Ajusta la altura para un diseño más espacioso
    backgroundColor: "#f9f9f9", // Fondo claro para un estilo moderno
    borderRadius: 8, // Bordes redondeados
  },
  icon: {
    marginTop: 8, // Ajuste para centrar verticalmente en el input
    marginRight: 5, // Espaciado entre el icono y el borde
  },
});

