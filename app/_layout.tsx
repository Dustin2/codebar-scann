//react
import React from "react";

//react native
import { SafeAreaView } from "react-native-safe-area-context";
//expo router
import { Stack } from "expo-router";

//colors
import { Colors } from "@/constants/Colors";

///expo splash screens

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

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
            headerShown: true,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
