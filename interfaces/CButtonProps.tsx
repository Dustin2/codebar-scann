import { StyleProp, TextStyle } from "react-native";
export interface CButtonProps {
  buttonColor: string;
  text?: string;
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  enable?: boolean;
  dark?: boolean;
  textColor: "black" | "white";
  rippleColor?: string;
  activeUnderlineColor: string;
  underlineColor: string;
  icon?: string;
  onPress?: () => void;
  children?: React.ReactNode; // Add children here
  style?: StyleProp<TextStyle>; // Para personalizar los estilos del TextInput
}
