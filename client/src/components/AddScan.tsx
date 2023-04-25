import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import Context from "../utils/context";
import { Scan } from "../utils/types";

interface Props {
  navigation: {
    navigate: (route: string, params: { scan: Scan }) => void;
  };
}

const AddScan: React.FC<Props> = ({ navigation }) => {
  const { scans } = useContext(Context);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let lastId = 0;
      if (scans.length > 0) lastId = scans[0].id;
      const scan: Scan = {
        id: lastId + 1,
        image: result,
        date: format(new Date(), "P p"),
        diagnosis: "Processing...",
        note: "Processing...",
      };
      navigation.navigate("View Scan", { scan });
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={{ marginRight: 12 }}>
      <Ionicons name="add" color="#87BEFF" size={30} />
    </TouchableOpacity>
  );
};

export default AddScan;
