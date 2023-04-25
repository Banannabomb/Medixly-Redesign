import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  navigation: {
    navigate: (route: string) => void;
  };
}

const ConsultButton: React.FC<Props> = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Consultants")}
      style={styles.container}
    >
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
        Consult A Doctor
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#87BEFF",
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

export default ConsultButton;
