import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  text: string;
}

const Error: React.FC<Props> = ({ text }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <FontAwesome name="exclamation-circle" size={50} />
      <Text
        style={{
          marginTop: 12,
          fontFamily: "Montserrat-SemiBold",
          fontSize: 24,
          textAlign: "center",
        }}
      >
        You have no {text}!
      </Text>
    </View>
  );
};

export default Error;
