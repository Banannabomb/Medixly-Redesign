import { useFonts } from "expo-font";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Overwriting fontFamily style attribute preprocessor"]);

export const loadFonts = (): any => {
  return useFonts({
    "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
    "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
};
