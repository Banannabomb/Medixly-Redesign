import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface Props {
  text: string;
  handlePress: () => void;
}

const SettingsCard: React.FC<Props> = ({ text, handlePress }) => {
  return (
    <View
      style={{
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 18,
      }}
    >
      <Text
        style={{
          fontFamily: "Montserrat-Medium",
          fontSize: 18,
          color: "#0075FF",
        }}
      >
        Delete All {text}
      </Text>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          marginLeft: "auto",
          backgroundColor: "#FF7575",
          borderRadius: 12,
          shadowOpacity: 0.25,
          shadowOffset: {
            width: 0,
            height: 4,
          },
        }}
      >
        <Text
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            color: "white",
            fontFamily: "Raleway-SemiBold",
            fontSize: 16,
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
    </View>
  );
};

export default SettingsCard;
