import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../components/home-page";
import DetailsPage from "./components/pageDetails";
import Header from "@/components/Header";

const Stack = createNativeStackNavigator();

export default function DetailsPageScreens() {
  return (
    <>
      <Header />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetailsPage" component={DetailsPage} />
      </Stack.Navigator>
    </>
  );
}
