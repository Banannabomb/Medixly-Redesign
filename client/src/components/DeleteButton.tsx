import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
}

const DeleteButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text
        style={{
          fontFamily: "Raleway-SemiBold",
          fontSize: 24,
          color: "white",
          shadowOpacity: 0.25,
          shadowOffset: {
            width: 0,
            height: 4,
          },
        }}
      >
        Delete
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FF7575",
    padding: 15,
    width: Dimensions.get("window").width - 48,
    borderRadius: 35,
    marginTop: 18,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});

export default DeleteButton;
