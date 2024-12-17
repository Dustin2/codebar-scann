import { StyleProp, ViewStyle, TextStyle } from "react-native";
export interface CTextInputProps {
  label?: string;
  value?: string;
  mode?: "flat" | "outlined";
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad";
  style?: StyleProp<TextStyle>; // Para personalizar los estilos del TextInput
  containerStyle?: StyleProp<ViewStyle>; // Para personalizar el contenedor
  disable?: boolean;
  onChangeText: (text: string) => void; // Callback para manejar cambios de texto
  leftIcon?: string; // Nombre del ícono para la izquierda
  rightIcon?: string; // Nombre del ícono para la derecha
  onRightIconPress?: () => void; // Acción al presionar el ícono derecho
}
