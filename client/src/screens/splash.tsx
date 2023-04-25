import { Image, View } from "react-native";

const Splash = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://avatars.githubusercontent.com/u/97574011?s=400&u=47d297e8094a4cfb7acabf6038ece2dc3ed60869&v=4",
        }}
        style={{ width: 125, height: 125 }}
      />
    </View>
  );
};

export default Splash;
