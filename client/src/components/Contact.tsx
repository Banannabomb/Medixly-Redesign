import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface Props {
  item: {
    name: string;
    phoneNumbers: [
      {
        number: string;
      }
    ];
    emails: [
      {
        email: string;
      }
    ];
  };
  onPress: () => void;
  dr: boolean;
}

const Contact: React.FC<Props> = ({ dr, item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#E3F0FF",
        marginTop: 12,
        borderRadius: 25,
        flexDirection: "row",
        padding: 18,
        alignItems: "center",
      }}
    >
      <Ionicons
        name="person"
        color="#0075FF"
        size={45}
        style={{ marginLeft: 12 }}
      />
      <View style={{ marginLeft: 24 }}>
        <Text style={{ fontFamily: "Raleway-Regular", fontSize: 20 }}>
          {dr ? "Dr." : ""} {item.name}
        </Text>
        {item.phoneNumbers ? (
          <Text style={{ fontFamily: "Raleway-Regular", fontSize: 16 }}>
            {item.phoneNumbers[0].number}
          </Text>
        ) : null}
        {item.emails ? (
          <Text style={{ fontFamily: "Raleway-Regular", fontSize: 16 }}>
            {item.emails[0].email}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Contact;
