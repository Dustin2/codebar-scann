import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Drawer, Paragraph, TextInput } from "react-native-paper";
const AssingPositions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asigna una posición al rollo</Text>
      <View style={styles.grid}>
        {/* Populate this grid with the positions */}
          {Array.from(Array(5).keys()).map((row) => (
          <View key={row} style={styles.row}>
            {Array.from(Array(8).keys()).map((col) => (
              <View key={col} style={styles.box}>
                <Text style={styles.boxText}>{`P${row + 1}${col + 1}`}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      {/* Fila Sections */}
      {[...Array(5).keys()].map((i) => (
        <Drawer.Section key={i} title={`Fila ${i + 2}`}>
          <Drawer.Item label={`Item ${i + 1}`} />
          <Drawer.Item label={`Item ${i + 2}`} />
        </Drawer.Section>
      ))}
      <Button mode="contained" style={styles.button}>
        Siguiente
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f8fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    width: "12%",
    height: 60,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    borderRadius: 5,
  },
  boxText: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
  },
});

export default AssingPositions;


// import React, { useState } from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { List, Button } from "react-native-paper";

// type DropdownItemProps = {
//   title: string;
//   isOpen: boolean;
//   onPress: () => void;
// };

// const DropdownItem: React.FC<DropdownItemProps> = ({ title, isOpen, onPress }) => {
//   return (
//     <List.Accordion
//       title={title}
//       expanded={isOpen}
//       onPress={onPress}
//       style={styles.accordion}
//     >
//       <List.Item title="Contenido desplegable" />
//     </List.Accordion>
//   );
// };

// const home = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const handlePress = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Asigna una posición al rollo</Text>
//       {["Fila 1", "Fila 2", "Fila 3", "Fila 4", "Fila 5"].map((title, index) => (
//         <DropdownItem
//           key={index}
//           title={title}
//           isOpen={openIndex === index}
//           onPress={() => handlePress(index)}
//         />
//       ))}
//       <Button mode="contained" style={styles.button} onPress={() => console.log("Siguiente")}>Siguiente</Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f4f7",
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#00296b",
//   },
//   accordion: {
//     backgroundColor: "#ffffff",
//     borderRadius: 5,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   button: {
//     marginTop: 20,
//     borderRadius: 5,
//     backgroundColor: "#00296b",
//   },
// });

// export default home;


