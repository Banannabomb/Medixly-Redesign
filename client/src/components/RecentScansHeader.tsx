import { Text, View, TouchableOpacity } from "react-native";
import AddScan from "./AddScan";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

interface Props {
  navigation: {
    navigate: (route: string) => void;
  };
}

const RecentScansHeader: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 48 }}>
      <Text style={{ fontFamily: "Raleway-Medium", fontSize: 24 }}>
        Recent Scans
      </Text>
      <View
        style={{
          marginLeft: "auto",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AddScan navigation={navigation} />
        <TouchableOpacity onPress={() => navigation.navigate("Past Scans")}>
          <FontAwesome name="folder" color="#87BEFF" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecentScansHeader;
