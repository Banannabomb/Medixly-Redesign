import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

interface Props {
  navigation: {
    goBack: () => void;
  };
}

const BackButton: React.FC<Props> = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={25} color="#87BEFF" />
    </TouchableOpacity>
  );
};

export default BackButton;
