import React, { useContext } from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import Error from "../components/Error";
import Layout from "../components/Layout";
import Context from "../utils/context";
import { Scan } from "../utils/types";

interface Props {
  navigation: {
    navigate: (
      route: string,
      params?: {
        scan: Scan;
      }
    ) => void;
    goBack: () => void;
  };
}

const PastScans: React.FC<Props> = ({ navigation }) => {
  const { scans } = useContext(Context);
  return (
    <Layout>
      <>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackButton navigation={navigation} />
          <Text
            style={{
              zIndex: -1,
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: "Raleway-Medium",
              fontSize: 28,
            }}
          >
            Past Scans
          </Text>
        </View>
        {scans.length === 0 ? (
          <View
            style={{
              zIndex: -1,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Error text="scans" />
          </View>
        ) : (
          <FlatList
            ListFooterComponent={<View style={{ height: 48 }} />}
            style={{ marginTop: 24 }}
            showsVerticalScrollIndicator={false}
            data={scans}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("View Scan", { scan: item });
                }}
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 18,
                  borderRadius: 25,
                  padding: 18,
                }}
              >
                <Image
                  source={{ uri: item.image.uri }}
                  style={{ height: 100, width: 100, borderRadius: 14 }}
                />
                <View style={{ marginLeft: 18 }}>
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
              </TouchableOpacity>
            )}
          />
        )}
      </>
    </Layout>
  );
};

export default PastScans;
