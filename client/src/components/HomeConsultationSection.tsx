import React from "react";
import { FlatList, View } from "react-native";
import Contact from "./Contact";
import Error from "./Error";

interface Props {
  doctors: any[];
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

const HomeConsultationSection: React.FC<Props> = ({ doctors, navigation }) => {
  return (
    <View
      style={{
        marginTop: 12,
        height: 250,
      }}
    >
      {doctors.length === 0 ? (
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Error text="doctors" />
        </View>
      ) : (
        <View>
          <FlatList
            ListFooterComponent={<View style={{ height: 48 }} />}
            data={doctors}
            renderItem={({ item }) => (
              <Contact
                dr
                onPress={() =>
                  navigation.navigate("View Consultant", {
                    doctor: item,
                  })
                }
                item={item}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default HomeConsultationSection;
