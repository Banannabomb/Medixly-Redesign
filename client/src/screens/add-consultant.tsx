import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BackButton from "../components/BackButton";
import Contact from "../components/Contact";
import Error from "../components/Error";
import Layout from "../components/Layout";
import Context from "../utils/context";
import { Doctor } from "../utils/types";

interface Props {
  route: {
    params: {
      data: any;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (
      route: string,
      params: {
        doctor: Doctor;
      }
    ) => void;
  };
}

const AddConsultant: React.FC<Props> = ({ route, navigation }) => {
  const { doctors, setDoctors } = useContext(Context);
  const { data } = route.params;
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");

  const filter = (text: string) => {
    if (text.length === 0) setSearch("");
    else if (text) {
      const newData = data.filter((item: any) => {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    }
  };

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
            Add Consultant
          </Text>
        </View>
        <View style={styles.input}>
          <Feather
            name="search"
            size={20}
            style={{ marginLeft: 8, marginRight: 14 }}
          />
          <TextInput
            autoCapitalize="none"
            style={{ flex: 1, zIndex: 1 }}
            placeholder="Search doctors"
            value={search}
            onChangeText={(text) => filter(text)}
            underlineColorAndroid="transparent"
          />
        </View>
        {data.length > 0 ? (
          <FlatList
            ListFooterComponent={<View style={{ height: 48 }} />}
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={({ item }) => (
              <Contact
                dr={false}
                item={item}
                onPress={async () => {
                  await AsyncStorage.setItem(
                    "doctors",
                    JSON.stringify([item, ...doctors])
                  );
                  setDoctors([item, ...doctors]);
                  Alert.alert("Success!", "Doctor has been added!");
                }}
              />
            )}
          />
        ) : (
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
            <Error text="contacts" />
          </View>
        )}
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#E5E5E5",
    width: "100%",
  },
});

export default AddConsultant;
