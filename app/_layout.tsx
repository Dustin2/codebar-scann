import React from "react";
import { View, Text } from "react-native";
// import { Slot } from "expo-router";

import { Stack } from "expo-router";
import useAppRouter from "../hooks/useAppRouter";

const RootLayout = ({}) => {
  const router = useAppRouter();

  return (
    <Stack screenOptions={{}}>
      {/* //al usar  slot de expo router como esta basado en flie system por defesto buscara al archivo index, en cualmmostrara, en este mismo estremos renderizando a n uestros archivos hijos */}

      <Stack.Screen
        name="index"
        options={{
          //this hide top title
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
