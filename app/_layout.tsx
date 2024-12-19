//react
import React from "react";

//react native safe area
import { SafeAreaView } from "react-native-safe-area-context";

//rn navigation
import { Header } from "@react-navigation/elements";

//expo router
import { Stack } from "expo-router";

//colors
import { Colors } from "../constants/Colors";

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
          // header: (props) => <view style={{ height: 100 }}></view>,
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
            headerTitle: "Inicio",
            header: ({ options }) => (
              <Header
                {...options}
                headerStyle={{
                  height: 70,
                  backgroundColor: Colors.darkBlue,
                }}
              />
            ),
          }}
        />
        <Stack.Screen name="assingPositions" options={{}} />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
