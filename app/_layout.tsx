import React from "react";
import { View, Text } from "react-native";
// import { Slot } from "expo-router";

import { Stack } from "expo-router";
const RootLayout = () => {
  return (
    <Stack>
      {/* //al usar  slot de expo router como esta basado en flie system por defesto buscara al archivo index, en cualmmostrara, en este mismo estremos renderizando a n uestros archivos hijos */}
      {/* <Slot /> */}
      <Stack.Screen  name="login"/>
      <Stack.Screen  name="index"/>
    </Stack>
  );
};

export default RootLayout;
