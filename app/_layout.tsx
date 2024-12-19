import React from "react";
import { SafeAreaView, TouchableOpacity, Text } from "react-native";
// import { Header } from "@react-navigation/elements";
import { StatusBar } from "expo-status-bar";

import { Stack, useRouter } from "expo-router";
import { Colors } from "../constants/Colors";

const RootLayout = () => {
  //use for move entry screens
  const router = useRouter();

  // Function to handle exit logic
  const handleExit = () => {
    // You can define your exit logic here, for example, navigate to a login screen or close the app
    console.log("Exit button pressed");
    router.push("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true, // Ensure the header is shown
          headerTitleAlign: "center", // Center the title
          headerStyle: {
            backgroundColor: Colors.darkBlue, // Set the background color of the header
          },
          headerTintColor: "white", // Set the title text color to white
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Index Screen", // Add a title for the index screen
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            title: "Escanear",
            // headerLeft: false
            // ,
            headerBackVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={handleExit}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: "white" }}>Exit</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="assingPositions"
          options={{
            title: "Assign Positions",
            headerRight: () => (
              <TouchableOpacity
                onPress={handleExit}
                style={{ marginRight: 15 }}
              >
                <Text style={{ color: "white" }}>Exit</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default RootLayout;
