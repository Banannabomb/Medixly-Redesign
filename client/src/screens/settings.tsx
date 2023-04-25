import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { Alert, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import Layout from "../components/Layout";
import SettingsCard from "../components/SettingsCard";
import Context from "../utils/context";

interface Props {
  navigation: {
    goBack: () => void;
  };
}

const Settings: React.FC<Props> = ({ navigation }) => {
  const { setScans, setDoctors, setDisclaimer } = useContext(Context);

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
            Settings
          </Text>
        </View>
        <View style={{ marginTop: 12 }}>
          <SettingsCard
            text="Scans"
            handlePress={() => {
              Alert.alert(
                "Delete All Scans",
                "Are you sure that you want to delete ALL scans within this app? This action CANNOT be undone.",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      await AsyncStorage.multiRemove(["scans"]).then(() => {
                        setScans([]);
                        Alert.alert(
                          "Success",
                          "Successfully deleted all scans within this app!"
                        );
                      });
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              );
            }}
          />
          <SettingsCard
            text="Doctors"
            handlePress={() => {
              Alert.alert(
                "Delete All Doctors",
                "Are you sure that you want to delete ALL doctors within this app? This action CANNOT be undone.",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      await AsyncStorage.multiRemove(["doctors"]).then(() => {
                        setDoctors([]);
                        Alert.alert(
                          "Success",
                          "Successfully deleted all doctors within this app!"
                        );
                      });
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              );
            }}
          />
          <SettingsCard
            text="Data"
            handlePress={() => {
              Alert.alert(
                "Delete All Data",
                "Are you sure that you want to delete ALL data within this app? This action CANNOT be undone.",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      await AsyncStorage.multiRemove([
                        "scans",
                        "doctors",
                        "disclaimer",
                      ]).then(() => {
                        setScans([]);
                        setDoctors([]);
                        setDisclaimer(false);
                        Alert.alert(
                          "Success",
                          "Successfully deleted all data within this app!"
                        );
                      });
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              );
            }}
          />
        </View>
      </>
    </Layout>
  );
};

export default Settings;
