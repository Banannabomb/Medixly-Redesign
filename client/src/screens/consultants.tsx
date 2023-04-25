import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import AddConsultantButton from "../components/AddConsultantButton";
import Contact from "../components/Contact";
import Error from "../components/Error";
import Layout from "../components/Layout";
import Context from "../utils/context";

interface Props {
  navigation: {
    navigate: (route: string, params?: any) => void;
    goBack: () => void;
  };
}

const Consultants: React.FC<Props> = ({ navigation }) => {
  const { doctors } = useContext(Context);

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
            Consultants
          </Text>
          <View style={{ marginLeft: "auto" }}>
            <AddConsultantButton navigation={navigation} />
          </View>
        </View>
        {doctors.length === 0 ? (
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
            <Error text="doctors" />
          </View>
        ) : (
          <FlatList
            ListFooterComponent={<View style={{ height: 48 }} />}
            style={{ marginTop: 24 }}
            showsVerticalScrollIndicator={false}
            data={doctors}
            renderItem={({ item }) => (
              <Contact
                dr
                item={item}
                onPress={() =>
                  navigation.navigate("View Consultant", {
                    doctor: item,
                  })
                }
              />
            )}
          />
        )}
      </>
    </Layout>
  );
};

export default Consultants;
