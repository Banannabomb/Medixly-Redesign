import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

interface Props {
  navigation: {
    navigate: (
      route: string,
      params?: {
        scan?: {
          url: string;
          date: string;
          diagnosis: string;
          note: string;
        };
        doctor?: {
          name: string;
          phoneNumber: string;
          email: string;
        };
      }
    ) => void;
  };
}

const ConsultationSectionHeader: React.FC<Props> = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 24,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontFamily: "Raleway-Medium", fontSize: 24 }}>
        Consultation
      </Text>
      <View style={{ marginLeft: "auto" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Consultants")}>
          <Text
            style={{
              fontFamily: "Raleway-Regular",
              fontSize: 20,
              color: "#87BEFF",
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConsultationSectionHeader;
