import React from "react";
import { StyleSheet, View } from "react-native";

/// rn
import { Button } from "react-native-paper";

interface CButton {
  buttonColor: string;
  text?: string;
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  enable?: boolean;
  dark?: boolean;
  textColor: "black" | "white";
  rippleColor?: string;
  icon?: string;
  onPress?: () => void;
  children?: React.ReactNode; // Add children here
}

export const CButton = ({
  text,
  buttonColor,
  mode,
  enable,
  dark,
  textColor,
  rippleColor,
  icon,
  onPress,
  children
}: CButton) => {
  return (
    <Button
      mode={mode}
      icon={icon}
      dark={dark}
      textColor={textColor}
      buttonColor={buttonColor}
      rippleColor={rippleColor}
      onPress={onPress}
    >
      {children || text || null}
    </Button>
  );
};

const styles = StyleSheet.create({});
