import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import StackNaviator from "./components/StackNavigator";
import Disclaimer from "./screens/disclaimer";
import Splash from "./screens/splash";
import Context from "./utils/context";
import { loadFonts } from "./utils/loadFonts";
import { sleep } from "./utils/sleep";
import { Scan } from "./utils/types";

const App = () => {
  let [loaded] = loadFonts();
  const [scans, setScans] = useState<Scan[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [splash, setSplash] = useState<boolean>(true);
  const [disclaimer, setDisclaimer] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const disclaimerData = await AsyncStorage.getItem("disclaimer");
      const scansData = await AsyncStorage.getItem("scans");
      const doctorsData = await AsyncStorage.getItem("doctors");

      if (disclaimerData) setDisclaimer(JSON.parse(disclaimerData));
      if (scansData) setScans(JSON.parse(scansData));
      if (doctorsData) setDoctors(JSON.parse(doctorsData));
      await sleep(2000).then(() => setSplash(false));
    })();
  }, []);

  if (!loaded || splash) {
    return (
      <>
        <StatusBar style="dark" />
        <Splash />
      </>
    );
  }

  if (!splash && !disclaimer) {
    return (
      <Context.Provider value={{ setDisclaimer }}>
        <StatusBar style="dark" />
        <Disclaimer />
      </Context.Provider>
    );
  }

  return (
    <Context.Provider
      value={{ scans, setScans, doctors, setDoctors, setDisclaimer }}
    >
      <NavigationContainer>
        <StatusBar style="dark" />
        <StackNaviator />
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
