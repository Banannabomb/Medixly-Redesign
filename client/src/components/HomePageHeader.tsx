import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import React from "react";

interface Props {
  navigation: {
    navigate: (route: string) => void;
  };
}

const HomePageHeader: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View>
        <Text style={{ fontFamily: "Raleway-Medium", fontSize: 36 }}>
          Welcome
        </Text>
        <Text
          style={{
            fontFamily: "Raleway-Regular",
            fontSize: 18,
            color: "#999999",
          }}
        >
          {format(new Date(), "p")}
        </Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-sharp" color="#87BEFF" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePageHeader;
