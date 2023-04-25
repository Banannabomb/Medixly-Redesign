import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CheckBox from "react-native-check-box";
import Layout from "../components/Layout";
import Context from "../utils/context";

const Disclaimer = () => {
  const { setDisclaimer } = useContext(Context);
  const [checked, setChecked] = useState<boolean>(false);

  const handlePress = async () => {
    await AsyncStorage.setItem("disclaimer", JSON.stringify(checked));
    setDisclaimer(true);
  };

  return (
    <Layout>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 12,
          right: 12,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/97574011?s=400&u=47d297e8094a4cfb7acabf6038ece2dc3ed60869&v=4",
          }}
          style={{ width: 125, height: 125, marginBottom: 16 }}
        />
        <Text
          style={{
            fontFamily: "Montserrat-SemiBold",
            fontSize: 24,
            marginBottom: 8,
          }}
        >
          Disclaimer:
        </Text>
        <Text style={{ fontFamily: "Montserrat-Medium", textAlign: "center" }}>
          Our AI is by no means perfect. We are not responsible for false
          positives or negatives. By proceeding, you agree with this statement.
          Please use this software at your own risk.
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <CheckBox
            onClick={() => setChecked(!checked)}
            isChecked={checked}
            uncheckedCheckBoxColor="#87BEFF"
            checkedCheckBoxColor="#87BEFF"
          />
          <Text
            style={{
              fontFamily: "Montserrat-Regular",
              fontSize: 14,
              marginLeft: 12,
            }}
          >
            Don't show this again
          </Text>
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#87BEFF",
            padding: 18,
            borderRadius: 12,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Raleway-SemiBold",
              fontSize: 24,
              shadowOpacity: 0.25,
              shadowOffset: {
                width: 0,
                height: 4,
              },
            }}
          >
            Proceed
          </Text>
          <AntDesign
            style={{
              marginLeft: 8,
              shadowOpacity: 0.25,
              shadowOffset: {
                width: 0,
                height: 4,
              },
            }}
            name="arrowright"
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Disclaimer;
