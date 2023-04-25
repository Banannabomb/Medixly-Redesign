import { Ionicons } from "@expo/vector-icons";
import React from "react";
import * as Contacts from "expo-contacts";
import { TouchableOpacity } from "react-native";

interface Props {
  navigation: {
    navigate: (
      route: string,
      params: {
        data: any;
      }
    ) => void;
  };
}

const AddConsultantButton: React.FC<Props> = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          let { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.FirstName,
              Contacts.Fields.LastName,
              Contacts.Fields.Emails,
              Contacts.Fields.PhoneNumbers,
            ],
          });
          data = data.sort((a, b) =>
            a.lastName && b.lastName && a.lastName > b.lastName
              ? 1
              : a.lastName === b.lastName
              ? a.firstName && b.firstName && a.firstName > b.firstName
                ? 1
                : -1
              : -1
          );
          navigation.navigate("Add Consultant", { data });
        }
      }}
      style={{ marginLeft: "auto" }}
    >
      <Ionicons name="add" size={35} color="#87BEFF" />
    </TouchableOpacity>
  );
};

export default AddConsultantButton;
