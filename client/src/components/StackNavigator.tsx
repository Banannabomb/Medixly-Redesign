import { createStackNavigator } from "@react-navigation/stack";
import AddConsultant from "../screens/add-consultant";
import Consultants from "../screens/consultants";
import Home from "../screens/home";
import PastScans from "../screens/past-scans";
import Settings from "../screens/settings";
import ViewConsultant from "../screens/view-consultant";
import ViewScan from "../screens/view-scan";

const Stack = createStackNavigator();

const StackNaviator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Consultants" component={Consultants} />
        <Stack.Screen name="Past Scans" component={PastScans} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Add Consultant" component={AddConsultant} />
        <Stack.Screen name="View Consultant" component={ViewConsultant} />
        <Stack.Screen name="View Scan" component={ViewScan} />
      </Stack.Navigator>
    </>
  );
};

export default StackNaviator;
