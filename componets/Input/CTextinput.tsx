import React from "react";
import { StyleSheet,ViewStyle,StyleProp } from "react-native";
import { TextInput } from "react-native-paper";

interface CTextinputProps {
  label?: string;
  value?: string;
//   onChange?: () => void;
  mode?: "flat" | "outlined";
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad";
  // onChange?: ()=> void
  
  containerStyle?: StyleProp<ViewStyle>; // Allow customizing the container

  disable?: boolean;
  onChangeText: (text: string) => void; // Callback for handling text changes
}
export const CTextInput = ({
  label,
  value,
//   onChange,
containerStyle,
  mode,
  keyboardType,
  disable,
  onChangeText,
}: CTextinputProps) => {
  return (
    <TextInput
      label={label}
      disabled={disable}
      value={value}
      onChangeText={onChangeText}
      mode={mode}
      keyboardType={keyboardType}
      style={styles.inputs}
    />
  );
};

const styles = StyleSheet.create({
  inputs: {
    // flex: 1,
    padding: 1,
    // marginBottom: 15,
    margin: 13,
  },
});
