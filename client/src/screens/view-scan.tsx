import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import ConsultButton from "../components/ConsultButton";
import DeleteButton from "../components/DeleteButton";
import Layout from "../components/Layout";
import Context from "../utils/context";
import { process } from "../utils/tf";
import { Scan } from "../utils/types";
import { ActivityIndicator } from "react-native-paper";

interface Props {
  navigation: {
    goBack: () => void;
    navigate: (route: string) => void;
  };
  route: {
    params: {
      scan: Scan;
    };
  };
}

const ViewScan: React.FC<Props> = ({ navigation, route }) => {
  const { scan } = route.params;
  const { scans, setScans } = useContext(Context);
  const [processing, setProcessing] = useState(
    scan.diagnosis === "Processing..."
  );

  useEffect(() => {
    if (processing) {
      (async () => {
        const diagnosis = await process(scan);
        scan.diagnosis = diagnosis;
        if (diagnosis === "Melanoma") {
          scan.note =
            "Our AI detected that your mole is likely to be melanoma. Seek medical help immediately. Press the “Consult A Doctor” button to view all your saved contact information for your doctors/physicians.";
        } else {
          scan.note = "Our AI detected that your mole is not melanoma!";
        }

        await AsyncStorage.setItem("scans", JSON.stringify([scan, ...scans]));
        setScans([scan, ...scans]);
        setProcessing(false);
      })();
    }
  }, []);

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
            Scan Results
          </Text>
        </View>
        <Image
          source={{ uri: scan.image.uri }}
          style={{
            width: "100%",
            height: 250,
            marginTop: 48,
            borderRadius: 12,
          }}
        />
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            fontSize: 24,
            color: "#0075FF",
            marginTop: 24,
          }}
        >
          {scan.date}
        </Text>
        <View style={{ height: 256 }}>
          {processing ? (
            <View
              style={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color="#87BEFF" size="large" />
              <Text
                style={{
                  marginTop: 24,
                  fontFamily: "Raleway-Regular",
                  fontSize: 20,
                  color: "#87BEFF",
                  textAlign: "center",
                }}
              >
                Please wait while we process your scan. This could take up to a
                few minutes.
              </Text>
            </View>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: "Raleway-Regular",
                  fontSize: 20,
                  color: "#87BEFF",
                }}
              >
                Diagnosis: {scan.diagnosis}
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway-Regular",
                  fontSize: 18,
                  color: "#ABABAB",
                  marginTop: 18,
                }}
              >
                {scan.note}
              </Text>
            </>
          )}
        </View>

        <View
          style={{
            zIndex: -1,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          <ConsultButton navigation={navigation} />
          <DeleteButton
            onPress={async () => {
              Alert.alert(
                "Delete scan",
                "Are you sure that you want to delete this scan? This action CANNOT be undone.",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      const data = scans.filter((v: Scan) => v.id !== scan.id);
                      setScans(data);
                      await AsyncStorage.setItem(
                        "scans",
                        JSON.stringify(data)
                      ).then(() => {
                        Alert.alert("Success", "Successfully deleted scan!");
                        navigation.goBack();
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

export default ViewScan;
