import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Scan } from "../utils/types";

interface Props {
  item: Scan;
  navigation: {
    navigate: (
      route: string,
      params?: {
        scan?: Scan;
      }
    ) => void;
  };
}

const ScanCard: React.FC<Props> = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("View Scan", {
          scan: item,
        })
      }
      style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 12,
        maxHeight: 250,
        marginRight: 36,
      }}
    >
      <Image
        source={{ uri: item.image.uri }}
        style={{ borderRadius: 12, height: 150, width: 265 }}
      />
      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Montserrat-Medium",
              fontSize: 20,
              color: "#0075FF",
            }}
          >
            {item.date}
          </Text>
          <Text
            style={{
              fontFamily: "Raleway-Regular",
              fontSize: 18,
              color: "#87BEFF",
            }}
          >
            {item.diagnosis}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Consultants")}
          style={{
            backgroundColor: "#E3F0FF",
            borderRadius: 12,
            padding: 12,
            marginLeft: 12,
          }}
        >
          <Ionicons name="person" color="#0075FF" size={25} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ScanCard;
