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
  onRightIconPress,
  rightIcon,
  secureTextEntry,
  activeUnderlineColor,
  underlineColor,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        label={label}
        disabled={disable}
        value={value}
        onChangeText={onChangeText}
        mode={mode}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        underlineColor={underlineColor}
        activeOutlineColor={activeUnderlineColor}
        style={[styles.input, style]}
        left={
          leftIcon ? (
            <TextInput.Icon icon={leftIcon} style={styles.icon} />
          ) : undefined
        }
        right={
          rightIcon ? (
            <TextInput.Icon
              icon={rightIcon}
              onPress={onRightIconPress}
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
    marginVertical: 8, // Espaciado para el contenedor
  },
  input: {
    padding: 8, // Espaciado interno del TextInput
  },
  icon: {
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
});
