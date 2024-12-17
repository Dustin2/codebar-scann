import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar style="dark"  translucent backgroundColor={Colors.blue}/> */}
      {/* Stack debe estar directamente dentro de SafeAreaView */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
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
    </SafeAreaView>
  );
};

export default RootLayout;
