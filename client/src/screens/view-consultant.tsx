import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import React, { useContext } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../components/BackButton";
import Layout from "../components/Layout";
import Context from "../utils/context";
import { Doctor } from "../utils/types";

interface Props {
  route: {
    params: {
      doctor: Doctor;
    };
  };
  navigation: {
    navigate: (route: string) => void;
    goBack: () => void;
  };
}

const ViewConsultant: React.FC<Props> = ({ route, navigation }) => {
  const { doctor } = route.params;
  const { doctors, setDoctors } = useContext(Context);

  const handleDelete = async () => {
    Alert.alert(
      "Delete consultant",
      "Are you sure that you want to delete this consultant? This action CANNOT be undone.",
      [
        {
          text: "Yes",
          onPress: async () => {
            const data = doctors.filter((v: any) => v.id !== doctor.id);
            setDoctors(data);
            await AsyncStorage.setItem("doctors", JSON.stringify(data)).then(
              () => {
                Alert.alert("Success", "Successfully deleted consultant!");
                navigation.goBack();
              }
            );
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
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
            Dr. {doctor.name}
          </Text>
          <View style={{ marginLeft: "auto" }}>
            <TouchableOpacity onPress={handleDelete}>
              <MaterialCommunityIcons name="delete" size={25} color="#FF7575" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 64 }}>
          <Ionicons name="person" color="#87BEFF" size={100} />
        </View>
        <View style={{ alignItems: "center", marginTop: 32 }}>
          {doctor.emails ? (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Raleway-SemiBold",
                  fontSize: 20,
                  color: "#0075FF",
                }}
              >
                Email:{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway-Regular",
                  fontSize: 20,
                  color: "#0075FF",
                }}
              >
                {doctor.emails[0].email}
              </Text>
            </View>
          ) : null}
          {doctor.phoneNumbers ? (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Raleway-SemiBold",
                  fontSize: 20,
                  color: "#0075FF",
                }}
              >
                Phone Number:{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway-Regular",
                  fontSize: 20,
                  color: "#0075FF",
                }}
              >
                {doctor.phoneNumbers[0].number}
              </Text>
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`tel:${doctor.phoneNumbers[0].number}`)
              }
              style={styles.button}
            >
              <Feather
                name="phone-call"
                size={25}
                color="white"
                style={{
                  marginRight: 8,
                  shadowOpacity: 0.25,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                }}
              />
              <Text style={styles.text}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(`mailto:${doctor.emails[0].email}`)
              }
              style={styles.button}
            >
              <AntDesign
                name="mail"
                size={25}
                color="white"
                style={{
                  marginRight: 8,
                  shadowOpacity: 0.25,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                }}
              />
              <Text style={styles.text}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    marginTop: 32,
    width: Dimensions.get("window").width / 2 - 36,
    backgroundColor: "#87BEFF",
    paddingVertical: 25,
    borderRadius: 15,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  text: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 24,
    color: "white",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});

export default ViewConsultant;
