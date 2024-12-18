// react
import React, { useState } from "react";

//rn
import { View, StyleSheet, Text } from "react-native";
//rn paper
import { List, Button } from "react-native-paper";

//interfaces
import { DropdownItemProps } from "@/interfaces/DropdownItemProps";

const DropdownItem: DropdownItemProps = ({ title, isOpen, onPress }) => {
  return (
    <List.Accordion
      title={title}
      expanded={isOpen}
      onPress={onPress}
      style={styles.accordion}
    >
      <List.Item title="Contenido desplegable" />
    </List.Accordion>
  );
};

const home = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handlePress = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asigna una posición al rollo</Text>
      {["Fila 1", "Fila 2", "Fila 3", "Fila 4", "Fila 5"].map(
        (title, index) => (
          <DropdownItem
            key={index}
            title={title}
            isOpen={openIndex === index}
            onPress={() => handlePress(index)}
          />
        )
      )}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => console.log("Siguiente")}
      >
        Siguiente
      </Button>
    </View>
  );
};
export default home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#00296b",
  },
  accordion: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#00296b",
  },
});

// export default home;
