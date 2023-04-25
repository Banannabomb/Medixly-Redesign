import React from "react";
import { FlatList, View } from "react-native";
import { Scan } from "../utils/types";
import Error from "./Error";
import ScanCard from "./ScanCard";

interface Props {
  scans: Scan[];
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

const RecentScansSection: React.FC<Props> = ({ scans, navigation }) => {
  return (
    <View
      style={{
        marginTop: 12,
        height: 250,
      }}
    >
      {scans.length === 0 ? (
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Error text="scans" />
        </View>
      ) : (
        <FlatList
          data={scans.slice(0, 5)}
          renderItem={({ item }) => (
            <ScanCard navigation={navigation} item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default RecentScansSection;
